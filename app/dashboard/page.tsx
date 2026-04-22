"use client";

import { useState } from "react";
import Link from "next/link";
import ResumeInput from "@/components/ResumeInput";
import JDInput from "@/components/JDInput";
import ResultDisplay from "@/components/ResultDisplay";
import QuantifyDialog from "@/components/QuantifyDialog";
import { Sparkles, RefreshCw, Copy, Share2, ArrowLeft } from "lucide-react";

export default function Dashboard() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8fafc' }}>
      {/* 顶部导航栏 */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0, 102, 255, 0.08)'
        }}
      >
        <div className="container mx-auto px-4" style={{ height: '56px' }}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                style={{
                  minHeight: '44px',
                  color: '#0066ff',
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft className="h-5 w-5" />
                <span
                  style={{
                    fontSize: '15px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500
                  }}
                >
                  返回首页
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#e6f0ff' }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: '#0066ff' }} />
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    color: '#1a1a1a'
                  }}
                >
                  AI 简历优化工作台
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuantify}
                disabled={!resume || isAnalyzing || isStreaming}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0066ff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '1px solid #e6f0ff',
                  cursor: 'pointer',
                  minHeight: '40px',
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
              <button
                onClick={() => {
                  setResult("");
                  setAnalysis(null);
                }}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0066ff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  padding: '8px 16px',
                  borderRadius: '12px',
                  border: '1px solid #e6f0ff',
                  cursor: 'pointer',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e6f0ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <RefreshCw className="h-4 w-4" />
                重新优化
              </button>
              <button
                onClick={handleCopy}
                disabled={!result}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#0066ff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  padding: '8px 16px',
                  borderRadius: '12px',
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
                  e.currentTarget.style.backgroundColor = '#e6f0ff';
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
                  color: '#0066ff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  padding: '8px 16px',
                  borderRadius: '12px',
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
                  e.currentTarget.style.backgroundColor = '#e6f0ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <Share2 className="h-4 w-4" />
                分享
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 三栏主体 */}
      <main className="flex-1 flex overflow-hidden">
        {/* 左栏：简历输入 - 30% */}
        <div className="flex flex-col" style={{ width: '30%', borderRight: '1px solid #e6f0ff', backgroundColor: '#ffffff' }}>
          <ResumeInput
            value={resume}
            onChange={setResume}
            onQuantify={handleQuantify}
          />
        </div>

        {/* 中栏：JD 输入 - 30% */}
        <div className="flex flex-col" style={{ width: '30%', borderRight: '1px solid #e6f0ff', backgroundColor: '#ffffff' }}>
          <JDInput value={jd} onChange={setJd} />
        </div>

        {/* 右栏：结果展示 - 40% */}
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
