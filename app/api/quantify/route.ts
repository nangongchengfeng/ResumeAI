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
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("无法解析 AI 响应");
  }
  return JSON.parse(jsonMatch[0]);
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
    const optimizePrompt = `你是一位资深招聘专家。请帮我优化这份简历，重点是将模糊的成果描述量化，让语言更专业。

规则：
1. 保持用户的原经历结构不变，不要删除任何原有内容
2. 只在用户提到的经历基础上优化措辞，不要编造任何没有提到的经历
3. 如果用户没有提到具体数字，不要编造具体数字，可以用"显著提升"、"大幅降低"等模糊描述，或者让用户补充
4. 只优化用户已经提到的内容，不要添加用户没有的技能或经历
5. 如果对某些信息不确定，保持原样，不要猜测
6. 用专业的职场语言，但不要太夸张
7. 修改的部分用 <mark> 标签包裹

简历内容：
${resume_text}

请按以下 JSON 格式输出：
{
  "modified_resume": "修改后的全文",
  "changes_summary": "简要说明修改了哪些地方（50字以内）"
}`;

    const optimizeContent = await callAI(optimizePrompt);
    const optimizeResult = parseJSON(optimizeContent);

    // 第二步：质量检查
    const qualityPrompt = `你是一位专业的简历质检专家。请检查以下简历，从多个维度进行质量评估。

简历内容：
${optimizeResult.modified_resume}

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
    "overall": 85,
    "content": 85,
    "format": 85,
    "language": 85
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
