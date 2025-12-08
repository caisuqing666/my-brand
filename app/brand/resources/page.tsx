'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../brand.css';

export default function ResourcesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <span>蔡蔡的小宇宙</span>
          </div>
          <div className="nav-links">
            <Link href="/brand" className="nav-link">首页</Link>
            <Link href="/brand/psychology" className="nav-link">心理服务</Link>
            <Link href="/brand/growth" className="nav-link">成长之路</Link>
            <Link href="/brand/ai-lab" className="nav-link">AI实验室</Link>
            <Link href="/brand/resources" className="nav-link active">资源库</Link>
          </div>
        </div>
      </nav>

      <main className="page-main">
        <section className="page-hero">
          <h1 className="page-title">资源库</h1>
          <p className="page-subtitle">免费资源与深度课程，助力您的成长之旅</p>
        </section>

        {/* 免费下载区 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">免费资源下载</h2>
            <div className="resources-grid">
              <div className="resource-card free">
                <div className="resource-icon">📖</div>
                <h3>冥想指南</h3>
                <p>完整的冥想入门指南，包含基础技巧、常见问题解答和进阶练习方法。</p>
                <div className="resource-meta">
                  <span>PDF · 2.5MB</span>
                  <span>下载量: 1,234</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
              <div className="resource-card free">
                <div className="resource-icon">🏃</div>
                <h3>跑步计划表</h3>
                <p>从零基础到马拉松的完整训练计划，包含周计划、月计划和训练要点。</p>
                <div className="resource-meta">
                  <span>PDF · 1.8MB</span>
                  <span>下载量: 2,567</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
              <div className="resource-card free">
                <div className="resource-icon">📚</div>
                <h3>心理学书单</h3>
                <p>精选50本心理学经典书籍，涵盖认知、情绪、人格、发展等多个领域。</p>
                <div className="resource-meta">
                  <span>PDF · 0.5MB</span>
                  <span>下载量: 3,890</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
              <div className="resource-card free">
                <div className="resource-icon">📝</div>
                <h3>情绪日记模板</h3>
                <p>专业的情绪记录模板，帮助您更好地了解自己的情绪模式和触发因素。</p>
                <div className="resource-meta">
                  <span>PDF · 0.3MB</span>
                  <span>下载量: 1,567</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
              <div className="resource-card free">
                <div className="resource-icon">🎯</div>
                <h3>目标设定工作表</h3>
                <p>SMART目标设定法实践工具，帮助您制定清晰、可执行的目标计划。</p>
                <div className="resource-meta">
                  <span>PDF · 0.4MB</span>
                  <span>下载量: 2,123</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
              <div className="resource-card free">
                <div className="resource-icon">💤</div>
                <h3>睡眠改善指南</h3>
                <p>科学改善睡眠质量的方法，包含睡眠卫生、放松技巧和常见问题解答。</p>
                <div className="resource-meta">
                  <span>PDF · 1.2MB</span>
                  <span>下载量: 1,890</span>
                </div>
                <button className="btn-download">免费下载</button>
              </div>
            </div>
          </div>
        </section>

        {/* 会员专区 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <div className="membership-header">
              <h2 className="section-title">会员专区</h2>
              {!isLoggedIn && (
                <button className="btn-login" onClick={() => setIsLoggedIn(true)}>
                  登录 / 注册
                </button>
              )}
              {isLoggedIn && (
                <button className="btn-logout" onClick={() => setIsLoggedIn(false)}>
                  退出登录
                </button>
              )}
            </div>
            
            {!isLoggedIn ? (
              <div className="membership-locked">
                <div className="lock-icon">🔒</div>
                <h3>会员专享内容</h3>
                <p>登录后即可访问深度课程、专业培训和独家资源</p>
                <div className="membership-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>深度心理学课程（20+小时视频）</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>一对一咨询预约优先权</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>专业心理测评报告解读</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>月度线上分享会参与资格</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>独家学习资料和工具</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="membership-content">
                <div className="course-grid">
                  <div className="course-card">
                    <div className="course-badge">热门</div>
                    <h3>认知行为疗法实战课程</h3>
                    <p>系统学习CBT理论和技术，掌握实用的咨询技能</p>
                    <div className="course-info">
                      <span>📹 15小时视频</span>
                      <span>📚 8个模块</span>
                      <span>🎓 证书认证</span>
                    </div>
                    <button className="btn-course">开始学习</button>
                  </div>
                  <div className="course-card">
                    <div className="course-badge">推荐</div>
                    <h3>情绪管理训练营</h3>
                    <p>21天系统训练，掌握情绪调节的核心技巧</p>
                    <div className="course-info">
                      <span>📹 10小时视频</span>
                      <span>📚 21天计划</span>
                      <span>💬 社群支持</span>
                    </div>
                    <button className="btn-course">开始学习</button>
                  </div>
                  <div className="course-card">
                    <h3>压力管理专家课程</h3>
                    <p>从理论到实践，全面掌握压力管理的科学方法</p>
                    <div className="course-info">
                      <span>📹 12小时视频</span>
                      <span>📚 6个模块</span>
                      <span>📊 测评工具</span>
                    </div>
                    <button className="btn-course">开始学习</button>
                  </div>
                  <div className="course-card">
                    <h3>AI心理学应用实践</h3>
                    <p>学习如何将AI技术应用于心理健康领域</p>
                    <div className="course-info">
                      <span>📹 8小时视频</span>
                      <span>💻 实战项目</span>
                      <span>🤝 导师指导</span>
                    </div>
                    <button className="btn-course">开始学习</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}





