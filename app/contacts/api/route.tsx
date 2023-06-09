import { NextResponse } from 'next/server'

import NotionService from '@/services/NotionService'

export async function POST() {
  const res = await NotionService.queryDatabase()
  return NextResponse.json({ res })
}
