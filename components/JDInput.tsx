"use client";

import { Clipboard, X } from "lucide-react";

interface JDInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JDInput({ value, onChange }: JDInputProps) {
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
              JD 输入
            </h2>
            <p
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 400,
                color: '#666666'
              }}
            >
              粘贴目标职位描述
            </p>
          </div>
          {value && (
            <span
              style={{
                fontSize: '13px',
                color: '#999999',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              {value.length} 字
            </span>
          )}
        </div>
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
            粘贴 JD
          </button>
          {value && (
            <button
              onClick={handleClear}
              style={{
                backgroundColor: '#f8fafc',
                color: '#999999',
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
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.color = '#dc2626';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.color = '#999999';
                e.currentTarget.style.borderColor = '#e6f0ff';
              }}
            >
              <X className="h-4 w-4" />
              清空
            </button>
          )}
        </div>

        <textarea
          placeholder="在此粘贴目标职位描述..."
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
      </div>
    </div>
  );
}
