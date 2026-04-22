"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCircle2, AlertCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface QualityCheck {
  typo_check: {
    passed: boolean;
    issues: string[];
  };
  grammar_check: {
    passed: boolean;
    issues: string[];
  };
  format_check: {
    passed: boolean;
    issues: string[];
    details: {
      date_format: string;
      punctuation: string;
      bullet_style: string;
    };
  };
  quality_score: {
    overall: number;
    content: number;
    format: number;
    language: number;
  };
  suggestions: string[];
}

interface QuantifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modifiedResume: string;
  changesSummary: string;
  qualityCheck?: QualityCheck;
  onAccept: () => void;
  onCancel: () => void;
}

export default function QuantifyDialog({
  open,
  onOpenChange,
  modifiedResume,
  changesSummary,
  qualityCheck,
  onAccept,
  onCancel,
}: QuantifyDialogProps) {
  const [showQualityReport, setShowQualityReport] = useState(true);

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
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#dc2626',
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const CheckItem = ({ title, check }: { title: string; check: { passed: boolean; issues: string[] } }) => (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #e6f0ff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: check.issues.length > 0 ? '8px' : 0 }}>
        {check.passed ? (
          <CheckCircle2 style={{ width: '20px', height: '20px', color: '#10b981' }} />
        ) : (
          <XCircle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
        )}
        <span style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#1a1a1a',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          {title}
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: '12px',
          fontWeight: 500,
          color: check.passed ? '#10b981' : '#ef4444',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          {check.passed ? '通过' : '发现问题'}
        </span>
      </div>
      {check.issues.length > 0 && (
        <ul style={{
          margin: 0,
          paddingLeft: '30px',
          color: '#666666',
          fontSize: '13px',
          lineHeight: 1.6,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          {check.issues.map((issue, i) => (
            <li key={i} style={{ marginBottom: '4px' }}>{issue}</li>
          ))}
        </ul>
      )}
    </div>
  );

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
          maxWidth: qualityCheck ? '1000px' : '800px',
          width: '95vw',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 16px 28px',
            borderBottom: '1px solid #e6f0ff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}
            >
              AI 量化成果预览
            </h2>
            {qualityCheck && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: qualityCheck.quality_score.overall >= 80 ? 'rgba(16, 185, 129, 0.1)' :
                                  qualityCheck.quality_score.overall >= 60 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: getScoreColor(qualityCheck.quality_score.overall),
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}>
                <CheckCircle2 style={{ width: '16px', height: '16px' }} />
                综合 {qualityCheck.quality_score.overall} 分
              </div>
            )}
          </div>
          <p
            style={{
              fontSize: '14px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#4a4a4a',
              margin: 0
            }}
          >
            {changesSummary}
          </p>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {/* 质检报告 - 左侧 */}
          {qualityCheck && (
            <div style={{
              width: '320px',
              borderRight: '1px solid #e6f0ff',
              backgroundColor: '#f8fafc',
              overflow: 'auto',
              flexShrink: 0
            }}>
              <button
                onClick={() => setShowQualityReport(!showQualityReport)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  borderBottom: '1px solid #e6f0ff'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle style={{ width: '18px', height: '18px', color: '#0066ff' }} />
                  质检报告
                </span>
                {showQualityReport ?
                  <ChevronUp style={{ width: '18px', height: '18px', color: '#666666' }} /> :
                  <ChevronDown style={{ width: '18px', height: '18px', color: '#666666' }} />
                }
              </button>

              {showQualityReport && (
                <div style={{ padding: '16px 20px' }}>
                  {/* 质量分数 */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#666666',
                      marginBottom: '12px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}>
                      质量评分
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {[
                        { label: '内容', score: qualityCheck.quality_score.content },
                        { label: '格式', score: qualityCheck.quality_score.format },
                        { label: '语言', score: qualityCheck.quality_score.language },
                        { label: '综合', score: qualityCheck.quality_score.overall }
                      ].map((item, i) => (
                        <div key={i} style={{
                          backgroundColor: '#ffffff',
                          padding: '12px',
                          borderRadius: '12px',
                          border: '1px solid #e6f0ff',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: getScoreColor(item.score),
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            marginBottom: '2px'
                          }}>
                            {item.score}
                          </div>
                          <div style={{
                            fontSize: '11px',
                            color: '#666666',
                            fontWeight: 500,
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                          }}>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 检查项 */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#666666',
                      marginBottom: '8px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}>
                      检查项
                    </div>
                    <div style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e6f0ff',
                      padding: '0 16px'
                    }}>
                      <CheckItem title="错别字检查" check={qualityCheck.typo_check} />
                      <CheckItem title="语法检查" check={qualityCheck.grammar_check} />
                      <CheckItem title="格式检查" check={qualityCheck.format_check} />
                    </div>
                  </div>

                  {/* 改进建议 */}
                  {qualityCheck.suggestions.length > 0 && (
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#666666',
                        marginBottom: '8px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}>
                        改进建议
                      </div>
                      <div style={{
                        backgroundColor: 'rgba(0, 102, 255, 0.05)',
                        borderRadius: '12px',
                        border: '1px solid #e6f0ff',
                        padding: '14px 16px'
                      }}>
                        <ul style={{
                          margin: 0,
                          paddingLeft: '18px',
                          color: '#1a1a1a',
                          fontSize: '13px',
                          lineHeight: 1.7,
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                        }}>
                          {qualityCheck.suggestions.map((suggestion, i) => (
                            <li key={i} style={{ marginBottom: i < qualityCheck.suggestions.length - 1 ? '8px' : 0 }}>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 简历内容 - 右侧 */}
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                padding: '20px 28px',
                backgroundColor: '#f8fafc',
                borderBottom: qualityCheck ? 'none' : '1px solid #e6f0ff'
              }}
            >
              <div style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#666666',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                marginBottom: qualityCheck ? 0 : '12px'
              }}>
                修改后的简历 <span style={{ color: '#dc2626' }}>（红色部分为修改内容）</span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '24px 28px 28px 28px'
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
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '20px 28px 24px 28px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            borderTop: '1px solid #e6f0ff'
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
