import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { SickNoteModel, SickNoteModelConstructor } from './sick-note.model'

export interface SickNoteBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: SickNoteModelConstructor[]
}

export class SickNoteBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: SickNoteModel[]

  constructor(params: SickNoteBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((sickNote) => new SickNoteModel(sickNote))
  }
}
