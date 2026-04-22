"use client";

import { useState } from "react";
import ScoreCard from "./ScoreCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Eye, Code } from "lucide-react";

interface ResultDisplayProps {
  analysis: any;
  result: string;
  onOptimize: () => void;
  isAnalyzing: boolean;
  isStreaming: boolean;
  canOptimize: boolean;
  viewMode: 'rendered' | 'source';
  onViewModeChange: (mode: 'rendered' | 'source') => void;
}

export default function ResultDisplay({
  analysis,
  result,
  onOptimize,
  isAnalyzing,
  isStreaming,
  canOptimize,
  viewMode,
  onViewModeChange,
}: ResultDisplayProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#ffffff' }}>
      {/* 头部 */}
      <div className="px-6 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <div className="flex items-center justify-between">
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
              优化结果
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
              AI 优化后的简历
            </p>
          </div>

          {/* 视图切换按钮 - Apple风格 */}
          {result && (
            <div
              className="flex items-center gap-1"
              style={{
                background: 'rgba(0, 0, 0, 0.03)',
                borderRadius: '980px',
                padding: '4px'
              }}
            >
              <ViewToggleButton
                icon={<Eye className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                label="渲染"
                active={viewMode === 'rendered'}
                onClick={() => onViewModeChange('rendered')}
              />
              <ViewToggleButton
                icon={<Code className="h-4 w-4" style={{ strokeWidth: 1.5 }} />}
                label="源码"
                active={viewMode === 'source'}
                onClick={() => onViewModeChange('source')}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        {/* 评分卡 */}
        {analysis && <ScoreCard analysis={analysis} style={{ marginBottom: '24px' }} />}

        {/* 开始优化按钮（无结果时显示） */}
        {!result && !isAnalyzing && !isStreaming && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: '280px', textAlign: 'center' }}
          >
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%)'
              }}
            >
              <Sparkles className="h-8 w-8" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
            </div>
            <p
              className="mb-6"
              style={{
                fontSize: '15px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.01em'
              }}
            >
              {canOptimize
                ? "点击下方按钮开始优化简历"
                : "请先在左侧输入简历和 JD"}
            </p>
            <button
              onClick={onOptimize}
              disabled={!canOptimize}
              className="relative overflow-hidden transition-all duration-300 ease-out"
              style={{
                background: canOptimize
                  ? 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)'
                  : 'rgba(0, 0, 0, 0.04)',
                color: canOptimize ? '#ffffff' : 'rgba(0, 0, 0, 0.25)',
                fontSize: '15px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                padding: '12px 28px',
                borderRadius: '980px',
                border: 'none',
                cursor: canOptimize ? 'pointer' : 'default',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: canOptimize ? '0 4px 12px rgba(0, 102, 255, 0.25)' : 'none',
                opacity: canOptimize ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = canOptimize ? '0 4px 12px rgba(0, 102, 255, 0.25)' : 'none';
              }}
              onMouseDown={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
            >
              <Sparkles className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
              <span>开始优化</span>
            </button>
          </div>
        )}

        {/* 分析中 - 显示精致的加载动画 */}
        {isAnalyzing && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: '280px', textAlign: 'center' }}
          >
            <div
              className="relative"
              style={{ width: '48px', height: '48px', marginBottom: '16px' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '3px solid rgba(0, 102, 255, 0.15)',
                }}
              />
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  border: '3px solid transparent',
                  borderTopColor: '#0066ff',
                  animationDuration: '0.8s'
                }}
              />
            </div>
            <p
              style={{
                fontSize: '15px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.01em'
              }}
            >
              AI 正在分析简历...
            </p>
          </div>
        )}

        {/* 流式输出中 */}
        {(result || isStreaming) && (
          <div
            style={{
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#1d1d1f',
              letterSpacing: '-0.01em'
            }}
            className="markdown-body"
          >
            {isStreaming && !result && (
              <div
                className="flex items-center gap-2"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div className="animate-pulse">
                  AI 正在生成优化内容...
                </div>
                <span className="animate-pulse">...</span>
              </div>
            )}

            {result && viewMode === 'rendered' && (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: (props: any) => <h1 {...props} style={{
                  fontSize: '24px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginTop: '24px',
                  marginBottom: '12px',
                  color: '#1d1d1f',
                  letterSpacing: '-0.03em'
                }} />,
                h2: (props: any) => <h2 {...props} style={{
                  fontSize: '20px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginTop: '20px',
                  marginBottom: '10px',
                  color: '#1d1d1f',
                  letterSpacing: '-0.02em'
                }} />,
                h3: (props: any) => <h3 {...props} style={{
                  fontSize: '17px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  marginTop: '16px',
                  marginBottom: '8px',
                  color: '#1d1d1f',
                  letterSpacing: '-0.02em'
                }} />,
                h4: (props: any) => <h4 {...props} style={{
                  fontSize: '15px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  marginTop: '14px',
                  marginBottom: '6px',
                  color: '#1d1d1f',
                  letterSpacing: '-0.01em'
                }} />,
                p: (props: any) => <p {...props} style={{
                  marginBottom: '12px',
                  color: '#1d1d1f'
                }} />,
                ul: (props: any) => <ul {...props} style={{
                  marginBottom: '12px',
                  paddingLeft: '24px'
                }} />,
                ol: (props: any) => <ol {...props} style={{
                  marginBottom: '12px',
                  paddingLeft: '24px'
                }} />,
                li: (props: any) => <li {...props} style={{
                  marginBottom: '6px',
                  color: '#1d1d1f'
                }} />,
                strong: (props: any) => <strong {...props} style={{
                  fontWeight: 600,
                  color: '#1d1d1f'
                }} />,
                em: (props: any) => <em {...props} style={{ fontStyle: 'italic' }} />,
                a: (props: any) => <a {...props} style={{
                  color: '#0066ff',
                  textDecoration: 'none'
                }} />,
                code: (props: any) => <code {...props} style={{
                  backgroundColor: 'rgba(0, 102, 255, 0.06)',
                  color: '#1d1d1f',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                }} />,
                pre: (props: any) => <pre {...props} style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  padding: '16px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  marginBottom: '16px',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }} />,
                blockquote: (props: any) => <blockquote {...props} style={{
                  borderLeft: '3px solid rgba(0, 102, 255, 0.3)',
                  paddingLeft: '16px',
                  marginLeft: '0',
                  marginBottom: '12px',
                  color: 'rgba(0, 0, 0, 0.6)'
                }} />,
                hr: (props: any) => <hr {...props} style={{
                  border: 'none',
                  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                  margin: '24px 0'
                }} />,
                table: (props: any) => <table {...props} style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginBottom: '12px'
                }} />,
                thead: (props: any) => <thead {...props} />,
                tbody: (props: any) => <tbody {...props} />,
                tr: (props: any) => <tr {...props} />,
                th: (props: any) => <th {...props} style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '8px 12px',
                  textAlign: 'left',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)'
                }} />,
                td: (props: any) => <td {...props} style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  padding: '8px 12px'
                }} />,
              }}>
                {result}
              </ReactMarkdown>
            )}

            {result && viewMode === 'source' && (
              <pre
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  padding: '16px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  fontSize: '13px',
                  fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  lineHeight: 1.6,
                  color: '#1d1d1f',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}
              >
                {result}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 视图切换按钮组件
function ViewToggleButton({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactNode,
  label: string,
  active: boolean,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="transition-all duration-200 ease-out"
      style={{
        padding: '6px 14px',
        borderRadius: '980px',
        fontSize: '13px',
        fontWeight: active ? 500 : 400,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
        letterSpacing: '-0.01em',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: active ? '#ffffff' : 'transparent',
        color: active ? '#0066ff' : 'rgba(0, 0, 0, 0.5)',
        boxShadow: active ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none'
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
