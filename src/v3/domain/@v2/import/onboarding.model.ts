import dayjs from 'dayjs'

export const onboadringStatusMap = {}

export enum OnboardingStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
  WAITING_REVIEW = 'WAITING_REVIEW',
  DONE = 'DONE',
  ROLLBACK_IN_PROGRESS = 'ROLLBACK_IN_PROGRESS',
  ROLLBACK = 'ROLLBACK',
}

export const onboardingStatusMap = {
  [OnboardingStatus.PENDING]: 'Pendente',
  [OnboardingStatus.IN_PROGRESS]: 'Em progresso',
  [OnboardingStatus.ERROR]: 'Erro',
  [OnboardingStatus.WAITING_REVIEW]: 'Aguardando revisão',
  [OnboardingStatus.DONE]: 'Concluído',
  [OnboardingStatus.ROLLBACK_IN_PROGRESS]: 'Reversão em progresso',
  [OnboardingStatus.ROLLBACK]: 'Revertido',
}

export type ErrorObject = Record<number, Record<string, string>>

export type OnboardingModelConstructor<T = any> = {
  id: number
  data: T
  errors: any
  status: OnboardingStatus
  createdAt: Date
}

export class OnboardingModel<T = any> {
  id: number
  data: T
  errors: any
  private _status: OnboardingStatus
  private _createdAt: Date

  constructor({ id, data, errors, status, createdAt }: OnboardingModelConstructor) {
    this.id = id
    this.data = data
    this.errors = errors
    this._status = status
    this._createdAt = createdAt
  }

  get createdAt() {
    return dayjs(this._createdAt).format('DD/MM/YYYY HH:mm')
  }

  get status() {
    return onboardingStatusMap[this._status] || this._status
  }

  get isWaitingReview() {
    return this._status === OnboardingStatus.WAITING_REVIEW
  }

  get hasErrorsFromValidations() {
    return this.checkIfIsJson(this.errors)
  }

  get errorsValidation(): ErrorObject {
    if (!this.hasErrorsFromValidations) return {}
    try {
      return JSON.parse(this.errors)
    } catch (error) {
      return {}
    }
  }

  private checkIfIsJson = (value: any): boolean => {
    if (!value) return false

    try {
      JSON.parse(value)
      return true
    } catch (error) {
      return false
    }
  }
}
