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
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e6f0ff',
        ...style
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          style={{
            fontSize: '18px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            color: '#1a1a1a'
          }}
        >
          简历评分
        </h3>
        <div
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 700,
            backgroundColor: '#e6f0ff',
            color: '#0066ff'
          }}
        >
          {analysis.grade}
        </div>
      </div>

      <div
        className="mb-2"
        style={{
          fontSize: '44px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 700,
          color: '#1a1a1a'
        }}
      >
        {analysis.score}/100
      </div>
      <p
        className="mb-6"
        style={{
          fontSize: '15px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 400,
          lineHeight: 1.6,
          color: '#4a4a4a'
        }}
      >
        {analysis.score_text}
      </p>

      {/* 评分明细 */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                color: '#1a1a1a'
              }}
            >
              关键词匹配度
            </span>
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#0066ff'
              }}
            >
              {analysis.score_breakdown.keyword_match}/40
            </span>
          </div>
          <div
            style={{
              width: '100%',
              backgroundColor: '#e6f0ff',
              borderRadius: '10px',
              height: '10px'
            }}
          >
            <div
              style={{
                width: `${(analysis.score_breakdown.keyword_match / 40) * 100}%`,
                backgroundColor: '#0066ff',
                height: '10px',
                borderRadius: '10px',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                color: '#1a1a1a'
              }}
            >
              成果量化程度
            </span>
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#0066ff'
              }}
            >
              {analysis.score_breakdown.quantification}/30
            </span>
          </div>
          <div
            style={{
              width: '100%',
              backgroundColor: '#e6f0ff',
              borderRadius: '10px',
              height: '10px'
            }}
          >
            <div
              style={{
                width: `${(analysis.score_breakdown.quantification / 30) * 100}%`,
                backgroundColor: '#0066ff',
                height: '10px',
                borderRadius: '10px',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                color: '#1a1a1a'
              }}
            >
              STAR 法则运用
            </span>
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#0066ff'
              }}
            >
              {analysis.score_breakdown.star_framework}/20
            </span>
          </div>
          <div
            style={{
              width: '100%',
              backgroundColor: '#e6f0ff',
              borderRadius: '10px',
              height: '10px'
            }}
          >
            <div
              style={{
                width: `${(analysis.score_breakdown.star_framework / 20) * 100}%`,
                backgroundColor: '#0066ff',
                height: '10px',
                borderRadius: '10px',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                color: '#1a1a1a'
              }}
            >
              语言专业性
            </span>
            <span
              style={{
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#0066ff'
              }}
            >
              {analysis.score_breakdown.professionalism}/10
            </span>
          </div>
          <div
            style={{
              width: '100%',
              backgroundColor: '#e6f0ff',
              borderRadius: '10px',
              height: '10px'
            }}
          >
            <div
              style={{
                width: `${(analysis.score_breakdown.professionalism / 10) * 100}%`,
                backgroundColor: '#0066ff',
                height: '10px',
                borderRadius: '10px',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 缺失关键词 */}
      {analysis.missing_keywords.length > 0 && (
        <div className="mb-6">
          <h4
            className="mb-3"
            style={{
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              color: '#1a1a1a'
            }}
          >
            缺失关键词
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_keywords.map((keyword, index) => (
              <span
                key={index}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#e6f0ff',
                  color: '#0066ff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500
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
          fontSize: '14px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 400,
          lineHeight: 1.6,
          color: '#4a4a4a'
        }}
      >
        {analysis.analysis}
      </p>
    </div>
  );
}
