import { SurveyEnum } from './enum/survey.enum'
import { SurveyModel, SurveyModelConstructor } from './survey.model'

export interface SurveyBrowseModelConstructor {
  data: SurveyModelConstructor[]
}

export class SurveyBrowseModel {
  public readonly data: SurveyModel[]

  constructor(props: SurveyBrowseModelConstructor) {
    this.data = props.data.map((survey) => new SurveyModel(survey))
  }

  findSurveyByName(name: SurveyEnum) {
    return this.data.find((survey) => survey.name === name)
  }
}
