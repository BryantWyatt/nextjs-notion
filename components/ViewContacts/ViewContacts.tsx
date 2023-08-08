'use client'
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from '@/redux/slices/contactsSlice'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../Button/Button'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import ReduxErrorHandling from '../ReduxErrorHandling/ReduxErrorHandling'

const ViewContacts = () => {
  const { data, isLoading, error, refetch } = useGetContactsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const [deleteContact, { isLoading: isDeleting, isSuccess: contactDeleted }] =
    useDeleteContactMutation()
  const [fakeLoader, setFakeLoader] = useState(true)

  useEffect(() => {
    refetch

    const timer = setTimeout(() => {
      setFakeLoader(false)
    }, 3500)

    return () => clearTimeout(timer)
  })

  useEffect(() => {
    if (contactDeleted) {
      toast.success('Contact deleted successfully')
    }
  }, [isDeleting])

  const handleDeleteOnClick = (id: string) => {
    deleteContact(id).then(() => refetch())
  }

  const errorResponse = ReduxErrorHandling(error)

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        <h1 className="flex justify-center pt-8 pb-4 font-bold text-3xl">
          View Contacts
        </h1>
        <div className="flex justify-center pb-4">
          <Link href="contacts/create">
            <Button buttonHierarchy="primary" buttonText="Create Contact" />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center">Loading...</div>
        ) : isDeleting ? (
          <div className="flex flex-col justify-center items-center">
            <div>Deleting...</div>
            <div className="flex justify-center ">
              <LoadingSpinner />
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center">{errorResponse}</div>
        ) : (
          <div className="flex flex-col space-y-4 justify-center">
            {!fakeLoader ? (
              <>
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
                          onClick={() => handleDeleteOnClick(contact.id)}
                          className="flex-none w-1/6 bg-red-500 hover:bg-red-700 font-bold rounded py-4 px-6"
                        >
                          <p>X</p>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </>
            ) : (
              <div className="flex justify-center">Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewContacts
