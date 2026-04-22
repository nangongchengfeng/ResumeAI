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

    const prompt = `你是一位拥有10年经验的资深技术招聘专家。请根据候选人简历和目标职位JD，优化出一份**相关度优先、详略得当、有血有肉、重点突出**的简历。

候选人简历：
${resume_text}

目标职位 JD：
${job_description}

优化原则（非常重要，必须严格遵守）：

1. **排序策略：相关度优先，时间倒序为辅**：
   - 第一优先级：与JD最匹配的项目/经历 → 放在最前面
   - 第二优先级：最近的2-3份工作/项目 → 时间倒序
   - 第三优先级：早期或边缘经历 → 精简带过
   - 标注：如果调整了顺序，可以在项目标题旁用小字说明，但主要按相关度排序

2. **详略得当，内容饱满**：
   - 核心项目（匹配度高、最近的）：详细展开，要有细节支撑，建议300-500字
   - 一般项目：适中描述，200-300字
   - 边缘项目：100字以内带过
   - 整体篇幅：1-2页A4纸（根据工作年限），饱满但不啰嗦

3. **成果前置，用数据和细节说话**：
   - 每段经历的开头用**加粗**突出最亮眼的成果
   - 所有能量化的成果必须量化（具体数字、百分比、倍数）
   - 保留具体细节（如"每周组织3次协调会"、"连续加班3天"），这些细节让简历更真实可信
   - 如果没有具体数字，用描述性成果（"提升了团队效率"、"获得年度优秀项目"）

4. **STAR完整且有血有肉**：
   - 情境/任务：1-2句话，让HR理解项目背景、挑战和难度
   - 行动：3-5个bullet点，具体说明你做了什么，用动词开头（主导、设计、开发、优化、推动等）
   - 结果：单独一行，**加粗**突出，说明你的贡献和影响

5. **关键词自然植入**：
   - 找出JD中的核心技能、技术栈、业务术语
   - 自然融入简历，不要生硬堆砌
   - 确保通过ATS筛选，同时让HR觉得真实可信

6. **突出个人贡献**：
   - 区分"团队完成"和"我做了什么"
   - 多用第一人称动词（我主导、我设计、我实现、我推动）
   - 说明你在项目中的具体角色和独特贡献

7. **视觉友好，便于快速扫描**：
   - 标题层级：## 项目/经历模块，### 具体项目名称
   - 用空行分隔不同项目，不要太拥挤
   - 重点内容用**加粗**，但不要整段都是加粗
   - 项目名称要概括性强，包含技术栈和成果关键词

8. **保留真实细节，增加说服力**：
   - 不要只说"做了一个项目"，要说"做了什么项目，用了什么技术，解决了什么问题，取得了什么成果"
   - 保留具体的技术细节（技术栈、架构、难点、解决方案）
   - 展示你的思考过程和解决问题的能力
   - 保留有温度的细节（如"连续加班3天"、"获得公司表扬"），这些让简历更立体

输出格式：
- 使用标准 Markdown
- 项目/经历按"相关度优先"排序
- 项目名称用三级标题（###）
- 具体内容用 bullet 列表（-）
- 成果单独一行，用**加粗**
- 保持适当的段落长度，不要每段只有1-2句话
- 项目之间用空行分隔

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
