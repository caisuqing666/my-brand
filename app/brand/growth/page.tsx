'use client';

import Link from 'next/link';
import '../brand.css';

export default function GrowthPage() {
  return (
    <div className="brand-container">
      <nav className="navbar navbar-scrolled">
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
            <Link href="/brand" className="nav-link">首页</Link>
            <Link href="/brand/psychology" className="nav-link">心理服务</Link>
            <Link href="/brand/growth" className="nav-link active">成长之路</Link>
            <Link href="/brand/ai-lab" className="nav-link">AI实验室</Link>
            <Link href="/brand/resources" className="nav-link">资源库</Link>
          </div>
        </div>
      </nav>

      <main className="page-main">
        <section className="page-hero">
          <h1 className="page-title">成长之路</h1>
          <p className="page-subtitle">用脚步丈量世界，用意志突破极限</p>
        </section>

        {/* 跑步故事集 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">跑步故事集</h2>
            <div className="stories-grid">
              <div className="story-card">
                <div className="story-image">
                  <div className="story-placeholder">🏃</div>
                </div>
                <div className="story-content">
                  <h3>第一次马拉松</h3>
                  <p className="story-date">2020年3月</p>
                  <p>从零基础到完成全马，42.195公里的每一步都是对意志力的考验。冲过终点线的那一刻，我明白了坚持的意义。</p>
                  <button className="btn-read-more">阅读全文</button>
                </div>
              </div>
              <div className="story-card">
                <div className="story-image">
                  <div className="story-placeholder">🌆</div>
                </div>
                <div className="story-content">
                  <h3>城市夜跑</h3>
                  <p className="story-date">2021年6月</p>
                  <p>在50个城市的夜色中奔跑，感受不同城市的脉搏。每一次夜跑都是与自己的对话，是释放压力的最佳方式。</p>
                  <button className="btn-read-more">阅读全文</button>
                </div>
              </div>
              <div className="story-card">
                <div className="story-image">
                  <div className="story-placeholder">⛰️</div>
                </div>
                <div className="story-content">
                  <h3>越野挑战</h3>
                  <p className="story-date">2022年9月</p>
                  <p>从城市跑到山野，从平坦到崎岖。越野跑教会我适应变化，在不确定中找到自己的节奏。</p>
                  <button className="btn-read-more">阅读全文</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 意志力训练方法论 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">意志力训练方法论</h2>
            <div className="methodology-content">
              <div className="methodology-item">
                <div className="method-icon">🎯</div>
                <div>
                  <h3>目标分解法</h3>
                  <p>将大目标拆解为小里程碑，每完成一个里程碑都是对意志力的强化。10000公里不是一天跑完的，而是每天坚持的结果。</p>
                </div>
              </div>
              <div className="methodology-item">
                <div className="method-icon">⏰</div>
                <div>
                  <h3>习惯养成法</h3>
                  <p>21天养成一个习惯，90天形成稳定习惯。通过固定时间、固定地点，让跑步成为生活的一部分，而不是负担。</p>
                </div>
              </div>
              <div className="methodology-item">
                <div className="method-icon">💪</div>
                <div>
                  <h3>渐进超负荷</h3>
                  <p>每周增加5-10%的训练量，让身体和心理逐步适应。避免过度训练，保持可持续的进步节奏。</p>
                </div>
              </div>
              <div className="methodology-item">
                <div className="method-icon">🧠</div>
                <div>
                  <h3>心理暗示法</h3>
                  <p>用积极的语言激励自己，"我能完成"、"再坚持一下"。将困难视为挑战而非障碍，培养成长型思维。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 读者挑战计划 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">读者挑战计划</h2>
            <div className="challenge-box">
              <h3>30天跑步挑战</h3>
              <p>加入我们的挑战计划，每天记录你的跑步里程，与志同道合的伙伴一起成长。</p>
              <div className="challenge-stats">
                <div className="stat-item">
                  <div className="stat-number">1,234</div>
                  <div className="stat-label">参与人数</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">45,678</div>
                  <div className="stat-label">累计里程(km)</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">89%</div>
                  <div className="stat-label">完成率</div>
                </div>
              </div>
              <button className="btn-challenge">立即加入挑战</button>
            </div>
          </div>
        </section>

        {/* 互动地图 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">10000公里足迹地图</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <svg viewBox="0 0 800 500" fill="none">
                  {/* 简化的中国地图轮廓 */}
                  <path d="M100 200 Q150 150 200 200 T400 200 T600 200 T700 250 Q650 300 600 350 T400 400 T200 350 T100 300 Z" 
                        stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/>
                  
                  {/* 城市标记点 */}
                  <g className="city-markers">
                    <circle cx="200" cy="200" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>北京</title>
                    </circle>
                    <circle cx="300" cy="250" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>上海</title>
                    </circle>
                    <circle cx="400" cy="220" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>广州</title>
                    </circle>
                    <circle cx="500" cy="280" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>深圳</title>
                    </circle>
                    <circle cx="350" cy="300" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>杭州</title>
                    </circle>
                    <circle cx="250" cy="280" r="8" fill="var(--color-orange)" className="city-marker">
                      <title>成都</title>
                    </circle>
                  </g>
                  
                  {/* 连接线 */}
                  <path d="M200 200 L300 250 L400 220 L500 280" 
                        stroke="rgba(249, 115, 22, 0.4)" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                </svg>
                <div className="map-legend">
                  <div className="legend-item">
                    <span className="legend-dot"></span>
                    <span>已跑过的城市 (50+)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-line"></span>
                    <span>跑步路线</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}



