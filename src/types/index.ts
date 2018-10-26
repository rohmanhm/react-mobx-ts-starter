/**
 * Convert required type object to optional
 */
export type Optional<T> = { [P in keyof T]?: T[P] }
export type Errors<T> = { [P in keyof T]?: string[] }

export interface StatusConstantID {
  _id: number
  stringValue: string
}

export interface Filter {
  page: number
  limit: number
  sort: FilterSort
  query: any
  filter: any
}

export interface FilterSort {
  requestDate?: number
  generatedDate?: number
}
