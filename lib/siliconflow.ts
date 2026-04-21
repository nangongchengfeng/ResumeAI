// 硅基流动 API 配置（纯前端版本）
const SILICONFLOW_BASE_URL = "https://api.siliconflow.cn/v1";

export interface SiliconFlowConfig {
  apiKey: string;
  model?: string;
}

let config: SiliconFlowConfig = {
  apiKey: "",
  model: "deepseek-ai/DeepSeek-V2.5",
};

export function setConfig(newConfig: Partial<SiliconFlowConfig>) {
  config = { ...config, ...newConfig };
}

export function getConfig() {
  return config;
}

// 直接从 localStorage 存储 API Key
export function saveApiKeyToLocal(apiKey: string) {
  localStorage.setItem("siliconflow_api_key", apiKey);
  config.apiKey = apiKey;
}

export function getApiKeyFromLocal() {
  return localStorage.getItem("siliconflow_api_key") || "";
}

// 初始化时从 localStorage 读取
if (typeof window !== "undefined") {
  const savedKey = getApiKeyFromLocal();
  if (savedKey) {
    config.apiKey = savedKey;
  }
}

// 调用硅基流动 API
export async function callSiliconFlow(params: {
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  stream?: boolean;
  onStream?: (text: string) => void;
}) {
  const {
    messages,
    temperature = 0.7,
    stream = false,
    onStream,
  } = params;

  if (!config.apiKey) {
    throw new Error("请先配置 API Key");
  }

  const response = await fetch(`${SILICONFLOW_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature,
      stream,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API 请求失败: ${error}`);
  }

  if (stream && onStream) {
    // 流式响应处理
    const reader = response.body?.getReader();
    if (!reader) throw new Error("无法读取响应");

    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              onStream(fullText);
            }
          } catch (e) {
            // 忽略解析错误
          }
        }
      }
    }

    return fullText;
  } else {
    // 非流式响应
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }
}
