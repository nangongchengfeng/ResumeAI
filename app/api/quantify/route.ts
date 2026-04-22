import { NextRequest, NextResponse } from "next/server";
import { MODELS, SILICONFLOW_API_KEY, SILICONFLOW_BASE_URL } from "@/lib/ai";

async function callAI(prompt: string) {
  const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SILICONFLOW_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.default,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API request failed: ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

function parseJSON(content: string) {
  // 尝试多种方式解析 JSON
  try {
    // 方式 1: 直接解析
    return JSON.parse(content);
  } catch (e) {
    // 方式 2: 提取第一个 { ... } 块
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (e2) {
        // 方式 3: 尝试修复常见问题 - 转义字符串中的未转义引号
        let fixed = jsonMatch[0];
        // 修复: 在键名前加引号
        fixed = fixed.replace(/(\w+)(\s*:\s*)/g, '"$1"$2');
        // 修复: 单引号转双引号
        fixed = fixed.replace(/'/g, '"');
        try {
          return JSON.parse(fixed);
        } catch (e3) {
          // 方式 4: 手动提取字段（最后的防线）
          try {
            const modifiedResumeMatch = content.match(/modified_resume["']?\s*:\s*["']([\s\S]*?)["']\s*[,\}]/);
            const changesSummaryMatch = content.match(/changes_summary["']?\s*:\s*["']([^"']*?)["']\s*[,\}]/);

            const modified_resume = modifiedResumeMatch ? modifiedResumeMatch[1] : content;
            const changes_summary = changesSummaryMatch ? changesSummaryMatch[1] : "已优化简历内容";

            return { modified_resume, changes_summary };
          } catch (e4) {
            // 最终防线: 返回整个内容作为简历
            return {
              modified_resume: content.replace(/^[\s\S]*?\{[\s\S]*?"modified_resume"[\s:]*?"([\s\S]*?)"[\s\S]*$/, '$1') || content,
              changes_summary: "已优化简历内容"
            };
          }
        }
      }
    }
    throw new Error("无法解析 AI 响应");
  }
}

export async function POST(request: NextRequest) {
  try {
    const { resume_text } = await request.json();

    if (!resume_text) {
      return NextResponse.json(
        { error: "简历内容不能为空" },
        { status: 400 }
      );
    }

    // 第一步：量化优化
    const optimizePrompt = `你是一位资深招聘专家，擅长帮助求职者优化简历。请帮我深度优化这份简历，让内容更有说服力。

优化方向：
1. **量化成果**：把模糊的描述（如"做了一个项目"、"优化了性能"）转化为具体的成果描述
   - 如果原文没有数字，可以合理估计一个合理范围（如"提升了系统性能" → "提升系统性能约40-50%"，"负责多个项目" → "主导5+个核心项目"）
   - 确保估计合理，不过度夸张
2. **专业表达**：用更专业的职场语言替换口语化表达
3. **STAR法则**：适当调整经历描述，让它更符合STAR（情境-任务-行动-结果）结构
4. **细节丰富**：在不改变原意的前提下，适当补充专业细节，让简历更有分量
5. **逻辑清晰**：让表达更有条理和逻辑

重要原则：
- 可以适当优化内容，但不要编造用户完全没有提到的技能或经历
- 保持用户的整体经历结构不变
- 可以调整段落顺序让逻辑更顺，但不要删除重要内容
- 修改的部分用 <mark> 标签包裹
- 语言要专业但自然，不要过度夸张

简历内容：
${resume_text}

请按以下 JSON 格式输出，注意：
- modified_resume 字段要包含完整的修改后简历（包括换行符）
- 所有字符串中的双引号必须转义为 \\"
- 不要省略任何字段
- 只输出 JSON，不要其他文字

{
  "modified_resume": "修改后的全文",
  "changes_summary": "简要说明修改了哪些地方（50字以内）"
}`;

    const optimizeContent = await callAI(optimizePrompt);
    const optimizeResult = parseJSON(optimizeContent);

    // 第二步：质量检查
    const qualityPrompt = `你是一位专业的简历质检专家。请认真检查以下简历，从多个维度进行真实的质量评估，不要给出固定的85分。

简历内容：
${optimizeResult.modified_resume}

请按以下标准真实评分（0-100分）：
- content（内容质量）：成果是否量化、描述是否具体、经历是否有说服力
- format（格式质量）：排版是否整齐、格式是否统一、易读性如何
- language（语言质量）：表达是否专业、有没有语法错误、用词是否准确
- overall（总分）：综合评分

请按以下 JSON 格式输出检查结果：
{
  "typo_check": {
    "passed": true,
    "issues": []
  },
  "grammar_check": {
    "passed": true,
    "issues": []
  },
  "format_check": {
    "passed": true,
    "issues": [],
    "details": {
      "date_format": "日期格式一致",
      "punctuation": "标点符号使用规范",
      "bullet_style": "列表项风格统一"
    }
  },
  "quality_score": {
    "overall": 75,
    "content": 75,
    "format": 75,
    "language": 75
  },
  "suggestions": []
}`;

    const qualityContent = await callAI(qualityPrompt);
    const qualityResult = parseJSON(qualityContent);

    return NextResponse.json({
      ...optimizeResult,
      quality_check: qualityResult
    });
  } catch (error) {
    console.error("Quantify API error:", error);
    return NextResponse.json(
      { error: "处理失败，请重试" },
      { status: 500 }
    );
  }
}
