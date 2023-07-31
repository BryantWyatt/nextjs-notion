'use client'

import React, { useState } from 'react'
import ViewContact from '@/components/ViewContact/ViewContact'
import { firstName } from '@/notion/Types'
import { useGetContactByFieldNameMutation } from '@/redux/slices/contactsSlice'
import { useForm } from 'react-hook-form'

interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
  channel: string
}

const initialContactState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  channel: '',
}

const Search = () => {
  const [getContactByFieldName, { data, isLoading, error }] =
    useGetContactByFieldNameMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [contact, setContact] = useState<Contact>(initialContactState)

  const onSubmit = async (data: any) => {
    // TODO: The definition of constants feels weird here. Look into a better way.
    const searchTerm = data.firstName
    const field = firstName
    try {
      await getContactByFieldName({ field, searchTerm })
        .unwrap()
        .then((res) => setContact(res))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row pt-5 items-center">
          <input
            className="m-8
            dark:text-slate-400
            border-gray-200
            py-4
            px-4
            outline-none
            border-b
            bg-transparent
            w-2/3"
            placeholder="Search by First Name"
            {...register('firstName', { required: true })}
          />
          {errors.search && <span>This field is required</span>}
          <input
            className="bg-green-500
              hover:bg-green-700
              text-white
              font-bold
              py-2
              px-4
              rounded"
            value="Search"
            type="submit"
          />
        </div>
      </form>
      <div>
        <h1 className="flex flex-col items-center justify-center pb-8">
          Search Results
        </h1>
        {isLoading ? (
          <div className="justify-center">Loading</div>
        ) : error ? (
          <div className="justify-center">Error: TODO: Add Error</div>
        ) : (
          <div className="pt-4">
            {data && <ViewContact contact={contact} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
