import { IRichText } from './IPageProperties'
import { contactFilters } from './Types'

export interface IFilterContact {
  filter: IFilter
}

interface IFilter {
  property: contactFilters
  rich_text: IRichText
}
