export const channel = 'channel'
export const email = 'email'
export const phone = 'phone'
export const lastName = 'last_name'
export const firstName = 'first_name'

export type contactFilters =
  | typeof channel
  | typeof email
  | typeof phone
  | typeof lastName
  | typeof firstName
