"use client";

import Link from "next/link";
import {
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Brain
} from "lucide-react";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)'
      }}
    >
      {/* 导航栏 */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderColor: 'rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="container mx-auto px-6" style={{ height: '52px' }}>
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)'
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#ffffff', strokeWidth: 1.5 }} />
              </div>
              <span
                style={{
                  fontSize: '15px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  letterSpacing: '-0.02em'
                }}
              >
                简历优化大师
              </span>
            </div>
            <Link
              href="/dashboard"
              className="transition-all duration-300 ease-out"
              style={{
                background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                color: '#ffffff',
                fontSize: '13px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                padding: '8px 18px',
                borderRadius: '980px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 102, 255, 0.25)';
              }}
            >
              开始优化
              <ArrowRight className="h-3.5 w-3.5" style={{ strokeWidth: 1.5 }} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 左侧内容 */}
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(0, 102, 255, 0.08)'
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
                <span
                  style={{
                    fontSize: '13px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 500,
                    color: '#0066ff',
                    letterSpacing: '-0.01em'
                  }}
                >
                  2026 跳槽季 · AI 助力
                </span>
              </div>

              <div className="space-y-4">
                <h1
                  style={{
                    fontSize: '56px',
                    lineHeight: 1.07,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.028em'
                  }}
                >
                  粘贴简历和目标 JD，
                  <br />
                  <span style={{ color: '#0066ff' }}>让 AI 帮你打磨得</span>
                  <br />
                  <span style={{ color: '#0066ff' }}>更有说服力</span>
                </h1>

                <p
                  style={{
                    fontSize: '19px',
                    lineHeight: 1.5,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.6)',
                    letterSpacing: '-0.021em'
                  }}
                >
                  专为社招 3-5 年求职者设计，量化你的工作成果，
                  <br />
                  匹配目标职位关键词，让简历通过率暴涨。
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
                    <span
                      style={{
                        fontSize: '15px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      AI 一键量化成果
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
                    <span
                      style={{
                        fontSize: '15px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      智能匹配 JD 关键词
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
                    <span
                      style={{
                        fontSize: '15px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      用 STAR 法则重写经历
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* 数据量化标签 - 优化版 */}
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full opacity-30"
                      style={{
                        background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                        filter: 'blur(12px)',
                        transform: 'translateY(2px)'
                      }}
                    />
                    <div
                      className="relative px-5 py-2.5 rounded-full flex items-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                        boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)'
                      }}
                    >
                      <TrendingUp className="h-4.5 w-4.5" style={{ color: '#ffffff', strokeWidth: 1.5 }} />
                      <span
                        style={{
                          fontSize: '14px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        数据量化
                      </span>
                      <span
                        style={{
                          fontSize: '16px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 800,
                          color: '#ffffff',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        +300%
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 500,
                      color: '#0066ff',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    简历通过率提升，让面试官眼前一亮 ✨
                  </span>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 transition-all duration-300 ease-out"
                  style={{
                    background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
                    color: '#ffffff',
                    fontSize: '17px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '-0.021em',
                    padding: '14px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(0, 102, 255, 0.35)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 102, 255, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.35)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                >
                  开始优化
                  <ArrowRight className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
                </Link>
              </div>
            </div>

            {/* 右侧预览卡片 */}
            <div className="relative">
              {/* 装饰性背景 */}
              <div
                className="absolute -top-10 -right-10 w-72 h-72 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)'
                }}
              />

              {/* 卡片容器 */}
              <div className="space-y-5">
                {/* 优化前卡片 */}
                <div
                  className="rounded-2xl p-6 relative"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 500,
                        color: 'rgba(0, 0, 0, 0.4)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      优化前
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      工作经历
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 400,
                        color: 'rgba(0, 0, 0, 0.5)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.6
                      }}
                    >
                      • 负责前端开发工作
                      <br />
                      • 写了一些项目代码
                      <br />
                      • 参与团队协作
                    </p>
                  </div>
                </div>

                {/* 箭头装饰 */}
                <div className="flex justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <ArrowRight className="h-5 w-5" style={{ color: 'rgba(0, 0, 0, 0.4)', strokeWidth: 1.5 }} />
                  </div>
                </div>

                {/* 优化后卡片 */}
                <div
                  className="rounded-2xl p-6 relative"
                  style={{
                    background: '#ffffff',
                    boxShadow: '0 8px 32px rgba(0, 102, 255, 0.15)',
                    border: '2px solid #0066ff'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                      </div>
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                          fontWeight: 600,
                          color: '#0066ff',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        优化后
                      </span>
                    </div>
                    <CheckCircle2 className="h-5 w-5" style={{ color: '#0066ff', strokeWidth: 1.5 }} />
                  </div>
                  <div className="space-y-2">
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 600,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      工作经历
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                        fontWeight: 400,
                        color: '#1d1d1f',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.8
                      }}
                    >
                      • 主导公司核心产品前端架构设计，<strong style={{ color: '#0066ff' }}>用户量提升 200%</strong>
                      <br />
                      • 使用 React + TypeScript 重构项目，<strong style={{ color: '#0066ff' }}>性能提升 40%</strong>
                      <br />
                      • 带领 5 人小组，建立代码规范，<strong style={{ color: '#0066ff' }}>效率提升 30%</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性区域 */}
      <section className="py-20" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              style={{
                fontSize: '40px',
                lineHeight: 1.1,
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                color: '#1d1d1f',
                letterSpacing: '-0.028em',
                marginBottom: '8px'
              }}
            >
              强大功能，助力你拿到心仪 Offer
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-6 w-6" style={{ strokeWidth: 1.5 }} />,
                title: 'AI 智能优化',
                description: '基于 DeepSeek 大模型，深度理解你的简历和目标职位，智能优化内容表达'
              },
              {
                icon: <Target className="h-6 w-6" style={{ strokeWidth: 1.5 }} />,
                title: '关键词匹配',
                description: '自动识别 JD 核心关键词，智能植入你的简历，大幅提高 ATS 通过率'
              },
              {
                icon: <Zap className="h-6 w-6" style={{ strokeWidth: 1.5 }} />,
                title: '成果量化',
                description: '把模糊描述转化为数据支撑的成果，让你的经历更有说服力'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl transition-all duration-300 ease-out hover:transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f7 100%)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)'
                  }}
                >
                  <div style={{ color: '#ffffff' }}>
                    {feature.icon}
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: '21px',
                    lineHeight: 1.19,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 600,
                    color: '#1d1d1f',
                    letterSpacing: '-0.021em',
                    marginBottom: '8px'
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.5,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 400,
                    color: 'rgba(0, 0, 0, 0.6)',
                    letterSpacing: '-0.01em'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-20" style={{ background: '#f5f5f7' }}>
        <div className="container mx-auto px-6 text-center">
          <h2
            style={{
              fontSize: '40px',
              lineHeight: 1.1,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.028em',
              marginBottom: '24px'
            }}
          >
            准备好让你的简历脱颖而出了吗？
          </h2>
          <p
            style={{
              fontSize: '19px',
              lineHeight: 1.5,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              color: 'rgba(0, 0, 0, 0.6)',
              letterSpacing: '-0.021em',
              marginBottom: '40px'
            }}
          >
            只需粘贴简历和 JD，让 AI 帮你优化到完美
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 transition-all duration-300 ease-out"
            style={{
              background: 'linear-gradient(135deg, #0066ff 0%, #0055dd 100%)',
              color: '#ffffff',
              fontSize: '17px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              letterSpacing: '-0.021em',
              padding: '14px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0, 102, 255, 0.35)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 102, 255, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 102, 255, 0.35)';
            }}
          >
            立即开始优化
            <ArrowRight className="h-5 w-5" style={{ strokeWidth: 1.5 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
