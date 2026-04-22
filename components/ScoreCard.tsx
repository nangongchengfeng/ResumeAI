"use client";

interface ScoreCardProps {
  analysis: {
    score: number;
    grade: string;
    score_text: string;
    missing_keywords: string[];
    analysis: string;
    score_breakdown: {
      keyword_match: number;
      quantification: number;
      star_framework: number;
      professionalism: number;
    };
  };
  style?: React.CSSProperties;
}

export default function ScoreCard({ analysis, style }: ScoreCardProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f5f7fa 100%)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        ...style
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            color: '#1d1d1f',
            letterSpacing: '-0.02em'
          }}
        >
          简历评分
        </h3>
        <div
          style={{
            padding: '6px 14px',
            borderRadius: '980px',
            fontSize: '15px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 85, 221, 0.1) 100%)',
            color: '#0066ff',
            letterSpacing: '-0.02em'
          }}
        >
          {analysis.grade}
        </div>
      </div>

      <div
        className="mb-2"
        style={{
          fontSize: '40px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 700,
          color: '#1d1d1f',
          letterSpacing: '-0.03em'
        }}
      >
        {analysis.score}<span style={{ fontSize: '24px', fontWeight: 600 }}>/100</span>
      </div>
      <p
        className="mb-6"
        style={{
          fontSize: '13px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 400,
          lineHeight: 1.5,
          color: 'rgba(0, 0, 0, 0.6)',
          letterSpacing: '-0.01em'
        }}
      >
        {analysis.score_text}
      </p>

      {/* 评分明细 */}
      <div className="space-y-4 mb-6">
        <ScoreBar
          label="关键词匹配度"
          value={analysis.score_breakdown.keyword_match}
          maxValue={40}
        />
        <ScoreBar
          label="成果量化程度"
          value={analysis.score_breakdown.quantification}
          maxValue={30}
        />
        <ScoreBar
          label="STAR 法则运用"
          value={analysis.score_breakdown.star_framework}
          maxValue={20}
        />
        <ScoreBar
          label="语言专业性"
          value={analysis.score_breakdown.professionalism}
          maxValue={10}
        />
      </div>

      {/* 缺失关键词 */}
      {analysis.missing_keywords.length > 0 && (
        <div className="mb-6">
          <h4
            className="mb-3"
            style={{
              fontSize: '13px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.01em'
            }}
          >
            缺失关键词
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_keywords.map((keyword, index) => (
              <span
                key={index}
                style={{
                  padding: '5px 12px',
                  backgroundColor: 'rgba(0, 102, 255, 0.08)',
                  color: '#0066ff',
                  borderRadius: '980px',
                  fontSize: '12px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.01em'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 分析 */}
      <p
        style={{
          fontSize: '13px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 400,
          lineHeight: 1.5,
          color: 'rgba(0, 0, 0, 0.6)',
          letterSpacing: '-0.01em'
        }}
      >
        {analysis.analysis}
      </p>
    </div>
  );
}

// 评分条组件
function ScoreBar({ label, value, maxValue }: { label: string, value: number, maxValue: number }) {
  const percentage = (value / maxValue) * 100;

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span
          style={{
            fontSize: '12px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.6)',
            letterSpacing: '-0.01em'
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: '12px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            color: '#0066ff',
            letterSpacing: '-0.01em'
          }}
        >
          {value}/{maxValue}
        </span>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '980px',
          height: '8px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #0066ff 0%, #0055dd 100%)',
            height: '8px',
            borderRadius: '980px',
            transition: 'width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        ></div>
      </div>
    </div>
  );
}
