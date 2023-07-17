import { IFilterContact } from '@/notion/IGetContactByFieldName'
import { contactFilters } from '@/notion/Types'
import FormatUtils from '@/utils/FormatUtils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/contacts' }),
  endpoints: (build) => ({
    createContact: build.mutation<any, Partial<any>>({
      query: (data: any) => ({
        url: '/create/api',
        method: 'POST',
        body: JSON.stringify(FormatUtils.formatCreateContactRequestBody(data)),
      }),
    }),
    getContacts: build.query({
      query: () => ({ url: '/api', method: 'POST' }),
      transformResponse: (responseData: any): any => {
        const formattedContacts = FormatUtils.formatContacts(responseData)
        return formattedContacts
      },
    }),
    getContact: build.query<any, any>({
      query: (id) => ({ url: `/${id}/api`, method: 'GET' }),
      transformResponse: (responseData: any): any => {
        const formattedContact = FormatUtils.formatContact(responseData)
        return formattedContact
      },
    }),
    deleteContact: build.mutation<{ success: boolean; id: string }, any>({
      query: (id: string) => ({ url: `/${id}/api`, method: 'DELETE' }),
    }),
    getContactByFieldName: build.mutation<any, Partial<any>>({
      query: (data: any) => {
        const body: IFilterContact = {
          filter: {
            property: data.field,
            rich_text: {
              contains: data.searchTerm,
            },
          },
        }
        return {
          url: `search/api?name=${data.searchTerm}`,
          method: 'POST',
          body: JSON.stringify(body),
        }
      },
      transformResponse: (responseData: any): any => {
        const formattedContact = FormatUtils.formatSearchResult(responseData)
        return formattedContact
      },
    }),
  }),
})

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetContactByFieldNameMutation,
} = contactsApi
