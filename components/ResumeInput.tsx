"use client";

import { Clipboard, X } from "lucide-react";

interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste?: () => void;
  onClear?: () => void;
  showHeader?: boolean;
}

export default function ResumeInput({
  value,
  onChange,
  onPaste: externalPaste,
  onClear: externalClear,
  showHeader = true
}: ResumeInputProps) {
  const handlePaste = async () => {
    if (externalPaste) {
      externalPaste();
    } else {
      try {
        const text = await navigator.clipboard.readText();
        onChange(text);
      } catch (error) {
        console.error("Failed to paste:", error);
      }
    }
  };

  const handleClear = () => {
    if (externalClear) {
      externalClear();
    } else {
      onChange("");
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#ffffff' }}>
      <div className="flex-1 px-6 py-5 flex flex-col">
        <textarea
          placeholder="在此粘贴你的简历..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            resize: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            color: '#1d1d1f',
            fontSize: '14px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: '12px',
            padding: '16px',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            letterSpacing: '-0.01em'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#0066ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(0, 102, 255, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(0, 0, 0, 0.06)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>
    </div>
  );
}
