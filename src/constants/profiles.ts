import { ProfileType } from '@/types/profile'

export const ProfilesTypeDescription = {
  [ProfileType.MEDICAL]: 'Saúde',
  [ProfileType.FACULTATIVE_ACCESS]: 'Facultativo',
  [ProfileType.NORMAL]: 'Obrigatório',
}

export const ProfileTypeOptions = [
  {
    label: 'Obrigatório',
    value: ProfileType.NORMAL,
  },
  {
    label: 'Facultativo',
    value: ProfileType.FACULTATIVE_ACCESS,
  },
  {
    label: 'Saúde',
    value: ProfileType.MEDICAL,
  },
]
