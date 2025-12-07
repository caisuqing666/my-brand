// app/run-tracker/page.tsx

import Link from "next/link";
import RunTracker from "@/components/RunTrack";
import EnergyBar from "@/app/components/EnergyBar";

export default function RunTrackerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfaf5] via-[#f8f1e8] to-[#f3e8dd]">
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-[#9C8577] hover:underline inline-flex items-center gap-1"

          >
            <span>←</span>
            <span>返回首页</span>
          </Link>
        </div>

        <div className="w-full flex justify-end pr-4 pt-4">
  <span
    className="text-sm md:text-base text-[#7A6A5F]"
    style={{
      letterSpacing: "0.5px",
      fontFamily: "serif",
      opacity: 0.75
    }}
  >
    这是蔡蔡的跑步小宇宙
  </span>
</div>
<div className="w-full flex justify-end pr-4">
  <div
    style={{
      width: "20%",
      height: "1px",
      backgroundColor: "#C7B8A4",
      opacity: 0.5
    }}
  ></div>
</div>

<div className="w-full text-center py-3">
  <p
    className="text-xs text-[#9C8577]"
    style={{
      fontFamily: "serif",
      opacity: 0.7,
      letterSpacing: "0.3px"
    }}
  >
    今天，慢慢来也没关系。
  </p>
</div>

        {/* 标题说明区 */}
        <section className="space-y-3">
          <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            🏃‍♀️ 跑步日记
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            这里不追求速度，也不纠结配速。
            只是安静地记下：每一次出门跑步，每一公里的呼吸和心情。
            这些碎片，会慢慢拼成你 10,000 公里的故事。🌿
          </p>
        </section>

        {/* 今日能量 */}
        <div className="mt-4">
          <EnergyBar />
        </div>

        {/* 包裹跑步记录系统的卡片 */}
        <section className="rounded-2xl border border-amber-50 bg-white/80 p-4 shadow-sm backdrop-blur-sm">

          <RunTracker />
        </section>

        {/* 底部轻语 */}
        <footer className="pt-2 pb-4">
        <p
  className="text-[11px] leading-relaxed text-center text-[#9C8577]"
  style={{
    fontFamily: "serif",
    opacity: 0.75,
    letterSpacing: "0.3px",
  }}
>
  有时候，不是为了变得更快，而是为了在一圈一圈的脚步里，把自己慢慢接住。
</p>

        </footer>
      </div>
    </main>
  );
}
