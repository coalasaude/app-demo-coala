export type BankModelConstructor = {
  name?: string
  branch?: string
  account?: string
}

export class BankModel {
  public readonly name?: string
  public readonly branch?: string
  public readonly account?: string

  constructor(props?: BankModelConstructor) {
    this.name = props?.name
    this.branch = props?.branch
    this.account = props?.account
  }

  toJSON() {
    return {
      name: this.name,
      branch: this.branch,
      account: this.account,
    }
  }
}
