export interface IListResponse<T> {
  count: number
  results: T[]
}

export interface IListPaginationResponse<T> {
  pagination: { limit: number; offset: number; total: number }
  data: T[]
}
