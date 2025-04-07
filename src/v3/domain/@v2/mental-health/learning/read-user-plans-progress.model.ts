export type ReadUserPlansProgressConstructor = {
  plansProgress: number
}

export class ReadUserPlansProgress {
  plansProgress: number

  constructor(params: ReadUserPlansProgressConstructor) {
    this.plansProgress = params.plansProgress
  }
}
