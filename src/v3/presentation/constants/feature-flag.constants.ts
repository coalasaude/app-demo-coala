export enum FeatureFlag {
  THERAPY_RESPONSIBLE_BANNER = 'THERAPY_RESPONSIBLE_BANNER',
  THERAPY_SCHOOL_BANNER = 'THERAPY_SCHOOL_BANNER',

  ALLOW_APP_VIDEO_FULLSCREEN = 'ALLOW_APP_VIDEO_FULLSCREEN',
  MOBILE_APP_NATIVE_VIDEO_CALL = 'MOBILE_APP_NATIVE_VIDEO_CALL',

  SURVEY_APPOINTMENT_CREATION_FORM = 'SURVEY_APPOINTMENT_CREATION_FORM',
  SURVEY_APPOINTMENT_ATTENDANCE = 'SURVEY_APPOINTMENT_ATTENDANCE',

  GUIDE_TOUR_RESPONSIBLE = 'GUIDE_TOUR_RESPONSIBLE',
  GUIDE_TOUR_MANAGER = 'GUIDE_TOUR_MANAGER',
  GUIDE_TOUR_COLLABORATOR = 'GUIDE_TOUR_COLLABORATOR',
  GUIDE_TOUR_HEALTH_UNIT = 'GUIDE_TOUR_HEALTH_UNIT',

  BANNER_NPS = 'BANNER_NPS',

  HOME_NETWORK = 'HOME_NETWORK',

  MENTAL_HEALTH_PEI_PDI_AI_CREATION = 'MENTAL_HEALTH_PEI_PDI_AI_CREATION',
}

type FeatureFlagHomeNetworkPayload = {
  youtube?: string
  instagram?: {
    url?: string
    comment?: string
  }
}

type FeatureFlagParams = {
  key: string
  payload?: any
  variants: Record<string, string>
}

export const FeatureFlagMap = {
  [FeatureFlag.THERAPY_SCHOOL_BANNER]: {
    key: 'therapy-school-banner',
    variants: {},
  },
  [FeatureFlag.THERAPY_RESPONSIBLE_BANNER]: {
    key: 'therapy-responsible-banner',
    variants: {},
  },
  [FeatureFlag.ALLOW_APP_VIDEO_FULLSCREEN]: {
    key: 'allow-app-video-fullscreen',
    variants: {},
  },
  [FeatureFlag.GUIDE_TOUR_RESPONSIBLE]: {
    key: 'guide-tour-responsible',
    variants: {},
  },
  [FeatureFlag.GUIDE_TOUR_MANAGER]: {
    key: 'guide-tour-manager',
    variants: {},
  },
  [FeatureFlag.GUIDE_TOUR_COLLABORATOR]: {
    key: 'guide-tour-collaborator',
    variants: {},
  },
  [FeatureFlag.GUIDE_TOUR_HEALTH_UNIT]: {
    key: 'guide-tour-health-unit',
    variants: {},
  },
  [FeatureFlag.MOBILE_APP_NATIVE_VIDEO_CALL]: {
    key: 'mobile-app-native-video-call',
    variants: {},
  },
  [FeatureFlag.SURVEY_APPOINTMENT_CREATION_FORM]: {
    key: 'survey-appointment-creation-form',
    variants: {},
  },
  [FeatureFlag.SURVEY_APPOINTMENT_ATTENDANCE]: {
    key: 'survey-appointment-attendance',
    variants: {},
  },
  [FeatureFlag.HOME_NETWORK]: {
    key: 'home-network-section',
    variants: {},
    payload: {} as FeatureFlagHomeNetworkPayload,
  },
  [FeatureFlag.BANNER_NPS]: {
    key: 'banner-form-nps',
    variants: {},
  },
  [FeatureFlag.MENTAL_HEALTH_PEI_PDI_AI_CREATION]: {
    key: 'mental-health-pei-pdi-ai-creation',
    variants: {},
  },
} as const satisfies Record<FeatureFlag, FeatureFlagParams>
