import { NextResponse } from "next/server";
import { supabase, checkSupabaseEnv } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    // 在运行时检查环境变量
    if (!checkSupabaseEnv()) {
      return NextResponse.json(
        { error: 'Supabase 环境变量未配置' },
        { status: 503 }
      )
    }
    
    const body = await request.json();
    const {
      run_date,
      distance_km,
      mood,
      weather,
      mood_emoji, // 前端传来的表情
    } = body;

    // 先只放必需字段
    const insertData: any = {
      run_date,
      distance_km,
      mood,
      weather,
    };

    // ⚠️ 只有真的选了表情，才加到 insertData
    if (mood_emoji && String(mood_emoji).trim() !== "") {
      insertData.mood_emoji = mood_emoji;
    }
    // 没选就不带这个字段 → 用数据库默认 🏃🏻‍♀️

    const { data, error } = await supabase
      .from("run_logs")
      .insert(insertData)
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Unexpected POST error:", err);
    return NextResponse.json({ error: "服务器出错了" }, { status: 500 });
  }
}
