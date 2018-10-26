import { observable, action } from 'mobx'
// Stores
import { GlobalStore } from '~/stores/global'
// Types
import { Filter } from '~/types'

export interface StoreFilter extends Filter {}

const defaultFilter = {
  page: 1,
  limit: 10,
  query: '',
  sort: {},
  filter: {}
}

export class FilterStore extends GlobalStore {
  public data: any

  @observable
  public filter: StoreFilter = defaultFilter

  // region filter
  @action
  public setFilter (newFilter: StoreFilter) {
    const filter = {
      ...this.filter.filter,
      ...newFilter.filter
    }

    this.filter = {
      ...newFilter,
      filter
    }
  }

  @action
  public resetFilter () {
    this.filter = { ...defaultFilter }
  }
  // endregion
}

export default new FilterStore()
