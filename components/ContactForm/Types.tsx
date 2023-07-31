export const edit = 'edit'
export const create = 'create'
export const readOnly = 'readOnly'

export type ContractFormMode =
  | typeof create
  | typeof edit
  | typeof readOnly
  | null
