export const edit = 'edit'
export const create = 'create'
export const readOnly = 'readOnly'
export const primary = 'primary'
export const secondary = 'secondary'

export type ContractFormMode = typeof create | typeof edit | null
export type ButtonHierarchy = typeof primary | typeof secondary
