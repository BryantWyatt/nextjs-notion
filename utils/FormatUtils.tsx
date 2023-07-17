import { ICreateContactRequest } from '@/notion/ICreateContactRequest'
import { IFilterContact } from '@/notion/IGetContactByFieldName'

const FormatUtils = {
  formatSearchResult: (searchResult: any) => {
    const {
      id = searchResult.results[0].id,
      firstName = searchResult.results[0].properties.first_name.title[0]
        .plain_text,
      lastName = searchResult.results[0].properties.last_name.rich_text[0]
        .plain_text,
      email = searchResult.results[0].properties.email.email,
      phone = searchResult.results[0].properties.phone.phone_number,
      channel = searchResult.results[0].properties.channel.select.name,
    } = searchResult

    const result = {
      id,
      firstName,
      lastName,
      email,
      phone,
      channel,
    }

    return result
  },
  formatContacts: (data: any) => {
    const result = data.res.results
      .map((contact: any) => {
        const formattedContact = {
          id: contact?.id,
          firstName: contact?.properties.first_name.title[0].plain_text,
          lastName: contact?.properties.last_name.rich_text[0].plain_text,
          email: contact?.properties.email.email,
          phone: contact?.properties.phone.phone_number,
          channel: contact?.properties.channel.select.name,
        }
        return formattedContact
      })
      .sort((a: any, b: any) => {
        if (a.firstName < b.firstName) {
          return -1
        }
        if (a.firstName > b.firstName) {
          return 1
        }
        return 0
      })
    return result
  },
  formatContact: (data: any) => {
    const formattedContact = {
      id: data.contact?.id,
      firstName: data.properties.first_name.title[0].plain_text,
      lastName: data.properties.last_name.rich_text[0].plain_text,
      email: data.properties.email.email,
      phone: data.properties.phone.phone_number,
      channel: data.properties.channel.select.name,
    }
    return formattedContact
  },
  formatCreateContactRequestBody: (form: any) => {
    const createContactRequestBody: ICreateContactRequest = {
      parent: {
        database_id: '888c6b8706cf4924be581aa7c2e7918b',
      },
      properties: {
        channel: {
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
  },
  formatGetContactByFieldNameBody: (form: any) => {
    const formattedBody: IFilterContact = {
      filter: {
        property: form.field,
        rich_text: {
          contains: form.searchTerm,
        },
      },
    }
    return formattedBody
  },
}

export default FormatUtils
