import { HealthUnitImmobilizationTypes as HealthUnitImmobilizationTypes } from '@/types/healthUnit'

export const HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS = {
  [HealthUnitImmobilizationTypes.IMMOBILIZER]: 'Imobilizador',
  [HealthUnitImmobilizationTypes.PLASTER]: 'Gesso',
  [HealthUnitImmobilizationTypes.SPLINT]: 'Tala',
}

export const HEALTH_UNIT_IMMOBILIZATION_TYPES_OPTIONS = [
  {
    label: HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS[HealthUnitImmobilizationTypes.IMMOBILIZER],
    value: HealthUnitImmobilizationTypes.IMMOBILIZER,
  },
  {
    label: HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS[HealthUnitImmobilizationTypes.PLASTER],
    value: HealthUnitImmobilizationTypes.PLASTER,
  },
  {
    label: HEALTH_UNIT_IMMOBILIZATION_TYPES_DESCRIPTIONS[HealthUnitImmobilizationTypes.SPLINT],
    value: HealthUnitImmobilizationTypes.SPLINT,
  },
]
