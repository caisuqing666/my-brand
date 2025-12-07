// app/page.tsx

import Link from "next/link";
import EnergyBar from "@/app/components/EnergyBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfaf5] to-[#f5f0ea]">
      <div className="max-w-2xl mx-auto px-5 py-10 space-y-8">
        {/* 顶部问候 */}
        <header className="space-y-3">
          <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs text-amber-700">
            INFJ · 成长记录 · α 版本
          </div>

          <h1 className="text-2xl font-semibold text-slate-900">
            嗨，蔡蔡，欢迎回到你自己的小宇宙 ✨
          </h1>

          <p className="text-sm leading-relaxed text-slate-600">
            这里会慢慢长成：跑步日记、编程学习、阅读摘录和生活感的小基地。
            不用一次做完，每天一点点，就很好。
          </p>
        </header>

        {/* 今日能量 */}
        <div className="mt-4">
          <EnergyBar />
        </div>

        {/* 功能入口卡片 */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-slate-800">
            今天想从哪里开始？
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* 跑步日记系统 */}
            <Link
              href="/run-tracker"
              className="group flex flex-col justify-between rounded-2xl border border-amber-100 bg-white/80 px-4 py-3 shadow-sm hover:shadow-md transition shadow-amber-50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg">🏃‍♀️</span>
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700">
                  已开通 · 可使用
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  跑步日记系统
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  记录每一次公里数、心情和小故事，让你的 10,000 公里有了被看见的轨迹。
                </p>
              </div>
              <span className="mt-2 text-[11px] text-amber-700 group-hover:underline">
                进入跑步日记 →
              </span>
            </Link>

            {/* 编程学习（新入口卡片） */}
<Link
  href="/coding"
  className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white/80 px-4 py-3 shadow-sm hover:shadow-md transition shadow-slate-50"
>
  <div className="flex items-center justify-between gap-2">
    <span className="text-lg">💻</span>
    <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
      计划中
    </span>
  </div>

  <div className="mt-2 space-y-1">
    <p className="text-sm font-semibold text-slate-900">
      编程 · 网站学习路线
    </p>
    <p className="text-xs text-slate-600 leading-relaxed">
      记录你每天的 Next.js & Supabase 小进步，让学习变成过程，而不是压力。
    </p>
  </div>

  <span className="mt-2 text-[11px] text-slate-400">
    敬请期待 · 很快会开通
  </span>
</Link>


            {/* 阅读 / 内容创作（占位卡片） */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white/60 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg">📚</span>
                <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
                  计划中
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm font-semibold text-slate-900">
                  阅读 · 小红书 / 公众号素材池
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  每天的一点阅读、一句金句，都会慢慢汇聚成你的深度内容库。
                </p>
              </div>
              <span className="mt-2 text-[11px] text-slate-400">
                先在 Obsidian 用起来，成熟后再搬到这里。
              </span>
            </div>
          </div>
        </section>

        {/* 底部一句话 */}
        <footer className="pt-4 border-t border-amber-100">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            今天做到这里就很好了。  
            不用急着把网站一次做完，
            你正在做的，是为 46～50 岁的自己，搭一座可以安放故事的地方。
          </p>
        </footer>
      </div>
    </main>
  );
}
