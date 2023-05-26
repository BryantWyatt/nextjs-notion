'use client'

import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

interface SearchResultsProps {
  pokemon: any
}

const SearchResults = ({ pokemon }: SearchResultsProps) => {
  const { data, error, isLoading } = useSWR(
    pokemon ? `/pokemon/api?name=` + pokemon : null,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div>
      <h1>Pokemon Results</h1>
      <p>Id: {data.data.id}</p>
      <p>Name: {data.data.name}</p>
      <p>Base Experience: {data.data.base_experience}</p>
      <p>Height: {data.data.height}</p>
      <p>Weight: {data.data.weight}</p>
    </div>
  )
}

export default SearchResults
