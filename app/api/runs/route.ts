// app/api/runs/route.ts

type RunEntry = {
    id: number;
    date: string;     // 跑步日期，格式例如：2025-11-19
    distance: number; // 距离（km）
    mood: string;     // 心情，比如：开心、一般、累爆了
    weather?: string;   // 天气，比如：晴天、阴天、雨天（可选）
    note: string;     // 备注，比如：天气、配速感受、心情
  };
  
  // 用内存数组模拟“数据库”
  let runs: RunEntry[] = [
    {
      id: 1,
      date: "2025-11-18",
      distance: 5,
      mood: "轻松愉快",
      note: "夜跑 5km，边跑边想自己的全栈之路，好像也没那么可怕了。"
    },
    {
      id: 2,
      date: "2025-11-17",
      distance: 10,
      mood: "有点累但很满足",
      weather: "小雨",
      note: "配速不算快，但能坚持，就是胜利。"
    }
  ];
  
  let nextId = 3;
  
  // GET /api/runs —— 获取跑步日记列表
  export function GET() {
    return Response.json(runs);
  }
  
  // POST /api/runs —— 新增一条跑步日记
  export async function POST(request: Request) {
    const body = await request.json();
  
    const rawDate = String(body.date ?? "").trim();
    const rawDistance = body.distance;
    const rawMood = String(body.mood ?? "").trim();
    const rawWeather = String(body.weather ?? "").trim();
    const rawNote = String(body.note ?? "").trim();
  
    // 简单校验
    if (!rawDate) {
      return new Response(
        JSON.stringify({ error: "日期不能为空" }),
        { status: 400 }
      );
    }
  
    const distance = Number(rawDistance);
    if (!Number.isFinite(distance) || distance <= 0) {
      return new Response(
        JSON.stringify({ error: "请填写正确的跑步距离（大于0）" }),
        { status: 400 }
      );
    }
  
    const mood = rawMood || "心情未填写";
    const weather = rawWeather || undefined;
    const note = rawNote || "这一天还没有写下更多感受～";

    const newEntry: RunEntry = {
      id: nextId++,
      date: rawDate,
      distance,
      mood,
      weather,
      note,
    };
  
    // 加入“数据库”
    runs = [newEntry, ...runs];
  
    return Response.json(newEntry, { status: 201 });
  }
  