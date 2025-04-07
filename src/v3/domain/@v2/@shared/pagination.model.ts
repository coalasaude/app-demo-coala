export interface PaginationModelModelConstructor {
  total: number
  limit: number
  offset: number
}

export class PaginationModel {
  total: number
  limit: number
  offset: number

  constructor({ total, limit, offset }: PaginationModelModelConstructor) {
    this.total = total
    this.limit = limit
    this.offset = offset
  }
}
