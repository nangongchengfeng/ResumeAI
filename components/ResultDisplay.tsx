"use client";

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
    <div className="flex flex-col h-full" style={{ backgroundColor: '#ffffff' }}>
      <div className="p-5" style={{ borderBottom: '1px solid #e6f0ff' }}>
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

      <div className="flex-1 overflow-auto p-5">
        {/* 评分卡 - 固定在顶部 */}
        {analysis && <ScoreCard analysis={analysis} style={{ marginBottom: '24px' }} />}

        {/* 开始优化按钮（无结果时显示） */}
        {!result && !isLoading && (
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

        {/* 加载中 */}
        {isLoading && (
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
              AI 正在优化中...
            </p>
          </div>
        )}

        {/* 优化结果 */}
        {result && (
          <div
            style={{
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#1a1a1a'
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              h1: (props: any) => <h1 {...props} style={{ fontSize: '26px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 700, lineHeight: 1.2, marginTop: '24px', marginBottom: '12px', color: '#1a1a1a' }} />,
              h2: (props: any) => <h2 {...props} style={{ fontSize: '22px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.3, marginTop: '20px', marginBottom: '10px', color: '#1a1a1a' }} />,
              h3: (props: any) => <h3 {...props} style={{ fontSize: '18px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', fontWeight: 600, lineHeight: 1.4, marginTop: '16px', marginBottom: '8px', color: '#1a1a1a' }} />,
              p: (props: any) => <p {...props} style={{ marginBottom: '12px' }} />,
              ul: (props: any) => <ul {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
              ol: (props: any) => <ol {...props} style={{ marginBottom: '12px', paddingLeft: '24px' }} />,
              li: (props: any) => <li {...props} style={{ marginBottom: '6px' }} />,
              strong: (props: any) => <strong {...props} style={{ fontWeight: 600 }} />,
              code: (props: any) => <code {...props} style={{ backgroundColor: '#f0f7ff', color: '#0066ff', padding: '3px 8px', borderRadius: '6px', fontSize: '14px' }} />,
              pre: (props: any) => <pre {...props} style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', overflow: 'auto', marginBottom: '16px', border: '1px solid #e6f0ff' }} />
            }}>
              {result}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
