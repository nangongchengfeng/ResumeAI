# AI 简历优化 SaaS (Boss_JD)

一个完整的 AI 简历优化应用，使用 Next.js 14 + Shadcn UI + 硅基流动 API 构建。

## 功能特性

- 🤖 **AI 一键量化成果** - 将模糊描述转化为专业、量化的职场表达
- 📊 **智能评分系统** - 4维度评分（关键词40分、量化30分、STAR20分、专业性10分）
- ✨ **简历整体优化** - 根据 JD 智能优化简历，流式输出
- 🎯 **关键词匹配** - 智能识别缺失关键词
- 💾 **本地存储** - 无数据库，纯前端 MVP

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: Shadcn UI + Tailwind CSS
- **AI SDK**: Vercel AI SDK
- **AI 服务**: 硅基流动 (SiliconFlow)
- **模型**: deepseek-ai/DeepSeek-V2.5

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，然后填入你的硅基流动 API Key：

```env
SILICONFLOW_API_KEY=your_api_key_here
```

在 https://cloud.siliconflow.cn 获取 API Key。

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 项目结构

```
ResumeAI/
├── app/
│   ├── page.tsx                    # 首页
│   ├── layout.tsx                  # 根布局
│   ├── globals.css                 # 全局样式
│   ├── dashboard/
│   │   └── page.tsx               # 工作台
│   └── api/
│       ├── quantify/route.ts       # 量化接口
│       ├── analyze/route.ts        # 分析接口
│       └── optimize/route.ts       # 优化接口
├── components/
│   ├── ui/                         # Shadcn UI 组件
│   ├── ResumeInput.tsx             # 简历输入
│   ├── JDInput.tsx                 # JD 输入
│   ├── ResultDisplay.tsx           # 结果展示
│   ├── ScoreCard.tsx               # 评分卡
│   └── QuantifyDialog.tsx          # 量化弹窗
├── lib/
│   └── ai.ts                       # AI 配置
├── prompts/                        # Prompt 文件
├── data/                           # 测试数据
├── docs/                           # 文档
├── package.json
└── tsconfig.json
```

## 使用说明

1. 访问首页，点击"开始优化"进入工作台
2. 在左侧粘贴你的简历
3. 在中间粘贴目标职位 JD
4. （可选）点击"AI 一键量化成果"先优化简历
5. 点击"开始优化"按钮
6. 查看评分和优化结果
7. 点击"复制"复制优化后的简历

## 评分标准

| 维度 | 分值 | 说明 |
|------|------|------|
| 关键词匹配度 | 40 | 是否覆盖 JD 核心关键词 |
| 成果量化程度 | 30 | 经历是否有具体数字支撑 |
| STAR 法则运用 | 20 | 经历是否清晰完整 |
| 语言专业性 | 10 | 表达是否专业职场 |

等级划分：
- A: 85-100
- B: 70-84
- C: 50-69
- D: 0-49

## 开发阶段

✅ **Phase 0**: 详细执行计划创建
✅ **Phase 1**: Prompt 工程实战
✅ **Phase 2**: 项目初始化与 UI 搭建
✅ **Phase 3**: AI API 集成（硅基流动）
⏳ **Phase 4**: 产品体验优化
⏳ **Phase 5**: 部署与迭代
⏳ **Phase 6**: 产品化增强

## 文档

- [设计文档](docs/superpowers/specs/2026-04-21-ai-resume-optimizer-design.md)
- [实施计划](docs/superpowers/plans/2026-04-21-ai-resume-optimizer-implementation.md)

## 许可证

MIT
