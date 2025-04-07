import React, { ReactNode } from 'react'

import {
  AppointmentActivate,
  AppointmentNotActivate,
  ExpiredActivate,
  ExpiredNotActivate,
} from '../context/modals/MagicLinkDescriptions'

export enum MagicLinkType {
  SURVEY = 'SURVEY',
  APPOINTMENT = 'APPOINTMENT',
}

export enum ComponentKey {
  EXPIRED_ACTIVATE = 'EXPIRED_ACTIVATE',
  EXPIRED_NOT_ACTIVATE = 'EXPIRED_NOT_ACTIVATE',
  APPOINTMENT_ACTIVATE = 'APPOINTMENT_ACTIVATE',
  APPOINTMENT_NOT_ACTIVATE = 'APPOINTMENT_NOT_ACTIVATE',
}

export const componentMap: { [key in ComponentKey]: ReactNode } = {
  [ComponentKey.EXPIRED_ACTIVATE]: React.createElement(ExpiredActivate),
  [ComponentKey.EXPIRED_NOT_ACTIVATE]: React.createElement(ExpiredNotActivate),
  [ComponentKey.APPOINTMENT_ACTIVATE]: React.createElement(AppointmentActivate),
  [ComponentKey.APPOINTMENT_NOT_ACTIVATE]: React.createElement(AppointmentNotActivate),
}

interface MagicLinkStrategy {
  getComponentKey: (isActivated: boolean) => ComponentKey
}

export const magicLinkStrategyMap: { [key in MagicLinkType]: MagicLinkStrategy } = {
  [MagicLinkType.SURVEY]: {
    getComponentKey: (isActivated) =>
      isActivated ? ComponentKey.EXPIRED_ACTIVATE : ComponentKey.EXPIRED_NOT_ACTIVATE,
  },
  [MagicLinkType.APPOINTMENT]: {
    getComponentKey: (isActivated) =>
      isActivated ? ComponentKey.APPOINTMENT_ACTIVATE : ComponentKey.APPOINTMENT_NOT_ACTIVATE,
  },
}
