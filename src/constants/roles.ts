import { Role } from '@/types/role'

export const RolesDescription: Record<string, string> = {
  [Role.ADMIN]: 'Administrador',
  [Role.COLABORATOR]: 'Colaborador',
  [Role.MANAGER]: 'Gestor',
  [Role.STUDENT]: 'Aluno',
  [Role.MEDICAL]: 'Médico',
  [Role.NURSE]: 'Enfermeiro',
  [Role.NURSING_TECHNICIAN]: 'Técnico em enfermagem',
  [Role.RESPONSABLE]: 'Responsável',
  [Role.NUTRITIONIST]: 'Nutricionista',
  [Role.PSYCHOLOGIST]: 'Psicólogo',
}

export const InstitutionRolesOptions = [
  {
    value: Role.COLABORATOR,
    label: RolesDescription[Role.COLABORATOR],
  },
  {
    value: Role.MANAGER,
    label: RolesDescription[Role.MANAGER],
  },
  {
    value: Role.STUDENT,
    label: RolesDescription[Role.STUDENT],
  },
]

export const AdminRolesOptions = [
  {
    value: Role.ADMIN,
    label: RolesDescription[Role.ADMIN],
  },
]

export const MedicalRoleOptions = [
  {
    value: Role.NURSING_TECHNICIAN,
    label: RolesDescription[Role.NURSING_TECHNICIAN],
  },
  {
    value: Role.NURSE,
    label: RolesDescription[Role.NURSE],
  },
  {
    value: Role.MEDICAL,
    label: RolesDescription[Role.MEDICAL],
  },
  {
    value: Role.NUTRITIONIST,
    label: RolesDescription[Role.NUTRITIONIST],
  },
  {
    value: Role.PSYCHOLOGIST,
    label: RolesDescription[Role.PSYCHOLOGIST],
  },
]

export const MedicalRegisters = {
  [Role.MEDICAL]: 'CRM',
  [Role.NURSING_TECHNICIAN]: 'COREN',
  [Role.NURSE]: 'COREN',
  [Role.PSYCHOLOGIST]: 'CRP',
  [Role.NUTRITIONIST]: 'CRN',
}
