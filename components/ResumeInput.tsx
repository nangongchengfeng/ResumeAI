"use client";

import { Clipboard, X } from "lucide-react";

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
              简历输入
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
              粘贴你的简历原文
            </p>
          </div>
          {value && (
            <span
              style={{
                fontSize: '13px',
                color: 'rgba(0, 0, 0, 0.4)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.01em'
              }}
            >
              {value.length} 字
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 px-6 py-5 flex flex-col">
        <div className="flex gap-2 mb-4">
          <button
            onClick={handlePaste}
            style={{
              background: '#f5f5f7',
              color: '#0071e3',
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              padding: '8px 16px',
              borderRadius: '980px',
              border: 'none',
              cursor: 'pointer',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 113, 227, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f5f5f7';
            }}
          >
            <Clipboard className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
            粘贴简历
          </button>
          {value && (
            <button
              onClick={handleClear}
              style={{
                background: '#f5f5f7',
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                padding: '8px 16px',
                borderRadius: '980px',
                border: 'none',
                cursor: 'pointer',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 59, 48, 0.08)';
                e.currentTarget.style.color = '#ff3b30';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f7';
                e.currentTarget.style.color = 'rgba(0, 0, 0, 0.5)';
              }}
            >
              <X className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
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
            background: '#f5f5f7',
            color: '#1d1d1f',
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 0 0 4px rgba(0, 113, 227, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
