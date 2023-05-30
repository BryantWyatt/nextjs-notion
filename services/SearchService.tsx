const SearchService = {
  formatSearchResult: (searchResult: any) => {
    const {
      firstName = searchResult.results[0].properties.first_name.title[0]
        .plain_text,
      lastName = searchResult.results[0].properties.last_name.rich_text[0]
        .plain_text,
      email = searchResult.results[0].properties.email.email,
      phone = searchResult.results[0].properties.phone.phone_number,
      channel = searchResult.results[0].properties.reason.select.name,
    } = searchResult

    const result = {
      firstName,
      lastName,
      email,
      phone,
      channel,
    }

    return result
  },
}

export default SearchService
