import { NextResponse } from 'next/server'

import NotionService from '@/services/NotionService'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  console.log('contacts [slug] api')
  console.log(params.slug)
  const requestHeaders = NotionService.getNotionHeaders()
  const res = await fetch(`https://api.notion.com/v1/pages/${params.slug}`, {
    method: 'GET',
    credentials: 'include',
    headers: requestHeaders,
    cache: 'no-store',
  })

  const data = await res.json()

  return NextResponse.json(data)
}
