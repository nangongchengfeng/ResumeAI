"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeInput from "@/components/ResumeInput";
import JDInput from "@/components/JDInput";
import ResultDisplay from "@/components/ResultDisplay";
import QuantifyDialog from "@/components/QuantifyDialog";
import { Sparkles, RefreshCw, Copy, Download, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'source'>('rendered');

  // 量化成果弹窗状态
  const [quantifyDialogOpen, setQuantifyDialogOpen] = useState(false);
  const [quantifyResult, setQuantifyResult] = useState<{
    modified_resume: string;
    changes_summary: string;
    quality_check?: any;
  } | null>(null);

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
    alert("已复制到剪贴板");
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
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f5f7' }}>
      {/* 顶部导航栏 */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="container mx-auto px-6" style={{ height: '52px' }}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 transition-all duration-200 ease-out"
                style={{
                  minHeight: '36px',
                  color: '#0071e3',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '4px 12px',
                  borderRadius: '980px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 113, 227, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <ArrowLeft className="h-4 w-4" style={{ strokeWidth: 1.5 }} />
                返回首页
              </Link>
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center"
                  style={{ background: '#0071e3' }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: '#ffffff', strokeWidth: 1.5 }} />
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

            <div className="flex items-center gap-3">
              {/* 次要操作 */}
              <button
                onClick={handleQuantify}
                disabled={!resume || isAnalyzing || isStreaming}
                style={{
                  background: !resume || isAnalyzing || isStreaming ? 'rgba(0, 0, 0, 0.04)' : '#ffffff',
                  color: !resume || isAnalyzing || isStreaming ? 'rgba(0, 0, 0, 0.3)' : '#0071e3',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '8px 16px',
                  borderRadius: '980px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: !resume || isAnalyzing || isStreaming ? 'default' : 'pointer',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!resume || isAnalyzing || isStreaming) return;
                  e.currentTarget.style.background = 'rgba(0, 113, 227, 0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!resume || isAnalyzing || isStreaming) return;
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <Sparkles className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                AI 一键量化成果
              </button>

              {/* 分隔线 */}
              <div style={{ width: '1px', height: '24px', background: 'rgba(0, 0, 0, 0.06)' }} />

              {/* 工具操作 */}
              <button
                onClick={() => {
                  setResult("");
                  setAnalysis(null);
                }}
                style={{
                  background: '#ffffff',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '6px 12px',
                  borderRadius: '980px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <RefreshCw className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                重置
              </button>
              <button
                onClick={handleCopy}
                disabled={!result}
                style={{
                  background: !result ? 'rgba(0, 0, 0, 0.04)' : '#ffffff',
                  color: !result ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '6px 12px',
                  borderRadius: '980px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: !result ? 'default' : 'pointer',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!result) return;
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!result) return;
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <Copy className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                复制
              </button>
              <button
                onClick={handleDownload}
                disabled={!result}
                style={{
                  background: !result ? 'rgba(0, 0, 0, 0.04)' : '#ffffff',
                  color: !result ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  padding: '6px 12px',
                  borderRadius: '980px',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: !result ? 'default' : 'pointer',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!result) return;
                  e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!result) return;
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <Download className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                下载
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 三栏主体 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 左栏：简历输入 - 35% */}
        <div className="flex flex-col" style={{ width: '35%', borderRight: '1px solid rgba(0, 0, 0, 0.06)', background: '#ffffff' }}>
          <ResumeInput
            value={resume}
            onChange={setResume}
          />
        </div>

        {/* 中栏：JD 输入 - 25% */}
        <div className="flex flex-col" style={{ width: '25%', borderRight: '1px solid rgba(0, 0, 0, 0.06)', background: '#ffffff' }}>
          <JDInput value={jd} onChange={setJd} />
        </div>

        {/* 右栏：结果展示 - 40% */}
        <div className="flex flex-col" style={{ width: '40%', background: '#ffffff' }}>
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
