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

    const prompt = `你是一位拥有 10 年经验的资深技术招聘专家。请根据候选人简历和目标职位 JD，优化简历内容。

候选人简历：
${resume_text}

目标职位 JD：
${job_description}

优化规则：
1. 使用 STAR 法则改写经历
2. 自然植入 JD 中的关键词
3. 量化成果（如果用户没有提到具体数字，不要编造，可以用合理的估算范围，但要注明"估算"）
4. 保持专业、自信、客观的语气
5. 严禁编造用户没有提到的经历
6. 只优化用户已经提到的内容，不要添加用户没有的技能或经历
7. 如果对某些信息不确定，保持原样，不要猜测
8. 使用标准 Markdown 格式，标题和列表要清晰

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
