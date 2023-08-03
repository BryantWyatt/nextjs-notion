'use client'

import { ContractFormMode } from '@/components/ContactForm/Types'
import { useGetContactQuery } from '@/redux/slices/contactsSlice'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import ContactForm from './ContactForm'
import ReduxErrorHandling from '../ReduxErrorHandling/ReduxErrorHandling'
import { useEffect, useState } from 'react'

interface ContactFormContainerProps {
  id?: string
  mode: ContractFormMode
}

const ContactFormContainer = ({
  id = '',
  mode = null,
}: ContactFormContainerProps) => {
  const { data, isLoading, error, refetch } = useGetContactQuery(
    id ? id : skipToken,
    { refetchOnMountOrArgChange: true }
  )

  const errorResponse = ReduxErrorHandling(error)

  useEffect(() => {
    refetch
  })

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-4 jusitfy-content items-center">
        {isLoading ? (
          <div className="flex justify-center">Loading</div>
        ) : error ? (
          <div className="flex justify-center">{errorResponse}</div>
        ) : (
          <ContactForm id={id} mode={mode} data={data} />
        )}
      </div>
    </div>
  )
}

export default ContactFormContainer
