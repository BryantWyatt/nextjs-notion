export interface IChannel {
  select: ISelect
}

export interface ISelect {
  name: string
}

export interface ITitle {
  text: IContent
}

export interface IRichText {
  text?: IContent
  contains?: string
}

export interface IContent {
  content: string
}

export interface IContains {
  contains: string
}

export interface IEmail {
  email: string
}

export interface IPhone {
  phone_number: string
}

export interface ILastName {
  rich_text: IRichText[]
}

export interface IFirstName {
  title: ITitle[]
}
