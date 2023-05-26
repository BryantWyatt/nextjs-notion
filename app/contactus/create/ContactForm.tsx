'use client'

import { useState } from 'react'

const ContactForm = () => {
  const [value, setValue] = useState('')

  return (
    <>
      <h1>Under Construction</h1>
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
        type="text"
        id="search"
        value={value}
        placeholder="Search"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      ></input>
      <button
        className="
            bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
            "
      >
        Search
      </button>
    </>
  )
}

export default ContactForm
