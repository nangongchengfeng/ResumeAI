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
              优化结果
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: '#666666'
              }}
            >
              AI 优化后的简历
            </p>
          </div>
          {/* 视图切换按钮 */}
          {result && (
            <div className="flex items-center gap-1" style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '4px' }}>
              <button
                onClick={() => onViewModeChange('rendered')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: viewMode === 'rendered' ? '#ffffff' : 'transparent',
                  color: viewMode === 'rendered' ? '#0066ff' : '#666666',
                  boxShadow: viewMode === 'rendered' ? '0 2px 6px rgba(0, 102, 255, 0.1)' : 'none'
                }}
              >
                <Eye className="h-4 w-4" />
                渲染
              </button>
              <button
                onClick={() => onViewModeChange('source')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: viewMode === 'source' ? '#ffffff' : 'transparent',
                  color: viewMode === 'source' ? '#0066ff' : '#666666',
                  boxShadow: viewMode === 'source' ? '0 2px 6px rgba(0, 102, 255, 0.1)' : 'none'
                }}
              >
                <Code className="h-4 w-4" />
                源码
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        {/* 评分卡 - 固定在顶部 */}
        {analysis && <ScoreCard analysis={analysis} style={{ marginBottom: '24px' }} />}

        {/* 开始优化按钮（无结果时显示） */}
        {!result && !isAnalyzing && !isStreaming && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ minHeight: '256px', textAlign: 'center' }}
          >
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#f0f7ff' }}
            >
              <Sparkles className="h-8 w-8" style={{ color: '#0066ff' }} />
            </div>
            <p
              className="mb-6"
              style={{
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#666666'
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
                backgroundColor: canOptimize ? '#0066ff' : '#e6f0ff',
                color: canOptimize ? '#ffffff' : '#999999',
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                padding: '14px 28px',
                borderRadius: '12px',
                border: '1px solid transparent',
                cursor: canOptimize ? 'pointer' : 'default',
                minHeight: '52px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                boxShadow: canOptimize ? '0 4px 12px rgba(0, 102, 255, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!canOptimize) return;
                e.currentTarget.style.backgroundColor = '#0052cc';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 255, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = canOptimize ? '#0066ff' : '#e6f0ff';
                e.currentTarget.style.boxShadow = canOptimize ? '0 4px 12px rgba(0, 102, 255, 0.25)' : 'none';
              }}
            >
              <Sparkles className="h-5 w-5" />
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
              className="animate-spin rounded-full mb-4"
              style={{
                width: '40px',
                height: '40px',
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: '#e6f0ff',
                borderBottomColor: '#0066ff'
              }}
            ></div>
            <p
              style={{
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: '#666666'
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
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#1a1a1a'
            }}
            className="markdown-body"
          >
            {isStreaming && !result && (
              <div
                className="flex items-center gap-2 text-gray-500"
                style={{ color: '#666666' }}
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
                h1: (props: any) => <h1 {...props} style={{ fontSize: '26px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 700, lineHeight: 1.2, marginTop: '24px', marginBottom: '12px', color: '#1a1a1a' }} />,
                h2: (props: any) => <h2 {...props} style={{ fontSize: '22px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.3, marginTop: '20px', marginBottom: '10px', color: '#1a1a1a' }} />,
                h3: (props: any) => <h3 {...props} style={{ fontSize: '18px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.4, marginTop: '16px', marginBottom: '8px', color: '#1a1a1a' }} />,
                h4: (props: any) => <h4 {...props} style={{ fontSize: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.4, marginTop: '14px', marginBottom: '6px', color: '#1a1a1a' }} />,
                p: (props: any) => <p {...props} style={{ marginBottom: '12px', color: '#1a1a1a' }} />,
                ul: (props: any) => <ul {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
                ol: (props: any) => <ol {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
                li: (props: any) => <li {...props} style={{ marginBottom: '6px', color: '#1a1a1a' }} />,
                strong: (props: any) => <strong {...props} style={{ fontWeight: 600, color: '#1a1a1a' }} />,
                em: (props: any) => <em {...props} style={{ fontStyle: 'italic' }} />,
                a: (props: any) => <a {...props} style={{ color: '#2563eb', textDecoration: 'underline' }} />,
                code: (props: any) => <code {...props} style={{ backgroundColor: '#f0f7ff', color: '#1a1a1a', padding: '2px 6px', borderRadius: '4px', fontSize: '14px', fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }} />,
                pre: (props: any) => <pre {...props} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', overflow: 'auto', marginBottom: '16px', border: '1px solid #e6f0ff' }} />,
                blockquote: (props: any) => <blockquote {...props} style={{ borderLeft: '4px solid #e6f0ff', paddingLeft: '16px', marginLeft: '0', marginBottom: '12px', color: '#666666' }} />,
                hr: (props: any) => <hr {...props} style={{ border: 'none', borderTop: '1px solid #e6f0ff', margin: '24px 0' }} />,
                table: (props: any) => <table {...props} style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }} />,
                thead: (props: any) => <thead {...props} />,
                tbody: (props: any) => <tbody {...props} />,
                tr: (props: any) => <tr {...props} />,
                th: (props: any) => <th {...props} style={{ border: '1px solid #e6f0ff', padding: '8px 12px', textAlign: 'left', backgroundColor: '#f8fafc' }} />,
                td: (props: any) => <td {...props} style={{ border: '1px solid #e6f0ff', padding: '8px 12px' }} />,
              }}>
                {result}
              </ReactMarkdown>
            )}
            {result && viewMode === 'source' && (
              <pre
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  border: '1px solid #e6f0ff',
                  fontSize: '14px',
                  fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  lineHeight: 1.6,
                  color: '#1a1a1a',
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
