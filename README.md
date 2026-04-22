# AI 简历优化 SaaS (Boss_JD)

一个完整的 AI 简历优化应用，使用 Next.js 14 + Shadcn UI + 硅基流动 API 构建，专为**社招 3-5 年**跳槽求职者打造。

## 功能特性

- 🤖 **AI 一键量化成果** - 将模糊描述转化为专业、量化的职场表达，适度优化内容
- 📊 **智能评分系统** - 4维度真实评分（关键词40分、量化30分、STAR20分、专业性10分）
- ✨ **简历整体优化** - 根据 JD 智能优化简历，分两步（先分析后流式输出）
- 🎯 **关键词匹配** - 智能识别缺失关键词
- 💾 **本地存储** - 无数据库，纯前端 MVP
- 📱 **三栏布局** - 30-30-40 黄金比例：简历输入、JD输入、结果展示

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
Boss_JD/
├── app/
│   ├── page.tsx                    # 首页
│   ├── layout.tsx                  # 根布局
│   ├── globals.css                 # 全局样式
│   ├── dashboard/
│   │   └── page.tsx               # 工作台（三栏布局：30-30-40）
│   └── api/
│       ├── quantify/route.ts       # 量化成果接口
│       ├── analyze/route.ts        # 简历分析接口（评分、关键词）
│       └── optimize/route.ts       # 简历优化接口（流式输出）
├── components/
│   ├── ui/                         # Shadcn UI 组件
│   ├── ResumeInput.tsx             # 简历输入组件
│   ├── JDInput.tsx                 # JD 输入组件
│   ├── ResultDisplay.tsx           # 结果展示组件
│   ├── ScoreCard.tsx               # 评分卡组件
│   └── QuantifyDialog.tsx          # 量化确认弹窗
├── lib/
│   └── ai.ts                       # AI 配置
├── docs/                           # 文档
│   └── superpowers/specs/
│       └── 2026-04-21-ai-resume-optimizer-design.md
├── package.json
└── tsconfig.json
```

## 目标用户

本产品专为**社招 3-5 年**想跳槽的求职者设计，帮助他们：
- 量化工作成果，让简历更有说服力
- 匹配目标职位关键词，通过 ATS 筛选
- 用 STAR 法则优化经历，提升面试通过率

## 使用说明

1. 访问首页，点击"开始优化"进入工作台
2. 在左侧（30%）粘贴你的简历
3. （可选）点击"AI 一键量化成果"先优化简历，查看修改后确认接受
4. 在中间（30%）粘贴目标职位 JD
5. 点击"开始优化"按钮
6. 右侧（40%）先展示评分和分析，再流式输出优化后的简历
7. 查看评分和优化结果
8. 点击"复制"复制优化后的简历

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

✅ **Phase 1**: Prompt 工程实战 - 设计高质量优化Prompt
✅ **Phase 2**: 项目初始化与 UI 搭建 - 三栏布局（30-30-40）
✅ **Phase 3**: AI API 集成（硅基流动）- 三个API接口：quantify、analyze、optimize
✅ **Phase 4**: 产品体验优化 - 优化量化逻辑、修复评分固定问题
⏳ **Phase 5**: 部署与迭代
⏳ **Phase 6**: 产品化增强

## 文档

- [设计文档](docs/superpowers/specs/2026-04-21-ai-resume-optimizer-design.md)
- [实施计划](docs/superpowers/plans/2026-04-21-ai-resume-optimizer-implementation.md)

## 许可证

MIT
