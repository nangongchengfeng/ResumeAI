"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResumeInput from "@/components/ResumeInput";
import JDInput from "@/components/JDInput";
import ResultDisplay from "@/components/ResultDisplay";
import QuantifyDialog from "@/components/QuantifyDialog";
import {
  Sparkles,
  RefreshCw,
  Copy,
  Download,
  ArrowLeft,
  ChevronRight,
  Clipboard,
  X
} from "lucide-react";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'source'>('rendered');
  const [mounted, setMounted] = useState(false);

  // 量化成果弹窗状态
  const [quantifyDialogOpen, setQuantifyDialogOpen] = useState(false);
  const [quantifyResult, setQuantifyResult] = useState<{
    modified_resume: string;
    changes_summary: string;
    quality_check?: any;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // AI 一键量化成果
  const handleQuantify = async () => {
    if (!resume) return;

    setIsAnalyzing(true);
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
      console.error("Quantify error:", error);
      alert("量化失败，请重试");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 接受量化修改
  const acceptQuantify = () => {
    if (quantifyResult) {
      // 去掉 <mark> 标签
      const cleanResume = quantifyResult.modified_resume.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
      setResume(cleanResume);
    }
    setQuantifyDialogOpen(false);
    setQuantifyResult(null);
  };

  // 简历优化
  const handleOptimize = async () => {
    if (!resume || !jd) return;

    setIsAnalyzing(true);
    setIsStreaming(false);
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

      // 分析完成，开始流式输出
      setIsAnalyzing(false);
      setIsStreaming(true);

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
      console.error("Optimize error:", error);
      alert("优化失败，请重试");
    } finally {
      setIsAnalyzing(false);
      setIsStreaming(false);
    }
  };

  // 复制结果
  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert(viewMode === 'source' ? "已复制 Markdown 源码" : "已复制 Markdown 源码");
  };

  // 下载Markdown文件
  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `优化简历_${date}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 100%)'
    }}>
      {/* 顶部导航栏 - Apple风格玻璃效果 */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="container mx-auto px-6" style={{ height: '52px' }}>
          <div className="flex items-center justify-between h-full">
            {/* 左侧导航 */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 transition-all duration-200 hover:opacity-70"
                style={{
                  minHeight: '44px',
                  color: '#1d1d1f',
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft className="h-4 w-4" style={{ strokeWidth: 1.5 }} />
                <span
                  style={{
                    fontSize: '13px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 400,
                    letterSpacing: '-0.01em'
                  }}
                >
                  返回首页
                </span>
              </Link>

              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                    boxShadow: '0 2px 8px rgba(0, 102, 255, 0.2)'
                  }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: '#ffffff', strokeWidth: 1.5 }} />
                </div>
                <span
                  style={{
                    fontSize: '15px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.02em'
                  }}
                >
                  AI 简历优化工作台
                </span>
              </div>
            </div>

            {/* 右侧操作区 */}
            <div className="flex items-center gap-3">
              {/* AI 一键量化成果按钮 - Apple风格主按钮 */}
              <button
                onClick={handleQuantify}
                disabled={!resume || isAnalyzing || isStreaming}
                className="relative overflow-hidden transition-all duration-300 ease-out"
                style={{
                  background: (!resume || isAnalyzing || isStreaming)
                    ? 'rgba(0, 102, 255, 0.4)'
                    : 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '10px 18px',
                  borderRadius: '980px',
                  border: 'none',
                  cursor: (!resume || isAnalyzing || isStreaming) ? 'default' : 'pointer',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: (!resume || isAnalyzing || isStreaming)
                    ? 'none'
                    : '0 4px 12px rgba(0, 102, 255, 0.25)',
                  opacity: (!resume || isAnalyzing || isStreaming) ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!resume || isAnalyzing || isStreaming) return;
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.25)';
                }}
                onMouseDown={(e) => {
                  if (!resume || isAnalyzing || isStreaming) return;
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  if (!resume || isAnalyzing || isStreaming) return;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
              >
                {isAnalyzing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" style={{ strokeWidth: 1.5 }} />
                ) : (
                  <Sparkles className="h-4 w-4" style={{ strokeWidth: 1.5 }} />
                )}
                <span>AI 一键量化</span>
              </button>

              {/* 分隔线 */}
              <div style={{
                width: '1px',
                height: '24px',
                background: 'rgba(0, 0, 0, 0.1)'
              }} />

              {/* 工具按钮组 */}
              <div className="flex items-center gap-2">
                <ToolButton
                  icon={<RefreshCw className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                  label="重置"
                  onClick={() => {
                    setResult("");
                    setAnalysis(null);
                  }}
                />
                <ToolButton
                  icon={<Copy className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                  label="复制"
                  onClick={handleCopy}
                  disabled={!result}
                />
                <ToolButton
                  icon={<Download className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                  label="下载"
                  onClick={handleDownload}
                  disabled={!result}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 三栏主体 - Apple风格精致布局 */}
      <main className="flex-1 flex overflow-hidden" style={{ padding: '20px' }}>
        {/* 左栏：简历输入 */}
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: '35%',
            background: '#ffffff',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            marginRight: '12px'
          }}
        >
          <SectionHeader
            title="你的简历"
            subtitle="粘贴或输入你的简历内容"
            action={
              <div className="flex items-center gap-2">
                {resume && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'rgba(0, 0, 0, 0.4)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {resume.length} 字
                  </span>
                )}
                <HeaderButton
                  icon={<Clipboard className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                  label="粘贴"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setResume(text);
                    } catch (error) {
                      console.error("Failed to paste:", error);
                    }
                  }}
                />
                {resume && (
                  <HeaderButton
                    icon={<X className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                    label="清空"
                    onClick={() => setResume("")}
                    isDanger
                  />
                )}
              </div>
            }
          />
          <div className="flex-1 overflow-hidden">
            <ResumeInput value={resume} onChange={setResume} />
          </div>
        </div>

        {/* 中间：JD输入 */}
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: '25%',
            background: '#ffffff',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            marginRight: '12px'
          }}
        >
          <SectionHeader
            title="目标职位"
            subtitle="粘贴职位描述 (JD)"
            action={
              <div className="flex items-center gap-2">
                {jd && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'rgba(0, 0, 0, 0.4)',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {jd.length} 字
                  </span>
                )}
                <HeaderButton
                  icon={<Clipboard className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                  label="粘贴"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setJd(text);
                    } catch (error) {
                      console.error("Failed to paste:", error);
                    }
                  }}
                />
                {jd && (
                  <HeaderButton
                    icon={<X className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                    label="清空"
                    onClick={() => setJd("")}
                    isDanger
                  />
                )}
              </div>
            }
          />
          <div className="flex-1 overflow-hidden">
            <JDInput value={jd} onChange={setJd} />
          </div>
        </div>

        {/* 右栏：结果展示 */}
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: '40%',
            background: '#ffffff',
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <ResultDisplay
            analysis={analysis}
            result={result}
            onOptimize={handleOptimize}
            isAnalyzing={isAnalyzing}
            isStreaming={isStreaming}
            canOptimize={!!resume && !!jd}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>
      </main>

      {/* 量化成果弹窗 */}
      {quantifyResult && (
        <QuantifyDialog
          open={quantifyDialogOpen}
          onOpenChange={setQuantifyDialogOpen}
          modifiedResume={quantifyResult.modified_resume}
          changesSummary={quantifyResult.changes_summary}
          qualityCheck={quantifyResult.quality_check}
          onAccept={acceptQuantify}
          onCancel={() => {
            setQuantifyDialogOpen(false);
            setQuantifyResult(null);
          }}
        />
      )}
    </div>
  );
}

// 工具按钮组件 - Apple风格
function ToolButton({
  icon,
  label,
  onClick,
  disabled = false
}: {
  icon: React.ReactNode,
  label: string,
  onClick: () => void,
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="transition-all duration-200 ease-out"
      style={{
        background: 'rgba(0, 0, 0, 0.03)',
        color: disabled ? 'rgba(0, 0, 0, 0.2)' : '#1d1d1f',
        fontSize: '13px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        padding: '8px 14px',
        borderRadius: '980px',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        opacity: disabled ? 0.4 : 1
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)';
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// 区块头部组件
function SectionHeader({
  title,
  subtitle,
  action
}: {
  title: string,
  subtitle: string,
  action?: React.ReactNode
}) {
  return (
    <div
      className="px-6 pt-5 pb-4 border-b"
      style={{
        borderColor: 'rgba(0, 0, 0, 0.05)',
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,252,1) 100%)'
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            style={{
              fontSize: '17px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              marginBottom: '3px'
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '12px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              color: 'rgba(0, 0, 0, 0.5)',
              letterSpacing: '-0.01em'
            }}
          >
            {subtitle}
          </p>
        </div>
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

// 头部按钮组件
function HeaderButton({
  icon,
  label,
  onClick,
  isDanger = false
}: {
  icon: React.ReactNode,
  label: string,
  onClick: () => void,
  isDanger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="transition-all duration-200 ease-out"
      style={{
        padding: '5px 10px',
        borderRadius: '980px',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
        letterSpacing: '-0.01em',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: 'rgba(0, 102, 255, 0.08)',
        color: isDanger ? '#dc2626' : '#0066ff'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDanger ? 'rgba(220, 38, 38, 0.1)' : 'rgba(0, 102, 255, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 102, 255, 0.08)';
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
