import { UserFirstFills } from './UserFirstFills'

export enum HealthHistorySteps {
  INITIATE = 'INITIATE',
  GENERAL_INFORMATION = 'GENERAL_INFORMATION',
  ALLERGY = 'ALLERGY',
  DISEASE = 'DISEASE',
  MEDICINE = 'MEDICINE',
  VACCINE = 'VACCINE',
  FINISHED = 'FINISHED',
}

export class UserHealthHistoricFills extends UserFirstFills<HealthHistorySteps> {
  static steps = HealthHistorySteps

  static getInitStep(currentStep?: HealthHistorySteps) {
    if (!currentStep) return HealthHistorySteps.INITIATE
    if (currentStep === HealthHistorySteps.GENERAL_INFORMATION) return HealthHistorySteps.INITIATE

    return currentStep
  }
}
