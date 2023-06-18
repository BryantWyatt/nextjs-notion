import NotionService from '@/services/NotionService'
import { NextResponse } from 'next/server'

export async function POST() {
  const res = await NotionService.queryDatabase()
  return NextResponse.json(res)
}
