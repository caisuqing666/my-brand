'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './brand.css';

export default function BrandHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="brand-container">
      {/* 导航栏 */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <svg className="logo-icon" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M30 50 L50 30 L70 50" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M30 50 Q50 70 70 50" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span>个人品牌</span>
          </div>
          <div className="nav-links">
            <Link href="/brand" className="nav-link active">首页</Link>
            <Link href="/brand/psychology" className="nav-link">心理服务</Link>
            <Link href="/brand/growth" className="nav-link">成长之路</Link>
            <Link href="/brand/ai-lab" className="nav-link">AI实验室</Link>
            <Link href="/brand/resources" className="nav-link">资源库</Link>
          </div>
        </div>
      </nav>

      {/* 首页背景动画 */}
      <div className="home-background">
        <svg className="background-svg" viewBox="0 0 1200 800">
          {/* 跑道线条 */}
          <g className="track-lines">
            <path d="M0 200 Q300 150 600 200 T1200 200" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none"/>
            <path d="M0 300 Q300 250 600 300 T1200 300" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none"/>
            <path d="M0 400 Q300 350 600 400 T1200 400" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none"/>
            <path d="M0 500 Q300 450 600 500 T1200 500" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" fill="none"/>
          </g>
          {/* 神经网络节点 */}
          <g className="neural-network">
            <circle cx="200" cy="200" r="4" fill="rgba(249, 115, 22, 0.4)"/>
            <circle cx="400" cy="250" r="4" fill="rgba(249, 115, 22, 0.4)"/>
            <circle cx="600" cy="200" r="4" fill="rgba(249, 115, 22, 0.4)"/>
            <circle cx="800" cy="300" r="4" fill="rgba(249, 115, 22, 0.4)"/>
            <circle cx="1000" cy="250" r="4" fill="rgba(249, 115, 22, 0.4)"/>
            <line x1="200" y1="200" x2="400" y2="250" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1"/>
            <line x1="400" y1="250" x2="600" y2="200" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1"/>
            <line x1="600" y1="200" x2="800" y2="300" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1"/>
            <line x1="800" y1="300" x2="1000" y2="250" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1"/>
          </g>
        </svg>
      </div>

      {/* 主内容区 */}
      <main className="home-main">
        <section className="hero-section">
          <h1 className="hero-title">
            跨界融合 · 专业成长
            <span className="hero-subtitle">心理咨询 × 跑步训练 × AI探索</span>
          </h1>
        </section>

        {/* 三联动态卡片 */}
        <section className="cards-section">
          <div className="card-trio">
            <div className="dynamic-card card-psychology">
              <div className="card-icon">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" 
                        stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="card-title">心理咨询理念</h3>
              <p className="card-content">
                以人本主义为核心，结合认知行为疗法，帮助来访者建立内在力量。
                每一次对话都是成长的契机，每一次倾听都是治愈的开始。
              </p>
              <div className="card-stats">
                <span>500+ 咨询小时</span>
                <span>200+ 来访者</span>
              </div>
            </div>

            <div className="dynamic-card card-running">
              <div className="card-icon">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M20 50 Q30 30 50 30 Q70 30 80 50" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <path d="M20 50 Q30 70 50 70 Q70 70 80 50" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <circle cx="30" cy="50" r="3" fill="currentColor"/>
                  <circle cx="70" cy="50" r="3" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="card-title">跑步里程碑</h3>
              <p className="card-content">
                用脚步丈量世界，用意志突破极限。10000公里不是终点，而是新的起点。
                每一次奔跑都是对自我的挑战，每一次坚持都是意志力的锤炼。
              </p>
              <div className="card-stats">
                <span>10000+ 公里</span>
                <span>50+ 城市</span>
              </div>
            </div>

            <div className="dynamic-card card-ai">
              <div className="card-icon">
                <svg viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="35" cy="35" r="3" fill="currentColor"/>
                  <circle cx="50" cy="35" r="3" fill="currentColor"/>
                  <circle cx="65" cy="35" r="3" fill="currentColor"/>
                  <path d="M30 50 L70 50" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 65 L50 65" stroke="currentColor" strokeWidth="2"/>
                  <path d="M55 65 L70 65" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="card-title">AI学习笔记</h3>
              <p className="card-content">
                探索AI在心理学领域的应用，用技术赋能心理健康。
                从情绪识别到智能咨询辅助，记录每一次技术突破与思考。
              </p>
              <div className="card-stats">
                <span>30+ 项目</span>
                <span>持续学习</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 悬浮预约按钮 */}
      <Link href="/brand/psychology#consultation-form" className="floating-booking-btn">
        <span>立即预约咨询</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}

