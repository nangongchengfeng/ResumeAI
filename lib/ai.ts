// 硅基流动 API 配置
export const SILICONFLOW_BASE_URL = "https://api.siliconflow.cn/v1";
export const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY || "";

// 模型配置
export const MODELS = {
  default: process.env.SILICONFLOW_MODEL_DEFAULT || "deepseek-ai/DeepSeek-V3.2",
  fast: process.env.SILICONFLOW_MODEL_FAST || process.env.SILICONFLOW_MODEL_DEFAULT || "deepseek-ai/DeepSeek-V3.2",
} as const;
