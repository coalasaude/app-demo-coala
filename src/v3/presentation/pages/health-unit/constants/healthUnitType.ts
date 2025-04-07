import { HealthUnitType } from '@/v3/domain/api/ApiHealthUnitResponse'

export const HEALTH_UNIT_TYPE_DESCRIPTION = {
  [HealthUnitType.HOSPITAL]: 'Hospital',
  [HealthUnitType.ORTHOPEDIC]: 'Ortopedia',
  [HealthUnitType.OPHTHALMOLOGY]: 'Oftalmologia',
  [HealthUnitType.OTOLARYNGOLOGY]: 'Otorrinolaringologia',
  [HealthUnitType.DENTISTRY]: 'Odontologia',
}

export const HEALTH_UNIT_TYPE_OPTIONS = [
  { label: HEALTH_UNIT_TYPE_DESCRIPTION[HealthUnitType.HOSPITAL], value: HealthUnitType.HOSPITAL },
  {
    label: HEALTH_UNIT_TYPE_DESCRIPTION[HealthUnitType.ORTHOPEDIC],
    value: HealthUnitType.ORTHOPEDIC,
  },
  {
    label: HEALTH_UNIT_TYPE_DESCRIPTION[HealthUnitType.OPHTHALMOLOGY],
    value: HealthUnitType.OPHTHALMOLOGY,
  },
  {
    label: HEALTH_UNIT_TYPE_DESCRIPTION[HealthUnitType.OTOLARYNGOLOGY],
    value: HealthUnitType.OTOLARYNGOLOGY,
  },
  {
    label: HEALTH_UNIT_TYPE_DESCRIPTION[HealthUnitType.DENTISTRY],
    value: HealthUnitType.DENTISTRY,
  },
]
