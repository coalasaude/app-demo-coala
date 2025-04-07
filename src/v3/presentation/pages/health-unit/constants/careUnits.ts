import { HealthUnitCareUnits } from '@/types/healthUnit'

export const HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS = {
  [HealthUnitCareUnits.WARD]: 'Enfermaria',
  [HealthUnitCareUnits.ROOM]: 'Quarto',
  [HealthUnitCareUnits.CTI]: 'CTI',
}

export const HEALTH_UNIT_CARE_UNITS_OPTIONS = [
  {
    label: HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS[HealthUnitCareUnits.WARD],
    value: HealthUnitCareUnits.WARD,
  },
  {
    label: HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS[HealthUnitCareUnits.ROOM],
    value: HealthUnitCareUnits.ROOM,
  },
  {
    label: HEALTH_UNIT_CARE_UNITS_DESCRIPTIONS[HealthUnitCareUnits.CTI],
    value: HealthUnitCareUnits.CTI,
  },
]
