import { IChannel, IRichText, ITitle } from './IPageProperties'

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

interface IEmail {
  email: string
}

interface IPhone {
  phone_number: string
}

interface ILastName {
  rich_text: IRichText[]
}

interface IFirstName {
  title: ITitle[]
}
