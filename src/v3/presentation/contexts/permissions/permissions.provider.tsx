/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react'
import { useRouter } from 'next/router'

import { useSectionPermissions } from './hooks/useSectionPermissions'

export enum Sections {
  HOME = 'HOME',
  APPOINTMENT = 'APPOINTMENT',
  MENTAL_HEALTH = 'MENTAL_HEALTH',
  COURSE = 'COURSE',
  MATERIALS = 'MATERIALS',
  DEPENDENT = 'DEPENDENT',
  DASHBOARD = 'DASHBOARD',
  SCHEDULED_MEDICINE = 'SCHEDULED_MEDICINE',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  PROFILE = 'PROFILE',
  HEALTH_UNIT = 'HEALTH_UNIT',
  ORGANIZATION = 'ORGANIZATION',
  IA = 'IA'
}

export interface IPermissionsContext {
  // sections: Record<Sections, boolean>
  sections: any
}

const initContext = (): IPermissionsContext => ({
  sections: Object.keys(Sections).reduce(
    (acc, key) => {
      acc[key as Sections] = false
      return acc
    },
    {} as Record<Sections, boolean>,
  ),
})

export const PermissionsContext = React.createContext<IPermissionsContext>(initContext())

const useSections = (pathname: string) => {
  if (pathname === '/') return {}
  const sections = useSectionPermissions()
  const sectionMap: Record<Sections, boolean> = React.useMemo(
    () => ({
      ...initContext().sections,
      ...sections,
    }),
    [sections],
  )

  return sectionMap
}

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const sections = useSections(router.pathname)
  return <PermissionsContext.Provider value={{ sections }}>{children}</PermissionsContext.Provider>
}

export const usePermissionsContext = () => React.useContext(PermissionsContext)
