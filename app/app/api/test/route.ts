import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// 一个简单的测试 API：验证能否访问 Supabase
export async function GET() {
  try {
    const { data, error } = await supabase.from('posts').select('*').limit(1)

    if (error) {
      console.error('Supabase Error:', error.message)
      return NextResponse.json({ ok: false, error: error.message })
    }

    return NextResponse.json({ ok: true, data })
  } catch (err: any) {
    console.error('Fetch failed:', err)
    return NextResponse.json({ ok: false, error: err.message })
  }
}
