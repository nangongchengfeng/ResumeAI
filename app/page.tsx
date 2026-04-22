'use client';

import Link from "next/link";
import { Sparkles, ArrowRight, FileText, TrendingUp, Target, Zap, Users, CheckCircle, Quote, ChevronRight, Twitter, Linkedin, Github, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
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
            {/* 主导航链接 */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm font-medium transition-colors hover:text-blue-600"
                style={{ color: '#4a4a4a' }}
              >
                功能
              </Link>
              <Link
                href="#examples"
                className="text-sm font-medium transition-colors hover:text-blue-600"
                style={{ color: '#4a4a4a' }}
              >
                案例
              </Link>
            </nav>
          </div>
          <Link href="/dashboard">
            <button
              className="px-4 py-2 rounded-lg font-medium transition-all hover:opacity-90 hover:shadow-md"
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
        {/* Hero Section - 左右两栏布局 */}
        <section
          className="py-20 md:py-28"
          style={{
            background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* 左侧文案 */}
              <div>
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
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
                    2026 跳槽季 · AI 助力
                  </span>
                </div>

                {/* 主标题 */}
                <h1
                  className="mb-6"
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    lineHeight: 1.1,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  粘贴简历和目标 JD，
                  <br />
                  <span style={{ color: '#0066ff' }}>让 AI 帮你打磨得</span>
                  <br />
                  <span style={{ color: '#0066ff' }}>更有说服力</span>
                </h1>

                {/* 功能亮点列表 */}
                <div className="mb-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#e6f0ff' }}
                    >
                      <CheckCircle className="h-4 w-4" style={{ color: '#0066ff' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#1a1a1a',
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      AI 一键量化成果
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#e6f0ff' }}
                    >
                      <CheckCircle className="h-4 w-4" style={{ color: '#0066ff' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#1a1a1a',
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      智能匹配 JD 关键词
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#e6f0ff' }}
                    >
                      <CheckCircle className="h-4 w-4" style={{ color: '#0066ff' }} />
                    </div>
                    <span
                      style={{
                        fontSize: '16px',
                        color: '#1a1a1a',
                        fontWeight: 500,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      用 STAR 法则重写经历
                    </span>
                  </div>
                </div>

                {/* 结果导向的副标题 */}
                <p
                  className="mb-8 max-w-lg"
                  style={{
                    fontSize: '17px',
                    lineHeight: 1.6,
                    color: '#0066ff',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  简历通过率提升 300%，让面试官眼前一亮 ✨
                </p>

                {/* CTA 按钮 */}
                <div className="flex flex-col sm:flex-row gap-4">
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

              {/* 右侧 - 简历优化前后对比 Mockup */}
              <div className="relative hidden md:block">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />

                {/* 典型案例标题 */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#e6f0ff' }}>
                    <Users className="h-4 w-4" style={{ color: '#0066ff' }} />
                    <span style={{
                      color: '#0066ff',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}>
                      真实案例 · 前端工程师求职
                    </span>
                  </div>
                </div>

                <div className="relative space-y-6">
                  {/* 优化前 */}
                  <div
                    className="p-6 rounded-2xl relative"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="ml-2 text-xs text-gray-400">优化前</span>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-700">工作经历</div>
                      <div className="text-xs text-gray-500 leading-relaxed">
                        • 负责前端开发工作<br/>
                        • 写了一些项目代码<br/>
                        • 参与团队协作
                      </div>
                    </div>
                  </div>

                  {/* 箭头 */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ChevronRight className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  {/* 优化后 */}
                  <div
                    className="p-6 rounded-2xl relative border-2"
                    style={{
                      backgroundColor: '#ffffff',
                      borderColor: '#0066ff',
                      boxShadow: '0 20px 25px -5px rgba(0, 102, 255, 0.15)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <span className="ml-2 text-xs font-medium" style={{ color: '#0066ff' }}>优化后</span>
                      <CheckCircle className="h-4 w-4 ml-auto" style={{ color: '#0066ff' }} />
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-800">工作经历</div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        • <span className="text-blue-600 font-medium">主导</span>公司核心产品前端架构设计，<span className="text-blue-600 font-medium">用户量提升 200%</span><br/>
                        • <span className="text-blue-600 font-medium">使用 React + TypeScript</span> 重构项目，<span className="text-blue-600 font-medium">性能提升 40%</span><br/>
                        • <span className="text-blue-600 font-medium">带领 5 人小组</span>，建立代码规范，效率提升 30%
                      </div>
                    </div>
                    {/* 高亮修改标记 */}
                    <div className="absolute top-1/2 -right-3">
                      <div className="px-2 py-1 bg-red-100 rounded text-xs font-medium text-red-600 border border-red-200">
                        数据量化 +300%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 使用流程 */}
        <section id="examples" className="py-20" style={{ backgroundColor: '#ffffff' }}>
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
                三步搞定简历优化
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#666666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                简单高效，一分钟让你的简历焕然一新
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* 连接线 - 桌面版 */}
                <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />

                {/* 步骤 1 */}
                <div className="relative text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{ backgroundColor: '#e6f0ff', border: '4px solid #ffffff', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.15)' }}
                  >
                    <FileText className="h-10 w-10" style={{ color: '#0066ff' }} />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#0066ff' }}>1</div>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    复制简历
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#666666',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    把你的现有简历和目标 JD 粘贴进来
                  </p>
                </div>

                {/* 步骤 2 */}
                <div className="relative text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{ backgroundColor: '#e6f0ff', border: '4px solid #ffffff', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.15)' }}
                  >
                    <Sparkles className="h-10 w-10" style={{ color: '#0066ff' }} />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#0066ff' }}>2</div>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    AI 优化
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#666666',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    AI 智能分析，量化成果，匹配关键词
                  </p>
                </div>

                {/* 步骤 3 */}
                <div className="relative text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
                    style={{ backgroundColor: '#e6f0ff', border: '4px solid #ffffff', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.15)' }}
                  >
                    <ArrowRight className="h-10 w-10" style={{ color: '#0066ff' }} />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#0066ff' }}>3</div>
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    分享使用
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.6,
                      color: '#666666',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                    }}
                  >
                    一键复制优化后的简历，直接投递使用
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 功能特性 */}
        <section id="features" className="py-20" style={{ backgroundColor: '#f8fafc' }}>
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
                  backgroundColor: '#ffffff',
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
                  backgroundColor: '#ffffff',
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
                  backgroundColor: '#ffffff',
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

        {/* 用户证言 */}
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
                用户真实反馈
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#666666',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                看看他们是如何通过 AI 优化拿到心仪 offer 的
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* 证言卡片 1 */}
              <div
                className="p-8 rounded-2xl relative"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <Quote className="h-8 w-8 mb-4" style={{ color: '#0066ff', opacity: 0.3 }} />
                <p
                  className="mb-6"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#4a4a4a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  "用了这个工具后，我的简历通过率从 10% 提升到了 50%，真的太神奇了！量化成果的功能特别棒。"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: '#0066ff' }}
                  >
                    张
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        fontSize: '15px',
                        color: '#1a1a1a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      张明
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#666666',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      前端工程师 · 头部互联网公司
                    </div>
                  </div>
                </div>
              </div>

              {/* 证言卡片 2 */}
              <div
                className="p-8 rounded-2xl relative"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <Quote className="h-8 w-8 mb-4" style={{ color: '#0066ff', opacity: 0.3 }} />
                <p
                  className="mb-6"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#4a4a4a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  "STAR 法则重写的经历让我在面试时更有条理，面试官说我的简历看起来非常专业！"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: '#3b82f6' }}
                  >
                    李
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        fontSize: '15px',
                        color: '#1a1a1a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      李雪
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#666666',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      产品经理 · 头部互联网公司
                    </div>
                  </div>
                </div>
              </div>

              {/* 证言卡片 3 */}
              <div
                className="p-8 rounded-2xl relative"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <Quote className="h-8 w-8 mb-4" style={{ color: '#0066ff', opacity: 0.3 }} />
                <p
                  className="mb-6"
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#4a4a4a',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  "关键词匹配功能帮我通过了好多大厂的 ATS 筛选，终于收到面试邀请了！"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: '#60a5fa' }}
                  >
                    王
                  </div>
                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        fontSize: '15px',
                        color: '#1a1a1a',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      王浩
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: '#666666',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      算法工程师 · 头部互联网公司
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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

      {/* 页脚 - 扩展版本 */}
      <footer className="py-12" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* 品牌信息 */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" style={{ color: '#0066ff' }} />
                <span
                  className="font-semibold"
                  style={{
                    color: '#ffffff',
                    fontSize: '16px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  AI 简历优化
                </span>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: 1.6
                }}
              >
                用 AI 帮你找到更好的工作
              </p>
            </div>

            {/* 产品链接 */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                产品
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    style={{
                      fontSize: '14px',
                      color: '#9ca3af',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    功能
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    style={{
                      fontSize: '14px',
                      color: '#9ca3af',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    帮助中心
                  </Link>
                </li>
              </ul>
            </div>

            {/* 法律链接 */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                法律
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    style={{
                      fontSize: '14px',
                      color: '#9ca3af',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    style={{
                      fontSize: '14px',
                      color: '#9ca3af',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      textDecoration: 'none'
                    }}
                    className="hover:text-white transition-colors"
                  >
                    服务条款
                  </Link>
                </li>
              </ul>
            </div>

            {/* 社交媒体 */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                }}
              >
                关注我们
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                  style={{ backgroundColor: '#374151' }}
                >
                  <Twitter className="h-5 w-5" style={{ color: '#ffffff' }} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                  style={{ backgroundColor: '#374151' }}
                >
                  <Linkedin className="h-5 w-5" style={{ color: '#ffffff' }} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                  style={{ backgroundColor: '#374151' }}
                >
                  <Github className="h-5 w-5" style={{ color: '#ffffff' }} />
                </a>
              </div>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="pt-8 border-t" style={{ borderColor: '#374151' }}>
            <p
              className="text-center"
              style={{
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
              }}
            >
              AI 简历优化 © 2026 · 保留所有权利
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
