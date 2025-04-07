import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { BrowseComments, BrowseCommentsConstructor } from './browse-comment'

export type BrowseTaskCommentConstructor = {
  data?: BrowseCommentsConstructor[]
  pagination: PaginationModelModelConstructor
}

export class BrowseTaskComment {
  data?: BrowseComments[]
  pagination: PaginationModel

  constructor(params: BrowseTaskCommentConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data?.map((comment) => new BrowseComments(comment))
  }
}
