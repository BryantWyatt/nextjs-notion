'use client'

import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import {
  fetchContacts,
  selectContacts,
  selectErrors,
  selectLoading,
} from '@/redux/slices/contactsSlice'
import Link from 'next/link'
import { useEffect } from 'react'

const ViewContacts = () => {
  const dispatch = useAppDispatch()
  const contacts = useAppSelector(selectContacts)
  const loading: 'idle' | 'pending' | 'fulfilled' | 'rejected' =
    useAppSelector(selectLoading)
  const error = useAppSelector(selectErrors)

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchContacts())
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <h1 className="flex justify-center pt-8 pb-4 underline">
          View Contacts
        </h1>
        <div className="flex justify-center pb-4">
          <button
            className="
            bg-green-500
            hover:bg-green-70
            text-white
            font-bold
            rounded
            py-2
            px-2
            w-1/2"
          >
            <Link href="contacts/create">Create Contact</Link>
          </button>
        </div>
        {loading === 'pending' ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">Error: {error}</div>
        ) : (
          <div className="flex flex-col space-y-4 justify-center">
            {contacts.map((contact) => {
              return (
                <div key={`contact-${contact.firstName}`}>
                  <Link href={`contacts/${contact.id}`}>
                    <div className="bg-white rounded outline-none py-4 px-4">
                      <p className="text-black font-bold">
                        {contact.firstName} {contact.lastName}
                      </p>
                    </div>
                  </Link>
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
