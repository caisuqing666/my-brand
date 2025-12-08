'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../brand.css';

export default function PsychologyPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

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
            <Link href="/brand/psychology" className="nav-link active">心理服务</Link>
            <Link href="/brand/growth" className="nav-link">成长之路</Link>
            <Link href="/brand/ai-lab" className="nav-link">AI实验室</Link>
            <Link href="/brand/resources" className="nav-link">资源库</Link>
          </div>
        </div>
      </nav>

      <main className="page-main">
        <section className="page-hero">
          <h1 className="page-title">心理服务</h1>
          <p className="page-subtitle">在这里，你可以慢慢说，慢慢来，慢慢好起来</p>
        </section>

        {/* 个体咨询流程 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">我们如何一起工作</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3>第一次见面</h3>
                <p>不用准备什么，不用想好要说什么。我们慢慢聊，你想到哪里就说到哪里。我会认真听，也会问一些问题，帮助我们彼此了解。</p>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <h3>一起看看</h3>
                <p>我们一起看看你现在在哪里，想要去哪里。不着急，慢慢来。有时候我们也会用一些工具，帮助我们更清楚地看见自己。</p>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <h3>慢慢走</h3>
                <p>我会陪着你，一起慢慢走。有时候会快一点，有时候会慢一点，都没关系。重要的是，你不是一个人。</p>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <h3>回头看</h3>
                <p>偶尔我们一起回头看看，看看我们走了多远，看看哪些地方变了，哪些地方还需要时间。不着急，慢慢来。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 企业EAP方案 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">企业心理支持</h2>
            <div className="eap-grid">
              <div className="eap-card">
                <h3>了解大家的状态</h3>
                <ul>
                  <li>看看大家最近怎么样</li>
                  <li>听听大家的声音</li>
                  <li>了解团队的氛围</li>
                </ul>
              </div>
              <div className="eap-card">
                <h3>一起学习</h3>
                <ul>
                  <li>如何与压力相处</li>
                  <li>如何照顾自己的情绪</li>
                  <li>如何更好地沟通</li>
                </ul>
              </div>
              <div className="eap-card">
                <h3>一对一陪伴</h3>
                <ul>
                  <li>需要的时候，有人听你说</li>
                  <li>困惑的时候，有人陪你找答案</li>
                  <li>困难的时候，有人接住你</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 免费心理测评 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">了解自己</h2>
            <div className="assessment-cards">
              <div className="assessment-card">
                <h3>压力自评</h3>
                <p>看看最近的压力有多大，从哪里来的。不用害怕，只是看看而已。</p>
                <button className="btn-primary">试试看</button>
              </div>
              <div className="assessment-card">
                <h3>焦虑自评</h3>
                <p>感受一下自己的焦虑，看看它在说什么。焦虑有时候是在提醒我们什么。</p>
                <button className="btn-primary">试试看</button>
              </div>
              <div className="assessment-card">
                <h3>情绪自评</h3>
                <p>看看最近的情绪怎么样。情绪没有好坏，只是需要被看见。</p>
                <button className="btn-primary">试试看</button>
              </div>
            </div>
          </div>
        </section>

        {/* 咨询预约表单 */}
        <section id="consultation-form" className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">想聊聊吗？</h2>
            <form className="consultation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>邮箱 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>联系电话 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>服务类型 *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">请选择</option>
                    <option value="individual">个体咨询</option>
                    <option value="eap">企业EAP</option>
                    <option value="assessment">心理测评</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                  <label>想说的话（选填）</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="想说什么都可以，不用想太多，想到哪里就写到哪里..."
                  />
              </div>
              <button type="submit" className="btn-submit">提交预约</button>
            </form>

            {formSubmitted && (
              <div className="form-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p>收到啦，我会尽快回复你的。慢慢来，不着急。</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

