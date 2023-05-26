'use client'

import React, { useState } from 'react'
import SearchResults from './SearchResults'

const PokemonSearch = () => {
  const [value, setValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  const handleOnClick = () => {
    setShowResults(true)
  }

  return (
    <div>
      <h1>Pokemon</h1>
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
        id="pokemon"
        type="text"
        placeholder="pokemon"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      ></input>
      <button onClick={() => handleOnClick()}>Get Pokemon</button>
      {showResults && <SearchResults pokemon={value} />}
    </div>
  )
}

export default PokemonSearch
