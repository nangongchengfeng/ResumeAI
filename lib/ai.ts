// 硅基流动 API 配置
export const SILICONFLOW_BASE_URL = "https://api.siliconflow.cn/v1";
export const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY || "";

// 模型配置
export const MODELS = {
  default: "deepseek-ai/DeepSeek-V2.5",
  fast: "deepseek-ai/DeepSeek-V2.5",
} as const;
