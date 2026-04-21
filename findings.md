# Findings & Decisions

## Requirements
从设计文档提取的核心需求：

### 功能需求
- AI 一键量化成果（不需要 JD）
- 简历整体优化（需要简历 + JD）
- 评分系统（4维度：关键词40分、量化30分、STAR20分、专业性10分）
- 混合模式输出（第一次非流式分析 + 第二次流式优化）
- 支持复制到剪贴板
- 使用量统计（localStorage）
- 分享功能

### 技术需求
- Next.js 14 (App Router)
- Shadcn UI + Tailwind CSS
- Vercel AI SDK
- 硅基流动 API (https://api.siliconflow.cn/v1)
- 模型：deepseek-ai/DeepSeek-V2.5
- 部署到 Vercel

### 用户体验需求
- 三栏布局（左25%简历、中25% JD、右50%结果）
- 评分卡固定在顶部
- 流式输出打字机效果
- 弹窗预览 AI 量化成果
- Toast 成功提示

## Research Findings
关键发现：

### 设计文档中的架构
```
前端 (Next.js)
  ├── 首页 (Hero)
  ├── 工作台 (双栏输入)
  └── 结果展示 (混合输出)
        ├── localStorage (使用次数、历史、偏好)
        └── API Route /api/optimize
              └── 硅基流动 API (DeepSeek-V2.5)
```

### API 接口设计
1. `/api/quantify` - AI 一键量化成果（非流式）
2. `/api/analyze` - 简历分析（非流式，快速返回评分）
3. `/api/optimize` - 简历内容优化（流式）

### 评分标准
- A: 85-100
- B: 70-84
- C: 50-69
- D: 0-49

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| 分 Phase 1-6 执行 | 设计文档已明确划分，按部就班 |
| 先 Prompt 工程再代码 | 确保 AI 输出质量是核心 |
| 预留产品化钩子 | 为未来付费功能做准备 |
| 纯前端 MVP | 快速验证，降低复杂度 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| (待记录) | |

## Resources
- 设计文档: `docs/superpowers/specs/2026-04-21-ai-resume-optimizer-design.md`
- 硅基流动 API: https://api.siliconflow.cn/v1
- 模型: deepseek-ai/DeepSeek-V2.5

## Visual/Browser Findings
- 设计文档包含完整的架构图和 UI 布局图
- 三栏固定比例：左25%、中25%、右50%
- 顶部操作栏包含：AI 一键量化成果、重新优化、复制、分享

---
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
