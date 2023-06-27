'use client'

import React, { useState } from 'react'
import ViewContact from '@/components/ViewContact/ViewContact'
import ContactsService from '@/services/ContactsService'
import FormatUtils from '@/utils/FormatUtils'
import { firstName } from '@/notion/Types'

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
  const [value, setValue] = useState('')
  const [contact, setContact] = useState<Contact>(initialContactState)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = () => {
    const fetchData = async () => {
      setIsLoading(true)
      ContactsService.getContactByFieldName(value, firstName).then((res) => {
        const formattedContact = FormatUtils.formatSearchResult(res)

        setContact(formattedContact)
      })
      setIsLoading(false)
    }

    fetchData()
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center pt-5">
        <input
          className="m-8
                    dark:text-slate-400
                    border-gray-200
                    py-4
                    px-4
                    outline-none
                    border-b
                    bg-transparent
                "
          id="search"
          type="text"
          placeholder="Search by First Name"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        ></input>
        <button
          className="
             bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
             "
          onClick={() => handleOnClick()}
        >
          Submit
        </button>
      </div>
      <h1 className="flex flex-col items-center justify-center pb-8">
        Search Results
      </h1>
      {isLoading ? <div>Loading...</div> : <ViewContact contact={contact} />}
    </div>
  )
}

export default Search
