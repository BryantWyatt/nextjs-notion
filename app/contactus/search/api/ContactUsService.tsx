import NotionService from '@/services/NotionService'

const ContactUsService = {
  // Not currently being used but will in the future to show all contacts
  getContacts: async () => {
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
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
  getContactByFirstName: async (name: string) => {
    // TODO: Build interface to strictly type the body.
    const body = `{
              "filter": {
                "property": "first_name",
                "rich_text": {
                  "contains": "${name}"
                }
              }
          }`
    const requestHeaders = NotionService.getNotionHeaders()
    const res = await fetch(
      `${window.location.origin}/contactus/search/api?name=${name}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: requestHeaders,
        cache: 'no-store',
        body: body,
      }
    )
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
}

export default ContactUsService
