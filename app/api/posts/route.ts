// app/api/posts/route.ts

type Post = {
  id: number;
  title: string;
  weather: string;
};

// 这里先用内存数组模拟"数据库"
let posts: Post[] = [
  { id: 1, title: "蔡蔡今天开始新的全栈学习啦 ✨", weather: "晴天" },
  { id: 2, title: "Next.js 的 API 路由比你想象的还要好用 😊", weather: "多云" }
];

let nextId = 3;

// GET /api/posts  —— 获取帖子列表
export function GET() {
  return Response.json(posts);
}

// POST /api/posts —— 新增一条帖子
export async function POST(request: Request) {
  // 1. 拿到请求Body
  const body = await request.json();

  // 2. 取出并校验 title
  const title = String(body.title ?? "").trim();
  if (!title) {
    return new Response(
      JSON.stringify({ error: "标题不能为空" }),
      { status: 400 }
    );
  }

  // 3. 取出并处理 weather 字段
  const rawWeather = String(body.weather ?? "").trim();
  const weather = rawWeather || "未知天气";

  // 4. 生成一条新帖子
  const newPost: Post = { id: nextId++, title, weather };
  
  // 5. 加到"数据库"里（内存数组）
  posts = [newPost, ...posts];

  // 6. 把新帖子返回给前端
  return Response.json(newPost, { status: 201 });
}
