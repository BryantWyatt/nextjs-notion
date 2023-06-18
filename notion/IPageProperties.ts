export interface IReason {
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
