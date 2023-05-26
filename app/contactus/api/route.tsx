import { NextResponse } from 'next/server'

export async function POST() {
  const requestHeaders = getNotionHeaders()
  const res = await fetch(
    'https://api.notion.com/v1/databases/888c6b8706cf4924be581aa7c2e7918b/query',
    {
      method: 'POST',
      credentials: 'include',
      headers: requestHeaders,
      cache: 'no-store',
    }
  )
  const data = await res.json()

  if (!res.ok) throw Error('Failed to fetch data')

  return NextResponse.json({ data })
}

const getNotionHeaders = () => {
  const requestHeaders: HeadersInit = new Headers()
  // Not a fan of this 'as' approach...
  const token: string = process.env['NOTION_BEARER_TOKEN'] as string
  const version: string = process.env['NOTION_VERSION'] as string

  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('Access-Control-Allow-Origin', '*')
  requestHeaders.set('Access-Control-Allow-Methods', 'POST')
  requestHeaders.set('Access-Control-Allow-Headers', 'Content-Type')
  requestHeaders.set('Authorization', token)
  requestHeaders.set('Notion-Version', version)

  return requestHeaders
}

