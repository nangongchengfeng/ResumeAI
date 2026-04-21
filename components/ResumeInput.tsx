"use client";

import { Sparkles, Clipboard } from "lucide-react";

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
  onQuantify?: () => void;
}

export default function ResumeInput({ value, onChange, onQuantify }: ResumeInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (error) {
      console.error("Failed to paste:", error);
    }
  };

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

        {value && onQuantify && (
          <div className="mt-4">
            <button
              onClick={onQuantify}
              style={{
                width: '100%',
                backgroundColor: '#0066ff',
                color: '#ffffff',
                fontSize: '15px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid transparent',
                cursor: 'pointer',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
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
              <Sparkles className="h-4 w-4" />
              AI 一键量化成果
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
