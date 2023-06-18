import NotionService from '@/services/NotionService'
import { ICreateContactRequest } from '@/notion/ICreateContactRequest'
import { IFilterContact } from '@/notion/IGetContactByFieldName'
import { contactFilters } from '@/notion/Types'

const ContactUsService = {
  createContact: async (form: any) => {
    const body = getCreateContactRequestBody(form)
    const res = await fetch('/contactus/create/api', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
  getContacts: async () => {
    const requestHeaders = NotionService.getNotionHeaders()
    const res = await fetch('/contactus/view/api', {
      method: 'POST',
      credentials: 'include',
      headers: requestHeaders,
      cache: 'no-store',
    })
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
  getContactByFieldName: async (name: string, field: contactFilters) => {
    const body: IFilterContact = {
      filter: {
        property: field,
        rich_text: {
          contains: name,
        },
      },
    }
    const res = await fetch('/contactus/search/api?name=${name}', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!res.ok) throw Error('Failed to fetch data')
    return res.json()
  },
}

const getCreateContactRequestBody = (form: any) => {
  const createContactRequestBody: ICreateContactRequest = {
    parent: {
      database_id: '888c6b8706cf4924be581aa7c2e7918b',
    },
    properties: {
      reason: {
        select: {
          name: form.channel,
        },
      },
      email: {
        email: form.email,
      },
      phone: {
        phone_number: form.phone,
      },
      last_name: {
        rich_text: [
          {
            text: {
              content: form.last_name,
            },
          },
        ],
      },
      first_name: {
        title: [
          {
            text: {
              content: form.first_name,
            },
          },
        ],
      },
    },
  }
  return createContactRequestBody
}

export default ContactUsService
