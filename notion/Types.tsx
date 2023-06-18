export const reason = 'reason'
export const email = 'email'
export const phone = 'phone'
export const lastName = 'last_name'
export const firstName = 'first_name'

export type contactFilters =
  | typeof reason
  | typeof email
  | typeof phone
  | typeof lastName
  | typeof firstName
