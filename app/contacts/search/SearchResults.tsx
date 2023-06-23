interface Contact {
  firstName: string
  lastName: string
  email: string
  phone: string
  channel: string
}

interface SearchResultsProps {
  contact: Contact
  isLoading: boolean
}

const SearchResults = ({ contact, isLoading }: SearchResultsProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="pb-8">Search Results</h1>

      {isLoading && <div>Loading...</div>}
      {/* TODO: Add forEach later once form data is being imported in */}
      {contact.firstName.length > 0 && (
        <div className="container">
          <div className="flex gap-4">
            <div className="flex-1 flex-row items-center justify-left">
              <p>First Name</p>
            </div>
            <div className="flex-1 items-center justify-right">
              <p>{contact.firstName}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Last Name</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.lastName}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Email</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Phone</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.phone}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 items-center justify-left">
              <p>Channel</p>
            </div>
            <div className="flex-1 items-center justify-center">
              <p>{contact.channel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults
