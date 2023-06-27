'use client'
import ViewContact from '@/components/ViewContact/ViewContact'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import {
  fetchContact,
  selectContact,
  selectErrors,
  selectLoading,
} from '@/redux/slices/contactsSlice'

import { useEffect, useState } from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
  const dispatch = useAppDispatch()
  const contact = useAppSelector(selectContact)
  const loading: 'idle' | 'pending' | 'fulfilled' | 'rejected' =
    useAppSelector(selectLoading)
  const error = useAppSelector(selectErrors)

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchContact(params.slug))
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm">
        {loading === 'pending' ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">Error: {error}</div>
        ) : (
          <>
            {'firstName' in contact && (
              <div className="pt-4">
                <ViewContact contact={contact} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Page
