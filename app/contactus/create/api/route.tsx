import NotionService from '@/services/NotionService'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.json().then((res) => {
    return res
  })

  const body = JSON.stringify(formData)
  const requestHeaders = NotionService.getNotionHeaders()
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    credentials: 'include',
    headers: requestHeaders,
    cache: 'no-store',
    body: body,
  })

  const data = await res.json()

  return NextResponse.json(data)
}
