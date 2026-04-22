# Dashboard 布局优化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 优化dashboard布局，包括调整三栏比例、重组按钮布局、增强各栏功能。

**Architecture:** 
- 调整三栏比例从 30-30-40 到 35-25-40
- 重组顶部导航栏按钮，明确主次关系
- 增强 ResumeInput 和 JDInput 组件功能
- 移除重复按钮，统一操作入口

**Tech Stack:** Next.js 14, React, Lucide Icons, TypeScript

---

### Task 1: 调整三栏布局比例

**Files:**
- Modify: `app/dashboard/page.tsx:311-336`

**Step 1: 修改三栏宽度**

修改 dashboard/page.tsx 中的三栏宽度：
```typescript
// 左栏：简历输入 - 35%
<div className="flex flex-col" style={{ width: '35%', borderRight: '1px solid #e6f0ff', backgroundColor: '#ffffff' }}>
  <ResumeInput
    value={resume}
    onChange={setResume}
  />
</div>

// 中栏：JD输入 - 25%
<div className="flex flex-col" style={{ width: '25%', borderRight: '1px solid #e6f0ff', backgroundColor: '#ffffff' }}>
  <JDInput value={jd} onChange={setJd} />
</div>

// 右栏：结果展示 - 40%
<div className="flex flex-col" style={{ width: '40%', backgroundColor: '#ffffff' }}>
  <ResultDisplay
    analysis={analysis}
    result={result}
    onOptimize={handleOptimize}
    isAnalyzing={isAnalyzing}
    isStreaming={isStreaming}
    canOptimize={!!resume && !!jd}
  />
</div>
```

注意：需要从 ResumeInput props 中移除 onQuantify

**Step 2: 检查代码编译**

启动开发服务器检查是否有编译错误：
```bash
npm run dev
```
Expected: 开发服务器正常启动，无 TypeScript 错误

**Step 3: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "feat: adjust dashboard column ratio to 35-25-40"
```

---

### Task 2: 优化顶部导航栏按钮布局

**Files:**
- Modify: `app/dashboard/page.tsx:180-304`

**Step 1: 重组顶部导航栏按钮**

重构导航栏右侧按钮区域，突出主要操作：
```typescript
<div className="flex items-center gap-3">
  {/* 次要操作 */}
  <button
    onClick={handleQuantify}
    disabled={!resume || isAnalyzing || isStreaming}
    style={{
      backgroundColor: '#ffffff',
      color: '#0066ff',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 500,
      padding: '10px 16px',
      borderRadius: '12px',
      border: '1px solid #e6f0ff',
      cursor: 'pointer',
      minHeight: '42px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: (!resume || isAnalyzing || isStreaming) ? 0.5 : 1,
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!resume || isAnalyzing || isStreaming) return;
      e.currentTarget.style.backgroundColor = '#e6f0ff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
    }}
  >
    <Sparkles className="h-4 w-4" />
    AI 一键量化成果
  </button>
  
  {/* 分割线 */}
  <div style={{ width: '1px', height: '28px', backgroundColor: '#e6f0ff' }} />
  
  {/* 工具操作 */}
  <button
    onClick={() => {
      setResult("");
      setAnalysis(null);
    }}
    style={{
      backgroundColor: '#ffffff',
      color: '#666666',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 500,
      padding: '10px 14px',
      borderRadius: '10px',
      border: '1px solid #e6f0ff',
      cursor: 'pointer',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#f8fafc';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
    }}
  >
    <RefreshCw className="h-4 w-4" />
    重置
  </button>
  <button
    onClick={handleCopy}
    disabled={!result}
    style={{
      backgroundColor: '#ffffff',
      color: '#666666',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 500,
      padding: '10px 14px',
      borderRadius: '10px',
      border: '1px solid #e6f0ff',
      cursor: 'pointer',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: !result ? 0.5 : 1,
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!result) return;
      e.currentTarget.style.backgroundColor = '#f8fafc';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
    }}
  >
    <Copy className="h-4 w-4" />
    复制
  </button>
  <button
    disabled={!result}
    style={{
      backgroundColor: '#ffffff',
      color: '#666666',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 500,
      padding: '10px 14px',
      borderRadius: '10px',
      border: '1px solid #e6f0ff',
      cursor: 'pointer',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: !result ? 0.5 : 1,
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!result) return;
      e.currentTarget.style.backgroundColor = '#f8fafc';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
    }}
  >
    <Share2 className="h-4 w-4" />
    分享
  </button>
</div>
```

**Step 2: 检查代码编译**

```bash
npm run dev
```
Expected: 无编译错误

**Step 3: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "feat: reorganize top navigation buttons hierarchy"
```

---

### Task 3: 优化 ResumeInput 组件

**Files:**
- Modify: `components/ResumeInput.tsx`

**Step 1: 更新 ResumeInput 组件**

移除 onQuantify 相关代码，增加字数统计和清空按钮：
```typescript
"use client";

import { Sparkles, Clipboard, X } from "lucide-react";

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (error) {
      console.error("Failed to paste:", error);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#ffffff' }}>
      <div className="p-5" style={{ borderBottom: '1px solid #e6f0ff' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '4px'
              }}
            >
              简历输入
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: '#666666'
              }}
            >
              粘贴你的简历原文
            </p>
          </div>
          {value && (
            <span
              style={{
                fontSize: '13px',
                color: '#999999',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {value.length} 字
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePaste}
            style={{
              backgroundColor: '#f8fafc',
              color: '#0066ff',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #e6f0ff',
              cursor: 'pointer',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e6f0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
          >
            <Clipboard className="h-4 w-4" />
            粘贴简历
          </button>
          {value && (
            <button
              onClick={handleClear}
              style={{
                backgroundColor: '#f8fafc',
                color: '#999999',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid #e6f0ff',
                cursor: 'pointer',
                minHeight: '42px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.color = '#999999';
                e.currentTarget.style.borderColor = '#e6f0ff';
              }}
            >
              <X className="h-4 w-4" />
              清空
            </button>
          )}
        </div>

        <textarea
          placeholder="在此粘贴你的简历..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            resize: 'none',
            backgroundColor: '#f8fafc',
            color: '#1a1a1a',
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
            border: '1px solid #e6f0ff',
            borderRadius: '12px',
            padding: '16px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#0066ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e6f0ff';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
```

**Step 2: 检查代码编译**

```bash
npm run dev
```
Expected: 无编译错误

**Step 3: Commit**

```bash
git add components/ResumeInput.tsx
git commit -m "feat: enhance ResumeInput with word count and clear button"
```

---

### Task 4: 增强 JDInput 组件

**Files:**
- Create/Modify: `components/JDInput.tsx` (需要先查看现有内容)

**Step 1: 查看现有 JDInput 组件**

先读取 JDInput 组件内容：
```bash
cat components/JDInput.tsx
```

**Step 2: 增强 JDInput 组件**

添加粘贴按钮、清空按钮和字数统计：
```typescript
"use client";

import { Clipboard, X } from "lucide-react";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JDInput({ value, onChange }: JDInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (error) {
      console.error("Failed to paste:", error);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#ffffff' }}>
      <div className="p-5" style={{ borderBottom: '1px solid #e6f0ff' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#1a1a1a',
                marginBottom: '4px'
              }}
            >
              JD 输入
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: '#666666'
              }}
            >
              粘贴目标职位描述
            </p>
          </div>
          {value && (
            <span
              style={{
                fontSize: '13px',
                color: '#999999',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {value.length} 字
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePaste}
            style={{
              backgroundColor: '#f8fafc',
              color: '#0066ff',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid #e6f0ff',
              cursor: 'pointer',
              minHeight: '42px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e6f0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
          >
            <Clipboard className="h-4 w-4" />
            粘贴 JD
          </button>
          {value && (
            <button
              onClick={handleClear}
              style={{
                backgroundColor: '#f8fafc',
                color: '#999999',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid #e6f0ff',
                cursor: 'pointer',
                minHeight: '42px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.color = '#999999';
                e.currentTarget.style.borderColor = '#e6f0ff';
              }}
            >
              <X className="h-4 w-4" />
              清空
            </button>
          )}
        </div>

        <textarea
          placeholder="在此粘贴目标职位描述..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            resize: 'none',
            backgroundColor: '#f8fafc',
            color: '#1a1a1a',
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
            border: '1px solid #e6f0ff',
            borderRadius: '12px',
            padding: '16px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#0066ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e6f0ff';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
```

**Step 3: 检查代码编译**

```bash
npm run dev
```
Expected: 无编译错误

**Step 4: Commit**

```bash
git add components/JDInput.tsx
git commit -m "feat: enhance JDInput with paste, clear, and word count"
```

---

### Task 5: 优化 ResultDisplay 组件，添加主要操作按钮

**Files:**
- Modify: `components/ResultDisplay.tsx`
- 需要先查看现有内容

**Step 1: 查看 ResultDisplay 组件**

读取 ResultDisplay 组件内容

**Step 2: 在 ResultDisplay 顶部添加主要操作按钮**

在 ResultDisplay 组件中，将"开始优化"按钮设计为主要操作按钮。
代码需要根据现有结构适配，但核心思路是：
- 突出"开始优化"按钮，使用主色背景
- 按钮位置更显眼

**Step 3: 检查代码编译**

```bash
npm run dev
```
Expected: 无编译错误

**Step 4: Commit**

```bash
git add components/ResultDisplay.tsx
git commit -m "feat: enhance ResultDisplay with prominent primary action button"
```

---

### Task 6: 最终测试与验证

**Files:**
- No file changes - just testing

**Step 1: 测试完整流程**

1. 打开首页，点击"开始优化"
2. 在左侧粘贴简历
3. 在中间粘贴 JD
4. 点击"AI一键量化成果"测试
5. 点击"开始优化"测试
6. 测试"复制"、"重置"、"分享"功能
7. 测试字数统计显示
8. 测试清空按钮功能

**Step 2: 视觉检查**

确保所有按钮、文字、阴影都符合设计标准

**Step 3: Commit (if any fixes)**

```bash
# 如有小修复
git add .
git commit -m "fix: final touches for dashboard layout optimization"
```

---

## 计划完成

Plan complete and saved to `docs/plans/2026-04-22-dashboard-layout-optimization.md`. Two execution options:

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
