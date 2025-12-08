'use client';

import Link from 'next/link';
import '../brand.css';

export default function AILabPage() {
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
            <Link href="/brand/ai-lab" className="nav-link active">AI实验室</Link>
            <Link href="/brand/resources" className="nav-link">资源库</Link>
          </div>
        </div>
      </nav>

      <main className="page-main">
        <section className="page-hero">
          <h1 className="page-title">AI实验室</h1>
          <p className="page-subtitle">探索AI在心理学领域的创新应用</p>
        </section>

        {/* AI心理学应用观察 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">AI心理学应用观察</h2>
            <div className="observation-cards">
              <div className="observation-card">
                <h3>🤖 情绪识别技术</h3>
                <p>通过分析语音、文本和面部表情，AI可以识别用户的情绪状态。这项技术在心理健康筛查和早期干预中具有巨大潜力。</p>
                <div className="card-tags">
                  <span className="tag">NLP</span>
                  <span className="tag">计算机视觉</span>
                  <span className="tag">情感计算</span>
                </div>
              </div>
              <div className="observation-card">
                <h3>💬 智能对话系统</h3>
                <p>基于大语言模型的对话系统可以为用户提供7×24小时的心理支持。虽然不能替代人类咨询师，但可以作为有效的补充工具。</p>
                <div className="card-tags">
                  <span className="tag">LLM</span>
                  <span className="tag">对话系统</span>
                  <span className="tag">心理健康</span>
                </div>
              </div>
              <div className="observation-card">
                <h3>📊 数据驱动的个性化方案</h3>
                <p>通过分析大量案例数据，AI可以帮助制定个性化的治疗方案，提高治疗效果和效率。</p>
                <div className="card-tags">
                  <span className="tag">机器学习</span>
                  <span className="tag">数据分析</span>
                  <span className="tag">个性化医疗</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 工具推荐 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">工具推荐</h2>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">📱</div>
                <h3>情绪日记APP</h3>
                <p>记录每日情绪变化，AI分析情绪模式，提供个性化建议</p>
                <ul className="tool-features">
                  <li>✓ 情绪追踪</li>
                  <li>✓ 数据分析</li>
                  <li>✓ 个性化建议</li>
                </ul>
                <button className="btn-tool">了解更多</button>
              </div>
              <div className="tool-card">
                <div className="tool-icon">🧘</div>
                <h3>冥想引导APP</h3>
                <p>AI生成个性化冥想内容，根据用户状态调整引导方式</p>
                <ul className="tool-features">
                  <li>✓ 个性化内容</li>
                  <li>✓ 进度跟踪</li>
                  <li>✓ 科学依据</li>
                </ul>
                <button className="btn-tool">了解更多</button>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📈</div>
                <h3>心理健康监测平台</h3>
                <p>整合多维度数据，实时监测心理健康状态，及时预警</p>
                <ul className="tool-features">
                  <li>✓ 多维度监测</li>
                  <li>✓ 实时预警</li>
                  <li>✓ 专业报告</li>
                </ul>
                <button className="btn-tool">了解更多</button>
              </div>
            </div>
          </div>
        </section>

        {/* 技术自学笔记 */}
        <section className="service-section">
          <div className="section-container">
            <h2 className="section-title">技术自学笔记</h2>
            <div className="notes-timeline">
              <div className="note-item">
                <div className="note-date">2024.01</div>
                <div className="note-content">
                  <h3>Python基础与数据分析</h3>
                  <p>学习了Pandas、NumPy等数据分析库，完成了第一个情绪数据分析项目。</p>
                  <div className="code-snippet">
                    <pre><code>{`import pandas as pd
import numpy as np

# 加载情绪数据
df = pd.read_csv('mood_data.csv')

# 分析情绪趋势
mood_trend = df.groupby('date')['mood_score'].mean()
print(mood_trend.plot())`}</code></pre>
                  </div>
                </div>
              </div>
              <div className="note-item">
                <div className="note-date">2024.03</div>
                <div className="note-content">
                  <h3>机器学习入门</h3>
                  <p>掌握了Scikit-learn的基本用法，实现了情绪分类模型。</p>
                  <div className="code-snippet">
                    <pre><code>{`from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 训练情绪分类模型
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2
)
model = RandomForestClassifier()
model.fit(X_train, y_train)`}</code></pre>
                  </div>
                </div>
              </div>
              <div className="note-item">
                <div className="note-date">2024.06</div>
                <div className="note-content">
                  <h3>NLP与情感分析</h3>
                  <p>学习了Transformer架构，使用BERT进行文本情感分析。</p>
                  <div className="code-snippet">
                    <pre><code>{`from transformers import BertTokenizer, BertForSequenceClassification

# 加载预训练模型
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertForSequenceClassification.from_pretrained(
    'bert-base-chinese'
)

# 情感分析
inputs = tokenizer(text, return_tensors='pt')
outputs = model(**inputs)`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 代码片段展示 */}
        <section className="service-section alt-bg">
          <div className="section-container">
            <h2 className="section-title">学习成果展示</h2>
            <div className="code-showcase">
              <div className="showcase-item">
                <h3>情绪追踪可视化</h3>
                <div className="code-demo">
                  <div className="demo-visualization">
                    <div className="chart-placeholder">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '70%'}}></div>
                      <div className="bar" style={{height: '85%'}}></div>
                      <div className="bar" style={{height: '75%'}}></div>
                    </div>
                    <p className="demo-caption">一周情绪变化趋势</p>
                  </div>
                </div>
              </div>
              <div className="showcase-item">
                <h3>交互式情绪日记</h3>
                <div className="code-demo">
                  <div className="demo-html">
                    <div className="html-preview">
                      <div className="preview-header">情绪日记</div>
                      <div className="preview-content">
                        <input type="text" placeholder="今天的心情如何？" className="preview-input"/>
                        <div className="preview-buttons">
                          <button className="preview-btn">😊 开心</button>
                          <button className="preview-btn">😢 难过</button>
                          <button className="preview-btn">😰 焦虑</button>
                        </div>
                      </div>
                    </div>
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





