import { NextRequest } from "next/server";
import { MODELS, SILICONFLOW_API_KEY, SILICONFLOW_BASE_URL } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { resume_text, job_description } = await request.json();

    if (!resume_text || !job_description) {
      return new Response(JSON.stringify({ error: "简历和 JD 不能为空" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = `你是一位拥有10年经验的资深技术招聘专家。请根据候选人简历和目标职位JD，优化出一份**精简高效、重点突出**的简历。

候选人简历：
${resume_text}

目标职位 JD：
${job_description}

优化原则（非常重要）：
1. **极度精简**：HR扫简历只有3-5秒，每一句话都要有价值，删除废话
2. **成果前置**：最亮眼的成果用加粗（**）突出，放在每段的第一句或最后一句
3. **量化为王**：所有能数字量化的成果必须突出显示
4. **拒绝重复**：不要在多处重复描述相同内容，合并同类信息
5. **STAR简化**：不要用完整的STAR四段式，而是压缩成2-3行
   - 情境/任务：合并，用1句话带过
   - 行动：用2-3个bullet点列出核心动作
   - 结果：单独一行，加粗突出
6. **JD关键词**：自然植入JD中的核心技能和术语，确保通过ATS筛选
7. **视觉友好**：合理使用标题、空行分隔，便于快速扫描

输出格式：
- 使用标准 Markdown
- 项目/经历用三级标题（###）
- 具体内容用 bullet 列表
- 成果单独一行，用**加粗**
- 删除任何冗余的总结性段落

请直接输出优化后的简历全文，不需要其他说明。`;

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
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API request failed: ${error}`);
    }

    // 创建 TransformStream 来处理 SSE 格式
    const transformStream = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      },
    });

    const stream = response.body?.pipeThrough(transformStream);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Optimize API error:", error);
    return new Response(JSON.stringify({ error: "优化失败，请重试" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
