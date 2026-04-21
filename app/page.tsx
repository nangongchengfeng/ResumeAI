'use client';

import Link from "next/link";
import { Sparkles, ArrowRight, FileText, TrendingUp, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: '#0066ff' }} />
            <span
              className="font-semibold"
              style={{
                color: '#1a1a1a',
                fontSize: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              AI 简历优化
            </span>
          </div>
          <Link href="/dashboard">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: '#0066ff',
                color: '#ffffff',
                fontSize: '14px',
                minHeight: '36px'
              }}
            >
              开始使用
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - 渐变蓝色背景 */}
        <section
          className="py-20 md:py-32"
          style={{
            background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ backgroundColor: '#e6f0ff' }}
              >
                <Sparkles className="h-4 w-4" style={{ color: '#0066ff' }} />
                <span
                  style={{
                    color: '#0066ff',
                    fontSize: '14px',
                    fontWeight: 500,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  2024 跳槽季 · AI 助力
                </span>
              </div>

              {/* 主标题 */}
              <h1
                className="mb-6"
                style={{
                  fontSize: '48px',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                粘贴简历和目标 JD，
                <br />
                <span style={{ color: '#0066ff' }}>让 AI 帮你打磨得更有说服力</span>
              </h1>

              {/* 副标题 */}
              <p
                className="mb-10 max-w-2xl mx-auto"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#4a4a4a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                AI 一键量化成果，智能匹配关键词，用 STAR 法则重写经历，让你的简历通过率大幅提升
              </p>

              {/* CTA 按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <button
                    className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:translate-y-[-2px] hover:shadow-lg flex items-center gap-2"
                    style={{
                      backgroundColor: '#0066ff',
                      color: '#ffffff',
                      boxShadow: '0 8px 30px rgba(0, 102, 255, 0.3)',
                      minHeight: '52px'
                    }}
                  >
                    开始优化
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 功能特性 - 白色背景 */}
        <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2
                className="mb-4"
                style={{
                  fontSize: '36px',
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                三大核心功能
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#666666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                一站式解决简历优化的所有痛点
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* 功能卡片 1 */}
              <div
                className="p-8 rounded-2xl transition-all hover:translate-y-[-4px]"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#e6f0ff' }}
                >
                  <TrendingUp className="h-7 w-7" style={{ color: '#0066ff' }} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  AI 量化成果
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#666666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  把"做了一些项目"变成"主导 X 项目，提升 Y%"，用数据说话更有说服力
                </p>
              </div>

              {/* 功能卡片 2 */}
              <div
                className="p-8 rounded-2xl transition-all hover:translate-y-[-4px]"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#e6f0ff' }}
                >
                  <Target className="h-7 w-7" style={{ color: '#0066ff' }} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  关键词匹配
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#666666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  智能识别 JD 关键词，自然融入简历，轻松通过 ATS 筛选
                </p>
              </div>

              {/* 功能卡片 3 */}
              <div
                className="p-8 rounded-2xl transition-all hover:translate-y-[-4px]"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#e6f0ff' }}
                >
                  <Zap className="h-7 w-7" style={{ color: '#0066ff' }} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  STAR 法则
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.6,
                    color: '#666666',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  用标准面试框架重写经历，让面试官一眼看到你的价值
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - 浅蓝色背景 */}
        <section
          className="py-20"
          style={{ backgroundColor: '#f0f7ff' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="mb-6"
                style={{
                  fontSize: '36px',
                  lineHeight: 1.2,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                准备好优化你的简历了吗？
              </h2>
              <p
                className="mb-10"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#4a4a4a',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                立即开始，让 AI 帮你把简历打磨得更有说服力
              </p>
              <Link href="/dashboard">
                <button
                  className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:translate-y-[-2px] hover:shadow-lg flex items-center gap-2 mx-auto"
                  style={{
                    backgroundColor: '#0066ff',
                    color: '#ffffff',
                    boxShadow: '0 8px 30px rgba(0, 102, 255, 0.3)',
                    minHeight: '52px'
                  }}
                >
                  立即开始
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="py-8" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container mx-auto px-4 text-center">
          <p
            style={{
              fontSize: '14px',
              color: '#999999',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          >
            AI 简历优化 © 2024 | 用 AI 帮你找到更好的工作
          </p>
        </div>
      </footer>
    </div>
  );
}
