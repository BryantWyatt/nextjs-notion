import { NextResponse } from 'next/server'

import NotionService from '@/services/NotionService'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const res = await NotionService.getPage(params.slug)
  return NextResponse.json(res)
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const res = await NotionService.deletePage(params.slug)
  return NextResponse.json({ res })
}
