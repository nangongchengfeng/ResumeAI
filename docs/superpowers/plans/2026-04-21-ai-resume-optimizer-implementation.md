# AI 简历优化 SaaS 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个完整的 AI 简历优化 SaaS 应用（MVP），使用 Next.js 14 + Shadcn UI + 硅基流动 API，实现简历量化、分析和优化功能。

**Architecture:** 纯前端 MVP + Next.js API Routes，无数据库，使用 localStorage 存储用户数据。AI 调用通过硅基流动 API (DeepSeek-V2.5)。

**Tech Stack:** Next.js 14 (App Router), Shadcn UI, Tailwind CSS, Vercel AI SDK, 硅基流动 API

---

## Phase 1: Prompt 工程实战

### Task 1.1: 准备测试数据

**Files:**
- Create: `data/test_resume.md`
- Create: `data/test_jd.md`

- [ ] **Step 1: 创建测试简历文件**

```markdown
# 测试简历

## 个人信息
- 姓名：张三
- 工作年限：4年
- 职位：前端开发工程师

## 工作经历

### 公司 A (2022-2024)
- 负责前端开发工作
- 做了一些项目，效果还不错
- 优化了页面性能
- 和团队协作完成任务

### 公司 B (2020-2022)
- 参与产品开发
- 写了很多代码
- 学习了新技术
```

- [ ] **Step 2: 创建测试 JD 文件**

```markdown
# 高级前端开发工程师

## 职位描述
我们正在寻找一位有经验的前端开发工程师加入我们的团队。

## 职责
- 负责公司核心产品的前端架构设计和开发
- 带领小团队完成项目交付
- 优化前端性能，提升用户体验
- 与产品、设计、后端团队紧密协作

## 要求
- 3-5年前端开发经验
- 精通 React、TypeScript
- 熟悉 Next.js、Tailwind CSS
- 有性能优化经验
- 有团队协作能力
- 了解微前端架构优先
```

- [ ] **Step 3: 验证文件创建**

Run: `ls data/`
Expected: `test_resume.md  test_jd.md`

---

### Task 1.2: 测试基础 Prompt

**Files:**
- Create: `prompts/quantify.md` (设计文档中的功能 1 Prompt)
- Create: `prompts/analyze.md` (设计文档中的功能 2a Prompt)
- Create: `prompts/optimize.md` (设计文档中的功能 2b Prompt)

- [ ] **Step 1: 创建 quantify Prompt 文件**

```markdown
你是一位资深招聘专家。请帮我优化这份简历，重点是将模糊的成果描述量化，让语言更专业。

规则：
1. 保持用户的原经历结构不变，不要删除任何原有内容
2. 只在用户提到的经历基础上优化措辞，不要编造任何没有提到的经历
3. 如果用户没有提到具体数字，不要编造具体数字，可以用"显著提升"、"大幅降低"等模糊描述，或者让用户补充
4. 只优化用户已经提到的内容，不要添加用户没有的技能或经历
5. 如果对某些信息不确定，保持原样，不要猜测
6. 用专业的职场语言，但不要太夸张
7. 修改的部分用 <mark> 标签包裹

简历内容：
{resume_text}

请按以下 JSON 格式输出：
{
  "modified_resume": "修改后的全文",
  "changes_summary": "简要说明修改了哪些地方（50字以内）"
}
```

- [ ] **Step 2: 创建 analyze Prompt 文件**

```markdown
你是一位拥有 10 年经验的资深技术招聘专家。请根据候选人简历和目标职位 JD，进行综合分析。

候选人简历：
{resume_text}

目标职位 JD：
{job_description}

评分标准：
- 关键词匹配度（40分）：是否覆盖了 JD 里的核心关键词
- 成果量化程度（30分）：经历是否有具体数字支撑
- STAR 法则运用（20分）：经历是否清晰完整
- 语言专业性（10分）：表达是否专业职场

等级划分：
- A: 85-100
- B: 70-84
- C: 50-69
- D: 0-49

任务：
1. 根据评分标准给简历打分（0-100）
2. 给出对应等级
3. 写出评分描述（一句话，比如"你的简历竞争力较强，但缺少部分关键关键词"）
4. 从 JD 中提取候选人简历缺失的关键词（最多 10 个）
5. 写一段简要分析（100 字以内）
6. 给出评分明细（各维度得分）

输出格式（JSON）：
{
  "score": 75,
  "grade": "B",
  "score_text": "你的简历竞争力较强，但缺少部分关键关键词",
  "missing_keywords": ["React", "TypeScript", "微服务"],
  "analysis": "简历经历丰富，但需要更多量化成果，并补充目标岗位的关键词",
  "score_breakdown": {
    "keyword_match": 30,
    "quantification": 20,
    "star_framework": 15,
    "professionalism": 10
  }
}
```

- [ ] **Step 3: 创建 optimize Prompt 文件**

```markdown
你是一位拥有 10 年经验的资深技术招聘专家。请根据候选人简历和目标职位 JD，优化简历内容。

候选人简历：
{resume_text}

目标职位 JD：
{job_description}

优化规则：
1. 使用 STAR 法则改写经历
2. 自然植入 JD 中的关键词
3. 量化成果（如果用户没有提到具体数字，不要编造，可以用合理的估算范围，但要注明"估算"）
4. 保持专业、自信、客观的语气
5. 严禁编造用户没有提到的经历
6. 只优化用户已经提到的内容，不要添加用户没有的技能或经历
7. 如果对某些信息不确定，保持原样，不要猜测
8. 使用标准 Markdown 格式，标题和列表要清晰

请直接输出优化后的简历全文，不需要其他说明。
```

- [ ] **Step 4: 验证 Prompt 文件创建**

Run: `ls prompts/`
Expected: `analyze.md  optimize.md  quantify.md`

---

### Task 1.3: 设计不同质量等级的 Prompt

**Files:**
- Create: `prompts/quantify_basic.md` (基础版)
- Create: `prompts/quantify_pro.md` (专业版)
- Create: `prompts/quantify_premium.md` (高级版)

- [ ] **Step 1: 创建基础版 Prompt**

```markdown
你是一位招聘专家。请帮我优化这份简历，让语言更专业。

简历内容：
{resume_text}

请输出优化后的简历。
```

- [ ] **Step 2: 创建专业版 Prompt**
（使用 Task 1.2 中的 quantify.md 内容）

- [ ] **Step 3: 创建高级版 Prompt**

```markdown
你是一位拥有 15 年经验的资深技术招聘专家，曾在多家一线互联网公司担任技术面试官，阅简历无数。

请帮我优化这份简历，目标是让它能通过 ATS 筛选，并在面试中脱颖而出。

规则：
1. 保持用户的原经历结构不变
2. 深度优化措辞，使用行业内最专业的表达
3. 将模糊描述转化为有说服力的量化成果（如果用户没给数字，用合理的行业标准范围，注明"估算"）
4. 使用 STAR 法则重新组织每一段经历
5. 修改部分用 <mark> 标签包裹
6. 严禁编造用户没有的经历

简历内容：
{resume_text}

请按以下 JSON 格式输出：
{
  "modified_resume": "修改后的全文",
  "changes_summary": "详细说明修改了哪些地方及为什么这样修改",
  "ats_tips": ["ATS 优化建议1", "ATS 优化建议2"]
}
```

---

## Phase 2: 项目初始化与 UI 搭建

### Task 2.1: 创建 Next.js 项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: 初始化 Next.js 项目**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"`
Expected: Next.js project initialized successfully

- [ ] **Step 2: 安装依赖**

```bash
npm install ai @ai-sdk/openai react-markdown remark-gfm lucide-react
npm install -D @types/node @types/react @types/react-dom eslint eslint-config-next postcss tailwindcss typescript
```

- [ ] **Step 3: 验证项目结构**

Run: `ls -la`
Expected: `app/  node_modules/  package.json  tsconfig.json  ...`

---

### Task 2.2: 配置 Shadcn UI

**Files:**
- Modify: `components.json` (create if needed)
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/textarea.tsx`
- Create: `components/ui/dialog.tsx`
- Create: `components/ui/toast.tsx`
- Create: `components/ui/sonner.tsx` (or similar)
- Create: `lib/utils.ts`

- [ ] **Step 1: 初始化 Shadcn UI**

```bash
npx shadcn@latest init
```

- [ ] **Step 2: 安装所需组件**

```bash
npx shadcn@latest add button card textarea dialog toast sonner
```

- [ ] **Step 3: 验证组件安装**

Run: `ls components/ui/`
Expected: `button.tsx  card.tsx  dialog.tsx  textarea.tsx  toast.tsx  ...`

---

### Task 2.3: 实现首页 Hero Section

**Files:**
- Create: `app/page.tsx`
- Modify: `app/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: 创建首页组件**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">AI 简历优化</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">跳槽季来啦！</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              粘贴你的简历和目标 JD，
              <br />
              <span className="text-blue-600">让我帮你把经历打磨得更有说服力！</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              AI 一键量化成果，智能匹配关键词，让你的简历通过率提升 300%
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  开始优化
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI 量化成果</h3>
                <p className="text-gray-600 text-sm">把"做了一些项目"变成"主导 X 项目，提升 Y%"</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">关键词匹配</h3>
                <p className="text-gray-600 text-sm">智能识别 JD 关键词，自然融入简历</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">STAR 法则</h3>
                <p className="text-gray-600 text-sm">用标准面试框架重写你的经历</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>AI 简历优化 © 2024 | 用 AI 帮你找到更好的工作</p>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: 更新 layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 简历优化 - 让你的简历通过率提升 300%",
  description: "AI 一键量化成果，智能匹配关键词，帮你优化简历",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: 启动开发服务器验证**

Run: `npm run dev`
Expected: Server starts at http://localhost:3000

---

### Task 2.4: 实现核心工作台（三栏布局）

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/ResumeInput.tsx`
- Create: `components/JDInput.tsx`
- Create: `components/ResultDisplay.tsx`
- Create: `components/ScoreCard.tsx`

- [ ] **Step 1: 创建工作台页面**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ResumeInput from "@/components/ResumeInput";
import JDInput from "@/components/JDInput";
import ResultDisplay from "@/components/ResultDisplay";
import { Sparkles, RefreshCw, Copy, Share2 } from "lucide-react";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantify = async () => {
    // TODO: 实现 AI 一键量化成果
  };

  const handleOptimize = async () => {
    // TODO: 实现简历优化
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    // TODO: Toast 提示
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部操作栏 */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-bold">AI 简历优化</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleQuantify}
              disabled={!resume || isLoading}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI 一键量化成果
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setResult("");
                setAnalysis(null);
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              重新优化
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!result}
            >
              <Copy className="mr-2 h-4 w-4" />
              复制
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!result}
            >
              <Share2 className="mr-2 h-4 w-4" />
              分享
            </Button>
          </div>
        </div>
      </header>

      {/* 三栏主体 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 左栏：简历输入 */}
        <div className="w-1/4 border-r flex flex-col">
          <ResumeInput value={resume} onChange={setResume} />
        </div>

        {/* 中栏：JD 输入 */}
        <div className="w-1/4 border-r flex flex-col">
          <JDInput value={jd} onChange={setJd} />
        </div>

        {/* 右栏：结果展示 */}
        <div className="w-2/4 flex flex-col">
          <ResultDisplay
            analysis={analysis}
            result={result}
            onOptimize={handleOptimize}
            isLoading={isLoading}
            canOptimize={!!resume && !!jd}
          />
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: 创建 ResumeInput 组件**

```tsx
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Paste } from "lucide-react";

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    onChange(text);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-2">简历输入</h2>
        <p className="text-sm text-gray-500">粘贴你的简历原文</p>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex gap-2 mb-3">
          <Button variant="secondary" size="sm" onClick={handlePaste}>
            <Paste className="mr-2 h-4 w-4" />
            粘贴简历
          </Button>
        </div>

        <Textarea
          placeholder="在此粘贴你的简历..."
          className="flex-1 resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <div className="mt-3">
            <Button variant="default" size="sm" className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              AI 一键量化成果
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 JDInput 组件**

```tsx
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paste } from "lucide-react";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JDInput({ value, onChange }: JDInputProps) {
  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    onChange(text);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-2">职位描述</h2>
        <p className="text-sm text-gray-500">粘贴目标职位 JD</p>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="flex gap-2 mb-3">
          <Button variant="secondary" size="sm" onClick={handlePaste}>
            <Paste className="mr-2 h-4 w-4" />
            粘贴 JD
          </Button>
        </div>

        <Textarea
          placeholder="在此粘贴目标职位的 JD..."
          className="flex-1 resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建 ResultDisplay 组件**

```tsx
import { Button } from "@/components/ui/button";
import ScoreCard from "./ScoreCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles } from "lucide-react";

interface ResultDisplayProps {
  analysis: any;
  result: string;
  onOptimize: () => void;
  isLoading: boolean;
  canOptimize: boolean;
}

export default function ResultDisplay({
  analysis,
  result,
  onOptimize,
  isLoading,
  canOptimize,
}: ResultDisplayProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-2">优化结果</h2>
        <p className="text-sm text-gray-500">AI 优化后的简历</p>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* 评分卡 - 固定在顶部 */}
        {analysis && <ScoreCard analysis={analysis} className="mb-6" />}

        {/* 开始优化按钮（无结果时显示） */}
        {!result && !isLoading && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Sparkles className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">
              {canOptimize
                ? "点击下方按钮开始优化简历"
                : "请先在左侧输入简历和 JD"}
            </p>
            <Button
              onClick={onOptimize}
              disabled={!canOptimize}
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              开始优化
            </Button>
          </div>
        )}

        {/* 加载中 */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">AI 正在优化中...</p>
          </div>
        )}

        {/* 优化结果 */}
        {result && (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建 ScoreCard 组件**

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreCardProps {
  analysis: {
    score: number;
    grade: string;
    score_text: string;
    missing_keywords: string[];
    analysis: string;
    score_breakdown: {
      keyword_match: number;
      quantification: number;
      star_framework: number;
      professionalism: number;
    };
  };
  className?: string;
}

export default function ScoreCard({ analysis, className }: ScoreCardProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600 bg-green-50";
      case "B":
        return "text-blue-600 bg-blue-50";
      case "C":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-red-600 bg-red-50";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>简历评分</CardTitle>
          <div className={`px-3 py-1 rounded-full font-bold text-lg ${getGradeColor(analysis.grade)}`}>
            {analysis.grade}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">{analysis.score}/100</div>
        <p className="text-gray-600 mb-4">{analysis.score_text}</p>

        {/* 评分明细 */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>关键词匹配度</span>
            <span>{analysis.score_breakdown.keyword_match}/40</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(analysis.score_breakdown.keyword_match / 40) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <span>成果量化程度</span>
            <span>{analysis.score_breakdown.quantification}/30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(analysis.score_breakdown.quantification / 30) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <span>STAR 法则运用</span>
            <span>{analysis.score_breakdown.star_framework}/20</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${(analysis.score_breakdown.star_framework / 20) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm">
            <span>语言专业性</span>
            <span>{analysis.score_breakdown.professionalism}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full"
              style={{ width: `${(analysis.score_breakdown.professionalism / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 缺失关键词 */}
        {analysis.missing_keywords.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">缺失关键词</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.missing_keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 分析 */}
        <p className="text-sm text-gray-600">{analysis.analysis}</p>
      </CardContent>
    </Card>
  );
}
```

---

### Task 2.5: 实现"AI 一键量化成果"弹窗预览

**Files:**
- Create: `components/QuantifyDialog.tsx`

- [ ] **Step 1: 创建 QuantifyDialog 组件**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface QuantifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modifiedResume: string;
  changesSummary: string;
  onAccept: () => void;
  onCancel: () => void;
}

export default function QuantifyDialog({
  open,
  onOpenChange,
  modifiedResume,
  changesSummary,
  onAccept,
  onCancel,
}: QuantifyDialogProps) {
  // 渲染带 mark 标签的内容
  const renderWithMark = (content: string) => {
    // 简单处理：将 <mark> 替换为带高亮的 span
    const parts = content.split(/(<mark>.*?<\/mark>)/g);
    return parts.map((part, index) => {
      if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
        const text = part.slice(6, -7);
        return (
          <mark key={index} className="bg-yellow-200 px-1 rounded">
            {text}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>AI 量化成果预览</DialogTitle>
          <DialogDescription>{changesSummary}</DialogDescription>
        </DialogHeader>

        <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
          <div className="prose prose-sm max-w-none">
            {renderWithMark(modifiedResume)}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="secondary" onClick={onCancel}>
            取消
          </Button>
          <Button onClick={onAccept}>
            接受修改
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Phase 3: AI API 集成（硅基流动）

### Task 3.1: 配置硅基流动 API

**Files:**
- Create: `.env.local`
- Create: `lib/ai.ts`
- Modify: `.gitignore`

- [ ] **Step 1: 创建 .env.local 文件**

```env
SILICONFLOW_API_KEY=your_api_key_here
```

- [ ] **Step 2: 创建 AI 配置文件**

```ts
import { createOpenAI } from "@ai-sdk/openai";

// 创建硅基流动客户端（兼容 OpenAI 格式）
export const siliconflow = createOpenAI({
  baseURL: "https://api.siliconflow.cn/v1",
  apiKey: process.env.SILICONFLOW_API_KEY,
});

// 模型配置
export const MODELS = {
  default: "deepseek-ai/DeepSeek-V2.5",
  fast: "deepseek-ai/DeepSeek-V2.5",
  // 预留其他模型
} as const;

// 请求拦截器（为未来使用量限制、A/B 测试预留）
export function requestInterceptor(options: any) {
  // TODO: 实现请求拦截逻辑
  return options;
}

// 响应拦截器
export function responseInterceptor(response: any) {
  // TODO: 实现响应拦截逻辑
  return response;
}
```

- [ ] **Step 3: 更新 .gitignore**

```
# 环境变量
.env.local
.env*.local

# 依赖
node_modules

# 构建输出
.next
dist

# IDE
.vscode
.idea
```

---

### Task 3.2: 实现 `/api/quantify` 接口

**Files:**
- Create: `app/api/quantify/route.ts`

- [ ] **Step 1: 创建 quantify API 路由**

```ts
import { NextRequest, NextResponse } from "next/server";
import { siliconflow, MODELS } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { resume_text } = await request.json();

    if (!resume_text) {
      return NextResponse.json(
        { error: "简历内容不能为空" },
        { status: 400 }
      );
    }

    const prompt = `你是一位资深招聘专家。请帮我优化这份简历，重点是将模糊的成果描述量化，让语言更专业。

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

    const response = await siliconflow.chat.completions.create({
      model: MODELS.default,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "";

    // 解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("无法解析 AI 响应");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Quantify API error:", error);
    return NextResponse.json(
      { error: "处理失败，请重试" },
      { status: 500 }
    );
  }
}
```

---

### Task 3.3: 实现 `/api/analyze` 接口

**Files:**
- Create: `app/api/analyze/route.ts`

- [ ] **Step 1: 创建 analyze API 路由**

```ts
import { NextRequest, NextResponse } from "next/server";
import { siliconflow, MODELS } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { resume_text, job_description } = await request.json();

    if (!resume_text || !job_description) {
      return NextResponse.json(
        { error: "简历和 JD 不能为空" },
        { status: 400 }
      );
    }

    const prompt = `你是一位拥有 10 年经验的资深技术招聘专家。请根据候选人简历和目标职位 JD，进行综合分析。

候选人简历：
${resume_text}

目标职位 JD：
${job_description}

评分标准：
- 关键词匹配度（40分）：是否覆盖了 JD 里的核心关键词
- 成果量化程度（30分）：经历是否有具体数字支撑
- STAR 法则运用（20分）：经历是否清晰完整
- 语言专业性（10分）：表达是否专业职场

等级划分：
- A: 85-100
- B: 70-84
- C: 50-69
- D: 0-49

任务：
1. 根据评分标准给简历打分（0-100）
2. 给出对应等级
3. 写出评分描述（一句话，比如"你的简历竞争力较强，但缺少部分关键关键词"）
4. 从 JD 中提取候选人简历缺失的关键词（最多 10 个）
5. 写一段简要分析（100 字以内）
6. 给出评分明细（各维度得分）

输出格式（JSON）：
{
  "score": 75,
  "grade": "B",
  "score_text": "你的简历竞争力较强，但缺少部分关键关键词",
  "missing_keywords": ["React", "TypeScript", "微服务"],
  "analysis": "简历经历丰富，但需要更多量化成果，并补充目标岗位的关键词",
  "score_breakdown": {
    "keyword_match": 30,
    "quantification": 20,
    "star_framework": 15,
    "professionalism": 10
  }
}`;

    const response = await siliconflow.chat.completions.create({
      model: MODELS.default,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || "";

    // 解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("无法解析 AI 响应");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: "分析失败，请重试" },
      { status: 500 }
    );
  }
}
```

---

### Task 3.4: 实现 `/api/optimize` 接口（流式输出）

**Files:**
- Create: `app/api/optimize/route.ts`

- [ ] **Step 1: 创建 optimize API 路由**

```ts
import { NextRequest } from "next/server";
import { siliconflow, MODELS } from "@/lib/ai";
import { createDataStreamResponse } from "ai";

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

    const response = await siliconflow.chat.completions.create({
      model: MODELS.default,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      stream: true,
    });

    // 创建流式响应
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
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
```

---

### Task 3.5: 前端集成 API 调用

**Files:**
- Modify: `app/dashboard/page.tsx`

- [ ] **Step 1: 更新 Dashboard 组件，集成 API 调用**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ResumeInput from "@/components/ResumeInput";
import JDInput from "@/components/JDInput";
import ResultDisplay from "@/components/ResultDisplay";
import QuantifyDialog from "@/components/QuantifyDialog";
import { Sparkles, RefreshCw, Copy, Share2 } from "lucide-react";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 量化成果弹窗状态
  const [quantifyDialogOpen, setQuantifyDialogOpen] = useState(false);
  const [quantifyResult, setQuantifyResult] = useState<{
    modified_resume: string;
    changes_summary: string;
  } | null>(null);

  const { toast } = useToast();

  // AI 一键量化成果
  const handleQuantify = async () => {
    if (!resume) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/quantify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resume }),
      });

      if (!response.ok) throw new Error("请求失败");

      const data = await response.json();
      setQuantifyResult(data);
      setQuantifyDialogOpen(true);
    } catch (error) {
      toast({
        title: "错误",
        description: "量化失败，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 接受量化修改
  const acceptQuantify = () => {
    if (quantifyResult) {
      setResume(quantifyResult.modified_resume);
    }
    setQuantifyDialogOpen(false);
    setQuantifyResult(null);
  };

  // 简历优化
  const handleOptimize = async () => {
    if (!resume || !jd) return;

    setIsLoading(true);
    setResult("");
    setAnalysis(null);

    try {
      // 第一步：调用 analyze 接口
      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resume, job_description: jd }),
      });

      if (!analyzeResponse.ok) throw new Error("分析失败");

      const analyzeData = await analyzeResponse.json();
      setAnalysis(analyzeData);

      // 第二步：调用 optimize 接口（流式）
      const optimizeResponse = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resume, job_description: jd }),
      });

      if (!optimizeResponse.ok) throw new Error("优化失败");

      // 处理流式响应
      const reader = optimizeResponse.body?.getReader();
      if (!reader) throw new Error("无法读取响应");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setResult(fullText);
      }
    } catch (error) {
      toast({
        title: "错误",
        description: "优化失败，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 复制结果
  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    toast({
      title: "已复制",
      description: "优化后的简历已复制到剪贴板",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部操作栏 - 同前 */}

      {/* 量化成果弹窗 */}
      {quantifyResult && (
        <QuantifyDialog
          open={quantifyDialogOpen}
          onOpenChange={setQuantifyDialogOpen}
          modifiedResume={quantifyResult.modified_resume}
          changesSummary={quantifyResult.changes_summary}
          onAccept={acceptQuantify}
          onCancel={() => {
            setQuantifyDialogOpen(false);
            setQuantifyResult(null);
          }}
        />
      )}

      {/* 三栏主体 - 同前 */}
    </div>
  );
}
```

---

## Phase 4-6: 后续阶段（简略）

### Phase 4: 产品体验优化

**Tasks:**
- Task 4.1: 实现 Toast 通知组件
- Task 4.2: 实现使用量统计（localStorage）
- Task 4.3: 实现分享功能
- Task 4.4: 排版优化（react-markdown + prose）
- Task 4.5: 敏感信息脱敏

### Phase 5: 部署与迭代

**Tasks:**
- Task 5.1: 部署到 Vercel
- Task 5.2: 配置环境变量
- Task 5.3: Vercel Analytics 集成

### Phase 6: 产品化增强

**Tasks:**
- Task 6.1: 使用量统计 UI
- Task 6.2: 分享功能完善
- Task 6.3: 一键重选功能

---

## 文件清单

### 最终项目结构

```
Boss_JD/
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
│   ├── ui/                          # Shadcn UI 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── textarea.tsx
│   │   ├── dialog.tsx
│   │   └── toast.tsx
│   ├── ResumeInput.tsx             # 简历输入
│   ├── JDInput.tsx                 # JD 输入
│   ├── ResultDisplay.tsx           # 结果展示
│   ├── ScoreCard.tsx               # 评分卡
│   └── QuantifyDialog.tsx          # 量化弹窗
├── lib/
│   └── ai.ts                       # AI 配置
├── prompts/                         # Prompt 文件
│   ├── quantify.md
│   ├── analyze.md
│   └── optimize.md
├── data/                            # 测试数据
│   ├── test_resume.md
│   └── test_jd.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── .env.local
└── .gitignore
```

---

## 验证清单

### Phase 1 验证
- [ ] 测试数据已创建
- [ ] Prompt 文件已创建
- [ ] 在硅基流动平台手动测试通过

### Phase 2 验证
- [ ] Next.js 项目可启动
- [ ] 首页显示正常
- [ ] 工作台三栏布局正确
- [ ] 弹窗组件可正常打开/关闭

### Phase 3 验证
- [ ] `/api/quantify` 接口返回正确 JSON
- [ ] `/api/analyze` 接口返回正确 JSON
- [ ] `/api/optimize` 接口流式输出正常
- [ ] 前端完整流程测试通过

---

**计划完成！** 现在可以开始执行了。
