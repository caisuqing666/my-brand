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
            <span>个人品牌</span>
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
          <p className="page-subtitle">专业、温暖、成长导向的心理支持</p>
        </section>

        {/* 个体咨询流程 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">个体咨询流程</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3>初步沟通</h3>
                <p>了解您的需求，建立信任关系，确定咨询目标</p>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <h3>评估分析</h3>
                <p>通过专业量表评估，制定个性化咨询方案</p>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <h3>咨询实施</h3>
                <p>运用认知行为、人本主义等方法，陪伴您成长</p>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <h3>效果评估</h3>
                <p>定期回顾进展，调整策略，确保咨询效果</p>
              </div>
            </div>
          </div>
        </section>

        {/* 企业EAP方案 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">企业EAP方案</h2>
            <div className="eap-grid">
              <div className="eap-card">
                <h3>员工心理健康评估</h3>
                <ul>
                  <li>压力水平测评</li>
                  <li>工作满意度调查</li>
                  <li>团队氛围分析</li>
                </ul>
              </div>
              <div className="eap-card">
                <h3>心理健康培训</h3>
                <ul>
                  <li>压力管理技巧</li>
                  <li>情绪调节方法</li>
                  <li>沟通技能提升</li>
                </ul>
              </div>
              <div className="eap-card">
                <h3>一对一咨询服务</h3>
                <ul>
                  <li>个人心理疏导</li>
                  <li>职业发展咨询</li>
                  <li>危机干预支持</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 免费心理测评 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">免费心理测评</h2>
            <div className="assessment-cards">
              <div className="assessment-card">
                <h3>压力自评量表</h3>
                <p>评估您当前的压力水平，了解压力来源</p>
                <button className="btn-primary">开始测评</button>
              </div>
              <div className="assessment-card">
                <h3>焦虑自评量表</h3>
                <p>检测焦虑程度，识别焦虑触发因素</p>
                <button className="btn-primary">开始测评</button>
              </div>
              <div className="assessment-card">
                <h3>抑郁自评量表</h3>
                <p>评估情绪状态，及时发现心理困扰</p>
                <button className="btn-primary">开始测评</button>
              </div>
            </div>
          </div>
        </section>

        {/* 咨询预约表单 */}
        <section id="consultation-form" className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">预约咨询</h2>
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
                <label>咨询需求描述</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="请简要描述您的咨询需求..."
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
                <p>已收到您的需求，我们将在24小时内回复！</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

