import { AllergyCategoryModel, AllergyCategoryModelConstructor } from './allergy-category.model'

export interface AllergyCategoryBrowseModelConstructor {
  data: AllergyCategoryModelConstructor[]
}

export class AllergyCategoryBrowseModel {
  public readonly data: AllergyCategoryModel[]

  constructor(params: AllergyCategoryBrowseModelConstructor) {
    this.data = params.data.map((user) => new AllergyCategoryModel(user))
  }
}
