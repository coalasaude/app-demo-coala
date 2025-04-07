import { UserFirstFills } from './UserFirstFills'

export enum PersonalDataSteps {
  INITIATE = 'INITIATE',
  PERSONAL_INFO = 'PERSONAL_INFO',
  ADDRESS = 'ADDRESS',
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  PROFESSIONAL_REFERENCE = 'PROFESSIONAL_REFERENCE',
  FINISHED = 'FINISHED',
}

export class UserPersonalDataFills extends UserFirstFills<PersonalDataSteps> {
  static steps = PersonalDataSteps

  static getInitStep(currentStep?: PersonalDataSteps) {
    if (!currentStep) return PersonalDataSteps.INITIATE
    if (currentStep === PersonalDataSteps.PERSONAL_INFO) return PersonalDataSteps.INITIATE

    return currentStep
  }
}
