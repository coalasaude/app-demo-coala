export const POSTHOG_ACTIONS = {
  CLICKED: 'clicked',
  CREATED: 'created',
  UPDATED: 'updated',
  DELETED: 'deleted',
  VIEWED: 'viewed',
  COMPLETED_STEP_1: 'completed_step_1',
  LIKED: 'liked',
  REPLIED: 'replied',
  PUBLISH: 'publish',
}

export const POSTHOG_EVENTS = {
  LEARNING: {
    PEI_PDI: 'users-learning-pei_pdi',
    TASK: 'users-learning-task',
    COMMENT: 'users-learning-comment',
    MEDICAL_REPORT: 'users-learning-medical_report',
    MEDICAL_ANALYSIS: 'users-learning-medical_analysis',
    REQUESTED_ANALYSIS: 'users-learning-requested_analysis',
    AREA_OF_INTEREST: 'users-learning-area_of_interest',
    BEHAVIOUR: 'users-learning-behaviour',
    COALA_REGISTER: 'users-learning-coala_register',
    DIFFICULTIES: 'users-learning-difficulties',
    EXTERNAL_REGISTER: 'users-learning-external_register',
  },
}

export const buildPath = (event: string, action: string) => {
  return `${event}-${action}`
}
