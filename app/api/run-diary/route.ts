// app/api/run-diary/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 统一使用 Supabase 中的最终表：run_logs
// 这样所有跑步记录都集中在 run_logs 里，run_diary 表可以不用了

// 读取列表：GET /api/run-diary
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("run_logs")
      .select("*")
      .order("run_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Unexpected GET error:", err);
    return NextResponse.json({ error: "服务器出错了" }, { status: 500 });
  }
}

// 新增一条记录：POST /api/run-diary
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { run_date, distance_km, mood, weather } = body;

    // 最基础的校验
    if (!run_date || !distance_km) {
      return NextResponse.json(
        { error: "run_date 和 distance_km 是必填的" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("run_logs")
      .insert([
        {
          run_date,
          distance_km,
          mood,
          weather,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Unexpected POST error:", err);
    return NextResponse.json({ error: "服务器出错了" }, { status: 500 });
  }
}
