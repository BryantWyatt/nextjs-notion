const NotionService = {
  getNotionHeaders: () => {
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
  },
  queryDatabase: async () => {
    const requestHeaders = NotionService.getNotionHeaders()
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
    return data
  },
  createPage: async (body: any) => {
    const requestHeaders = NotionService.getNotionHeaders()
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      credentials: 'include',
      headers: requestHeaders,
      cache: 'no-store',
      body: body,
    })

    const data = await res.json()

    if (!res.ok) throw Error('Failed to fetch data')
    return data
  },
  getPage: async (id: string) => {
    const requestHeaders = NotionService.getNotionHeaders()
    const res = await fetch(`https://api.notion.com/v1/pages/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: requestHeaders,
      cache: 'no-store',
    })

    const data = await res.json()

    if (!res.ok) throw Error('Failed to fetch data')
    return data
  },
}

export default NotionService
