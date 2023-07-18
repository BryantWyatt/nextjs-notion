'use client'
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '@/redux/slices/contactsSlice'
import Link from 'next/link'
import { useEffect } from 'react'

const ViewContacts = () => {
  const { data, isLoading, error, refetch } = useGetContactsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation()

  useEffect(() => {
    refetch
  })

  const handleOnClick = (id: string) => {
    deleteContact(id).then(() => refetch())
  }

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="flex justify-center pt-8 pb-4 font-bold text-3xl">
          View Contacts
        </h1>
        <div className="flex justify-center pb-4">
        <Link className="
        justify-content
        items-center
          bg-green-500
          hover:bg-green-700
          text-white
          font-bold
          rounded
          py-2
          px-4"
          href="contacts/create">
          <button>
            Create Contact
          </button>
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">{error}</div>
        ) : (
          <div className="flex flex-col space-y-4 justify-center">
            {data.map((contact: any) => {
              return (
                <div key={`contact-${contact.firstName}`}>
                  <div className="flex space-x-4 justify-center">
                    <Link
                      className="flex-none w-5/6"
                      href={`contacts/${contact.id}`}
                    >
                      <div className="bg-white rounded outline-none py-4 px-4 flex-initial">
                        <p className="text-black font-bold">
                          {contact.firstName} {contact.lastName}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleOnClick(contact.id)}
                      className="flex-none w-1/6 bg-red-500 hover:bg-red-700 font-bold rounded py-4 px-6"
                    >
                      <p>X</p>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewContacts
