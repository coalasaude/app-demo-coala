export enum Profiles {
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

export const PROFILES_DESCRIPTION = {
  [Profiles.STUDENT]: 'Aluno',
  [Profiles.EMPLOYEE]: 'Colaborador',
  [Profiles.MANAGER]: 'Gestor',
}

export const PROFILES_OPTIONS = [
  {
    label: PROFILES_DESCRIPTION[Profiles.STUDENT],
    value: Profiles.STUDENT,
  },
  {
    label: PROFILES_DESCRIPTION[Profiles.EMPLOYEE],
    value: Profiles.EMPLOYEE,
  },
  {
    label: PROFILES_DESCRIPTION[Profiles.MANAGER],
    value: Profiles.MANAGER,
  },
]
