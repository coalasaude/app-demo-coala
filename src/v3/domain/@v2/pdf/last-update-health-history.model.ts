export interface LastUpdateHealthHistoryConstructor {
  lastUpdate: Date
}

export class LastUpdateHealthHistory {
  public readonly lastUpdate: Date

  constructor(data: LastUpdateHealthHistoryConstructor) {
    this.lastUpdate = data.lastUpdate
  }
}
