import NotionService from '@/services/NotionService'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.json().then((res) => {
    return res
  })

  const body = JSON.stringify(formData)
  const res = await NotionService.createPage(body)

  return NextResponse.json(res)
}
