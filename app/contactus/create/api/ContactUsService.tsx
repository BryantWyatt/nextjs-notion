import NotionService from '@/services/NotionService'

const ContactUsService = {
  // Not currently being used but will in the future to show all contacts
  createContact: async (form: any) => {
    // TODO: Build interface to strictly type the body.
    const body = getBody(form)
    const requestHeaders = NotionService.getNotionHeaders()
    const res = await fetch(`${window.location.origin}/contactus/create/api`, {
      method: 'POST',
      credentials: 'include',
      headers: requestHeaders,
      cache: 'no-store',
      body: body,
    })
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
}

const getBody = (form: any) => {
  return `{
      "parent": {
          "database_id": "888c6b8706cf4924be581aa7c2e7918b"
      },
      "properties": {
          "reason": {
              "select": {
                  "name": "${form.channel}"
              }
          },
          "email": {
              "email": "${form.email}"
          },
          "phone": {
              "phone_number": "${form.phone}"
          },
          "last_name": {
              "rich_text": [
                  {
                      "text": {
                          "content": "${form.last_name}"
                      }
                  }
              ]
          },
          "first_name": {
              "title": [
                  {
                      "text": {
                          "content": "${form.first_name}"
                      }
                  }
              ]
          }
      }
    }`
}

export default ContactUsService
