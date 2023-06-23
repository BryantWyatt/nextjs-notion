'use client'

import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import {
  fetchContacts,
  selectContacts,
  selectErrors,
  selectLoading,
} from '@/redux/slices/contactsSlice'
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
        {loading === 'pending' ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">Error: {error}</div>
        ) : (
          <div className="flex flex-col space-y-4 justify-center">
            {contacts.map((contact) => {
              return (
                <div
                  key={`contact-${contact.firstName}`}
                  className="bg-white rounded outline-none py-4 px-4"
                >
                  <p className="text-black font-bold">
                    {contact.firstName} {contact.lastName}
                  </p>
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
