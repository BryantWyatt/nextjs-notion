import {
  IChannel,
  IEmail,
  IPhone,
  ILastName,
  IFirstName,
} from './IPageProperties'

export interface ICreateContactRequest {
  parent: IDatabaseId
  properties: IProperties
}

interface IDatabaseId {
  database_id: string
}

interface IProperties {
  channel: IChannel
  email: IEmail
  phone: IPhone
  last_name: ILastName
  first_name: IFirstName
}
