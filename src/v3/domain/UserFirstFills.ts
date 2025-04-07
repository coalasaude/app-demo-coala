import { TApiUserFirstFillsResponse } from './api/ApiUserFirstFillsResponse'

export enum FirstFillingStepStatus {
  INITIALIZED = 'INITIALIZED',
  ENDED = 'ENDED',
  SKIPPED = 'SKIPPED',
}

export enum FirstFillingType {
  HEALTH_HISTORY = 'HEALTH_HISTORY',
  PERSONAL_DATA = 'PERSONAL_DATA',
}

export enum UserDataSections {
  PERSONAL_INFO = 'PERSONAL_INFO',
  LOGIN_DATA = 'LOGIN_DATA',
  ADDRESS = 'ADDRESS',
}

export class UserFirstFills<T extends string> {
  id: number
  userId: number
  step: T
  status: FirstFillingStepStatus
  type: FirstFillingType
  createdAt: Date
  updatedAt: Date | null

  constructor(params: TApiUserFirstFillsResponse) {
    this.id = params.id
    this.userId = params.userId
    this.step = params.step as any
    this.type = params.type
    this.status = params.status
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static steps = {
    INITIATE: 'INITIATE',
    FINISHED: 'FINISHED',
  } as {
    INITIATE: 'INITIATE'
    FINISHED: 'FINISHED'
    [key: string]: string
  }

  static getIsPendingStep(currentStep?: keyof typeof this.steps) {
    return !!currentStep && currentStep !== this.steps.FINISHED
  }

  static getIsPendingToStart(currentStep?: keyof typeof this.steps) {
    return currentStep === null
  }
}
