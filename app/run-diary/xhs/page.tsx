"use client";

import { useEffect, useState } from "react";

type RunDiaryItem = {
  id: number;
  run_date: string;
  distance_km: number;
  mood: string | null;
  weather: string | null;
  created_at: string;
};

type QuoteStyle = "sharp" | "soft";

export default function RunDiaryXhsPage() {
  const [runs, setRuns] = useState<RunDiaryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 小红书内页文案 & 封面金句
  const [generatedText, setGeneratedText] = useState("");
  const [coverQuote, setCoverQuote] = useState("");
  const [quoteStyle, setQuoteStyle] = useState<QuoteStyle>("soft"); // 默认温柔风

  useEffect(() => {
    async function fetchRuns() {
      try {
      const res = await fetch("/api/run-diary");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "加载失败");
      setRuns(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    }
    fetchRuns();
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const monthKey = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  const monthRuns = runs.filter((r) => r.run_date?.startsWith(monthKey));
  const monthTotal = monthRuns.reduce((s, r) => s + Number(r.distance_km), 0);
  const monthCount = monthRuns.length;
  const avgDistance = monthCount ? monthTotal / monthCount : 0;

  const yearTotal = runs
    .filter((r) => r.run_date?.startsWith(String(currentYear)))
    .reduce((s, r) => s + Number(r.distance_km), 0);

  const latestRuns = monthRuns
    .slice()
    .sort(
      (a, b) => new Date(b.run_date).getTime() - new Date(a.run_date).getTime()
    )
    .slice(0, 3);

  // 一键生成小红书正文文案
  function generateXhsText() {
    const text = `
${currentYear}年${currentMonth}月跑步复盘 🏃‍♀️

这个月，我总共跑了 ${monthTotal.toFixed(
      1
    )} 公里，一共跑了 ${monthCount} 次，平均每次 ${avgDistance.toFixed(
      1
    )} 公里。

对 46 岁的我来说，每一次出门跑步，都不是为了证明什么，而是为了把自己从疲惫的日子里一点点拉回来。

本月印象最深的几次跑步：
${
  latestRuns.length === 0
    ? "（本月暂时还没有记录，留一点空间给下一个出门的自己。）"
    : latestRuns
        .map(
          (item) =>
            `- ${item.run_date} · ${item.distance_km} km · ${
              item.mood || "无备注"
            }`
        )
        .join("\n")
}

写给未来的自己：
你现在感受到的每一点轻盈、踏实、松动，都是从这些看似普通的公里数里长出来的。人生不会因为你跑得慢而责怪你，但会因为你坚持了而奖励你。

INFJ · 成长记录
`.trim();

    setGeneratedText(text);
  }

  // 自动生成封面金句：根据「风格 + 本月跑量」来调整语气
  function generateCoverQuote() {
    if (monthCount === 0 || monthTotal === 0) {
      if (quoteStyle === "sharp") {
        setCoverQuote("不是没时间，只是还没把自己排在优先级里。");
      } else {
        setCoverQuote("这一月没怎么跑，但你还在给自己保留出发的空间。");
      }
      return;
    }

    if (monthTotal < 20) {
      // 跑得比较少
      if (quoteStyle === "sharp") {
        setCoverQuote("这点公里数不耀眼，但放在你的日常里，其实已经很难得。");
      } else {
        setCoverQuote("不算多的公里数，却真真切切帮你撑过了一些难熬的日子。");
      }
    } else if (monthTotal < 60) {
      // 中等跑量
      if (quoteStyle === "sharp") {
        setCoverQuote("真正拉开差距的，从来不是爆发，而是这些你偷偷坚持的日子。");
      } else {
        setCoverQuote("慢慢跑、不掉队，是成年人给自己最温柔的底气。");
      }
    } else {
      // 跑量很多
      if (quoteStyle === "sharp") {
        setCoverQuote("别人看到的是配速，你自己知道，这是从崩溃边缘跑回来的底气。");
      } else {
        setCoverQuote("当你一次次先把自己照顾好，世界的难题就没那么可怕了。");
      }
    }
  }

  return (
    <main
      className="min-h-screen overflow-y-auto bg-[#f3e6d8]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
        backgroundSize: "7px 7px",
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center py-6 gap-4">
        {/* 手帐纸风手机卡片 —— 截图区 */}
        <div
          className="
            w-[360px] sm:w-[390px] aspect-[9/16]
            rounded-[32px]
            bg-[#fbf6ed]
            border border-[#e1d6c7]
            shadow-[0_6px_18px_rgba(0,0,0,0.08)]
            overflow-hidden flex flex-col justify-between
          "
          style={{
            backgroundImage:
              "radial-gradient(circle at 0.5px 0.5px, rgba(0,0,0,0.03) 0.5px, transparent 0)",
            backgroundSize: "6px 6px",
          }}
        >
          {/* 顶部 */}
          <div className="px-5 pt-5 pb-3 space-y-3">
            <div className="flex justify-between items-center">
              <div
                className="
                  inline-flex items-center rounded-full 
                  border border-[#e1d6c7]
                  bg-[#fdf9f1]/90 
                  px-3 py-1 text-[10px] 
                  text-[#7a6f60]
                "
              >
                INFJ · 跑步日记
              </div>

              <span className="text-[10px] text-[#9b8f80]">
                {currentYear}.{String(currentMonth).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-xl font-semibold text-[#45382c] tracking-tight">
                本月跑步小结
              </h1>

              <p className="text-[11px] leading-relaxed text-[#7a6f60]">
                你的每一公里，都在悄悄把日子，从疲惫拉回到心里有光的地方。
              </p>

              <p className="text-[10px] italic text-[#9b8f80]">
                可以慢，但不要停下来。
              </p>
            </div>
          </div>

          {/* 中部内容 */}
          <div className="px-5 space-y-4">
            {/* 三个统计卡片 */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "本月总里程", value: monthTotal.toFixed(1) },
                { label: "跑步次数", value: monthCount },
                { label: "平均每次", value: avgDistance.toFixed(1) },
              ].map((item) => (
                <div
                  key={item.label}
                  className="
                    rounded-2xl bg-[#fdf9f1]/95 
                    border border-[#e3d8c9] 
                    px-2.5 py-2
                  "
                >
                  <p className="text-[10px] text-[#8a7f70] mb-1">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-[#45382c]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* 年度概览 */}
            <div className="rounded-2xl bg-[#f5ecde] border border-[#e1d6c7] px-3.5 py-2.5">
              <p className="text-[10px] text-[#7a6f60] mb-1">
                {currentYear} 年累计里程
              </p>
              <p className="text-base font-semibold text-[#45382c]">
                {yearTotal.toFixed(1)} km
              </p>
              <p className="text-[10px] text-[#8a7f70] mt-1 leading-relaxed">
                所有认真跑过的日子，都会在未来某个瞬间，托住你。
              </p>
            </div>

            {/* 最近记录 */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-medium text-[#655b4e]">
                最近几次的记录
              </p>

              {loading && (
                <p className="text-[10px] text-[#9b8f80]">加载中…</p>
              )}

              {!loading && latestRuns.length === 0 && (
                <p className="text-[10px] text-[#9b8f80] leading-relaxed">
                  本月暂时还没有记录。<br />
                  也没关系，从下一次出门那一公里开始就好。
                </p>
              )}

              {!loading &&
                latestRuns.map((item) => (
                  <div
                    key={item.id}
                    className="
                      rounded-2xl bg-[#fdf9f1]/95 
                      border border-[#e3d8c9] 
                      px-3 py-2.5
                    "
                  >
                    <div className="flex justify-between items-baseline">
                      <div className="text-[11px] font-medium text-[#45382c]">
                        {item.run_date} · {item.distance_km} km
                      </div>
                      {item.weather && (
                        <span className="text-[10px] text-[#8a7f70]">
                          {item.weather}
                        </span>
                      )}
                    </div>

                    {item.mood && (
                      <p className="mt-1.5 text-[10px] text-[#6f6557] leading-relaxed">
                        {item.mood}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* 底部水印 */}
          <div className="px-5 pb-4 pt-2 flex justify-between items-center text-[9px] text-[#8a7f70]">
            <span>INFJ · 长期主义 · 温柔自持</span>
            <span className="text-[10px] font-semibold tracking-wide text-[#7a6f60]">
              INFJ • 成长记录
            </span>
          </div>
        </div>

        {/* 工具区：文案 & 金句生成（不在截图范围内） */}
        <div className="w-[360px] sm:w-[390px] space-y-4 text-xs text-[#45382c]">
          {/* 小红书正文文案 */}
          <div className="rounded-2xl bg-[#fbf6ed]/90 border border-[#e1d6c7] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">
                一键生成本月小红书内页文案
              </span>
              <button
                onClick={generateXhsText}
                className="rounded-full bg-[#d8cfc2] px-3 py-1 text-[11px] text-[#45382c] hover:bg-[#cec5b8]"
              >
                生成文案
              </button>
            </div>
            <textarea
              className="mt-2 w-full h-36 text-[11px] p-2 rounded-xl border border-[#e1d6c7] bg-[#fdf9f1] text-[#45382c] leading-relaxed"
              value={generatedText}
              placeholder="点击上方按钮后，这里会自动生成一整段小红书文案，方便你复制。"
              readOnly
            />
          </div>

          {/* 封面金句（支持风格切换） */}
          <div className="rounded-2xl bg-[#fbf6ed]/90 border border-[#e1d6c7] p-3 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium">
                自动生成本月「封面金句」
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuoteStyle("soft")}
                  className={`px-2 py-1 rounded-full text-[10px] border ${
                    quoteStyle === "soft"
                      ? "bg-[#d8cfc2] border-[#c9bfb0] text-[#45382c]"
                      : "bg-transparent border-transparent text-[#8a7f70]"
                  }`}
                >
                  温柔
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteStyle("sharp")}
                  className={`px-2 py-1 rounded-full text-[10px] border ${
                    quoteStyle === "sharp"
                      ? "bg-[#d8cfc2] border-[#c9bfb0] text-[#45382c]"
                      : "bg-transparent border-transparent text-[#8a7f70]"
                  }`}
                >
                  犀利
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#8a7f70]">
                当前风格：{quoteStyle === "soft" ? "温柔接住自己" : "清醒一点点狠"}
              </span>
              <button
                onClick={generateCoverQuote}
                className="rounded-full bg-[#d8cfc2] px-3 py-1 text-[11px] text-[#45382c] hover:bg-[#cec5b8]"
              >
                生成金句
              </button>
            </div>

            <p className="text-[11px] text-[#7a6f60] leading-relaxed min-h-[2.5rem] mt-1">
              {coverQuote
                ? coverQuote
                : "点一下「生成金句」，我会根据本月的跑量和次数，用你选的风格，写一句适合放在封面上的话。"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

