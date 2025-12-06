// 诊断 API：测试 Supabase 连接和配置
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      urlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL 
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30)}...` 
        : '未设置'
    },
    tests: []
  }

  // 测试 1: 环境变量检查
  if (!diagnostics.environment.hasUrl || !diagnostics.environment.hasAnonKey) {
    diagnostics.tests.push({
      name: '环境变量检查',
      status: 'failed',
      message: '环境变量未完整配置，请检查 .env.local 文件'
    })
    return NextResponse.json(diagnostics, { status: 200 })
  }

  diagnostics.tests.push({
    name: '环境变量检查',
    status: 'passed',
    message: '环境变量已配置'
  })

  // 测试 2: 检查代理配置
  const proxy = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY
  diagnostics.environment.hasProxy = !!proxy
  diagnostics.environment.proxyPreview = proxy ? `${proxy.substring(0, 30)}...` : '未设置'

  // 测试 3: 尝试连接 Supabase
  try {
    // 测试基本连接（查询一个不存在的表会返回特定错误，但能证明连接正常）
    const { data, error } = await supabase
      .from('_test_connection_table_that_does_not_exist')
      .select('*')
      .limit(1)

    if (error) {
      // 如果错误是"表不存在"，说明连接是正常的
      // PGRST205 也表示表不存在，但连接是成功的
      if (error.code === 'PGRST116' || error.code === 'PGRST205' || error.message.includes('does not exist') || error.message.includes('relation') || error.message.includes('schema cache')) {
        diagnostics.tests.push({
          name: 'Supabase 连接测试',
          status: 'passed',
          message: '✅ 成功连接到 Supabase！表不存在错误是预期的（用于测试连接）'
        })
      } else {
        diagnostics.tests.push({
          name: 'Supabase 连接测试',
          status: 'failed',
          message: `连接失败: ${error.message}`,
          errorCode: error.code
        })
      }
    }
  } catch (err: any) {
    const errorMessage = err.message || String(err)
    const isNetworkError = errorMessage.includes('fetch failed') || 
                          errorMessage.includes('ECONNREFUSED') ||
                          errorMessage.includes('ENOTFOUND') ||
                          errorMessage.includes('ETIMEDOUT')

    diagnostics.tests.push({
      name: 'Supabase 连接测试',
      status: 'failed',
      message: `连接异常: ${errorMessage}`,
      isNetworkError,
      hint: isNetworkError 
        ? '这是网络连接问题。可能原因：1) 需要代理才能访问 Supabase（请设置 HTTPS_PROXY 环境变量）2) 网络防火墙阻止连接 3) Supabase URL 不正确'
        : '请检查错误信息并查看服务器日志'
    })
  }

  // 测试 4: 检查常见表名
  const commonTableNames = ['run_diary', 'run_logs', 'run_dairy']
  for (const tableName of commonTableNames) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)

      if (error) {
        if (error.code === 'PGRST116' || error.code === 'PGRST205' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
          diagnostics.tests.push({
            name: `表 '${tableName}' 检查`,
            status: 'not_found',
            message: '表不存在'
          })
        } else if (error.code === '42501' || error.message.includes('permission')) {
          diagnostics.tests.push({
            name: `表 '${tableName}' 检查`,
            status: 'permission_denied',
            message: '表存在但 RLS 策略阻止访问',
            hint: '请在 Supabase Dashboard 中检查 RLS 策略'
          })
        } else {
          diagnostics.tests.push({
            name: `表 '${tableName}' 检查`,
            status: 'error',
            message: error.message,
            errorCode: error.code
          })
        }
      } else {
        diagnostics.tests.push({
          name: `表 '${tableName}' 检查`,
          status: 'found',
          message: `表存在且可访问，当前有 ${data?.length ?? 0} 条记录（测试查询）`
        })
      }
    } catch (err: any) {
      diagnostics.tests.push({
        name: `表 '${tableName}' 检查`,
        status: 'error',
        message: `查询异常: ${err.message}`
      })
    }
  }

  return NextResponse.json(diagnostics, { status: 200 })
}

