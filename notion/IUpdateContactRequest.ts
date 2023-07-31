import {
  IChannel,
  IEmail,
  IPhone,
  ILastName,
  IFirstName,
} from './IPageProperties'

export interface IUpdateContactRequest {
  properties: IProperties
}

export interface IProperties {
  channel?: IChannel
  email?: IEmail
  phone?: IPhone
  last_name?: ILastName
  first_name?: IFirstName
}
