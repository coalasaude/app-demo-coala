export type ReadInstitutionalPeiPdiConstructor = {
  generalPlansProgress: number
  startedPlans: number
  pendingPlans: number
  completedHalfOrMore: number
  completedLessThanHalf: number
}

export class ReadInstitutionalPeiPdi {
  generalPlansProgress: number
  startedPlans: number
  pendingPlans: number
  completedHalfOrMore: number
  completedLessThanHalf: number

  constructor(params: ReadInstitutionalPeiPdiConstructor) {
    this.generalPlansProgress = params.generalPlansProgress
    this.startedPlans = params.startedPlans
    this.pendingPlans = params.pendingPlans
    this.completedHalfOrMore = params.completedHalfOrMore
    this.completedLessThanHalf = params.completedLessThanHalf
  }
}
