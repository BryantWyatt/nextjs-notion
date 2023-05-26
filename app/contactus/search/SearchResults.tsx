interface SearchResultsProps {
  contact: any
  isLoading: boolean
}

const SearchResults = ({ contact, isLoading }: SearchResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="pb-8">Search Results</h1>

      {isLoading && <div>Loading...</div>}
      {/* TODO: Add forEach later once form data is being imported in */}
      {contact && (
        <div className="container">
          <div className="flex gap-4">
            <div className="flex-1 flex-row items-center justify-left">
              <p>First Name</p>
            </div>
            <div className="flex-1 items-center justify-right">
              <p>
                {contact.results[0].properties.first_name.title[0].plain_text}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Last Name</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>
                {
                  contact.results[0].properties.last_name.rich_text[0]
                    .plain_text
                }
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Email</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.results[0].properties.email.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Phone</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.results[0].properties.phone.phone_number}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Channel</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.results[0].properties.reason.select.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults
