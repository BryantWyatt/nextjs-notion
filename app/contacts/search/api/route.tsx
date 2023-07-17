import NotionService from '@/services/NotionService'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const formData = await request.json().then((res) => {
    return res
  })

  const body = JSON.stringify(formData)
  const res = await NotionService.filterDatabaseByFieldName(body)

  return NextResponse.json(res)
}
