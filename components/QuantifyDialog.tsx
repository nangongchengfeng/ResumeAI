"use client";

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
    const parts = content.split(/(<mark>.*?<\/mark>)/g);
    return parts.map((part, index) => {
      if (part.startsWith("<mark>") && part.endsWith("</mark>")) {
        const text = part.slice(6, -7);
        return (
          <mark
            key={index}
            style={{
              backgroundColor: 'rgba(0, 102, 255, 0.15)',
              color: '#0066ff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 500
            }}
          >
            {text}
          </mark>
        );
      }
      return part;
    });
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '85vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '28px 28px 20px 28px',
            borderBottom: '1px solid #e6f0ff'
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '6px'
            }}
          >
            AI 量化成果预览
          </h2>
          <p
            style={{
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#4a4a4a'
            }}
          >
            {changesSummary}
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            margin: '0 28px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #e6f0ff',
            maxHeight: '420px'
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#1a1a1a'
            }}
          >
            {renderWithMark(modifiedResume)}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '24px 28px 28px 28px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            borderTop: '1px solid #e6f0ff',
            marginTop: '24px'
          }}
        >
          <button
            onClick={onCancel}
            style={{
              backgroundColor: '#f8fafc',
              color: '#1a1a1a',
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 500,
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid #e6f0ff',
              cursor: 'pointer',
              minHeight: '46px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e6f0ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
            }}
          >
            取消
          </button>
          <button
            onClick={onAccept}
            style={{
              backgroundColor: '#0066ff',
              color: '#ffffff',
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: '12px',
              border: '1px solid transparent',
              cursor: 'pointer',
              minHeight: '46px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0052cc';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 102, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0066ff';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.25)';
            }}
          >
            接受修改
          </button>
        </div>
      </div>
    </div>
  );
}
