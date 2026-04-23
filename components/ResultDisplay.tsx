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
      <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#1d1d1f',
                letterSpacing: '-0.02em',
                marginBottom: '4px'
              }}
            >
              优化结果
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: 'rgba(0, 0, 0, 0.5)',
                letterSpacing: '-0.01em'
              }}
            >
              AI 优化后的简历
            </p>
          </div>
          {/* 视图切换按钮 */}
          {result && (
            <div className="flex items-center gap-1" style={{ background: '#f5f5f7', borderRadius: '980px', padding: '4px' }}>
              <button
                onClick={() => onViewModeChange('rendered')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '980px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: viewMode === 'rendered' ? '#ffffff' : 'transparent',
                  color: viewMode === 'rendered' ? '#0071e3' : 'rgba(0, 0, 0, 0.5)',
                  boxShadow: viewMode === 'rendered' ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'
                }}
              >
                <Eye className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                渲染
              </button>
              <button
                onClick={() => onViewModeChange('source')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '980px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: viewMode === 'source' ? '#ffffff' : 'transparent',
                  color: viewMode === 'source' ? '#0071e3' : 'rgba(0, 0, 0, 0.5)',
                  boxShadow: viewMode === 'source' ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none'
                }}
              >
                <Code className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
                源码
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        {/* 评分卡 - 固定在顶部 */}
        {analysis && <ScoreCard analysis={analysis} style={{ marginBottom: '24px' }} />}

        {/* 开始优化按钮（无结果时显示） */}
        {!result && !isAnalyzing && !isStreaming && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: '256px', textAlign: 'center' }}
          >
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(0, 113, 227, 0.08)' }}
            >
              <Sparkles className="h-7 w-7" style={{ color: '#0071e3', strokeWidth: 1.5 }} />
            </div>
            <p
              className="mb-6"
              style={{
                fontSize: '17px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                lineHeight: 1.47,
                color: 'rgba(0, 0, 0, 0.6)',
                letterSpacing: '-0.021em'
              }}
            >
              {canOptimize
                ? "点击下方按钮开始优化简历"
                : "请先在左侧输入简历和 JD"}
            </p>
            <button
              onClick={onOptimize}
              disabled={!canOptimize}
              style={{
                background: canOptimize ? '#0071e3' : 'rgba(0, 0, 0, 0.08)',
                color: canOptimize ? '#ffffff' : 'rgba(0, 0, 0, 0.3)',
                fontSize: '17px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.021em',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: canOptimize ? 'pointer' : 'default',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.background = '#0077ed';
              }}
              onMouseLeave={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.background = '#0071e3';
              }}
              onMouseDown={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Sparkles className="h-4.5 w-4.5" style={{ strokeWidth: 1.5 }} />
              开始优化
            </button>
          </div>
        )}

        {/* 分析中 - 显示转圈 */}
        {isAnalyzing && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: '256px', textAlign: 'center' }}
          >
            <div
              className="animate-spin rounded-full mb-5"
              style={{
                width: '36px',
                height: '36px',
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: 'rgba(0, 0, 0, 0.06)',
                borderBottomColor: '#0071e3'
              }}
            />
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

        {/* 流式输出中 - 直接显示内容，不显示转圈 */}
        {(result || isStreaming) && (
          <div
            style={{
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#1d1d1f'
            }}
          >
            {isStreaming && !result && (
              <div
                className="flex items-center gap-2"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div
                  className="animate-pulse"
                >
                  AI 正在生成优化内容...
                </div>
                <span className="animate-pulse">...</span>
              </div>
            )}
            {result && viewMode === 'rendered' && (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                h1: (props: any) => <h1 {...props} style={{ fontSize: '28px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontWeight: 700, lineHeight: 1.14, letterSpacing: '-0.02em', marginTop: '24px', marginBottom: '12px', color: '#1d1d1f' }} />,
                h2: (props: any) => <h2 {...props} style={{ fontSize: '22px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.19, letterSpacing: '-0.021em', marginTop: '20px', marginBottom: '10px', color: '#1d1d1f' }} />,
                h3: (props: any) => <h3 {...props} style={{ fontSize: '18px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.24, letterSpacing: '-0.021em', marginTop: '16px', marginBottom: '8px', color: '#1d1d1f' }} />,
                h4: (props: any) => <h4 {...props} style={{ fontSize: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.01em', marginTop: '14px', marginBottom: '6px', color: '#1d1d1f' }} />,
                p: (props: any) => <p {...props} style={{ marginBottom: '12px', color: '#1d1d1f' }} />,
                ul: (props: any) => <ul {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
                ol: (props: any) => <ol {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
                li: (props: any) => <li {...props} style={{ marginBottom: '6px', color: '#1d1d1f' }} />,
                strong: (props: any) => <strong {...props} style={{ fontWeight: 600, color: '#0071e3' }} />,
                em: (props: any) => <em {...props} style={{ fontStyle: 'italic' }} />,
                a: (props: any) => <a {...props} style={{ color: '#0071e3', textDecoration: 'underline' }} />,
                code: (props: any) => <code {...props} style={{ background: 'rgba(0, 113, 227, 0.06)', color: '#1d1d1f', padding: '3px 8px', borderRadius: '6px', fontSize: '14px', fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }} />,
                pre: (props: any) => <pre {...props} style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px', overflow: 'auto', marginBottom: '16px', border: 'none' }} />,
                blockquote: (props: any) => <blockquote {...props} style={{ borderLeft: '4px solid #0071e3', paddingLeft: '16px', marginLeft: '0', marginBottom: '12px', color: 'rgba(0, 0, 0, 0.6)' }} />,
                hr: (props: any) => <hr {...props} style={{ border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.06)', margin: '24px 0' }} />,
                table: (props: any) => <table {...props} style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }} />,
                thead: (props: any) => <thead {...props} />,
                tbody: (props: any) => <tbody {...props} />,
                tr: (props: any) => <tr {...props} />,
                th: (props: any) => <th {...props} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '8px 12px', textAlign: 'left', background: '#f5f5f7' }} />,
                td: (props: any) => <td {...props} style={{ border: '1px solid rgba(0, 0, 0, 0.06)', padding: '8px 12px' }} />,
              }}>
                {result}
              </ReactMarkdown>
            )}
            {result && viewMode === 'source' && (
              <pre
                style={{
                  background: '#f5f5f7',
                  padding: '16px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  border: 'none',
                  fontSize: '14px',
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
