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
}

export default NotionService
