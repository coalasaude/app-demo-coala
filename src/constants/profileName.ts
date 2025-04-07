export enum ProfileName {
  Gestor = 'Gestor',
  Colaborador = 'Colaborador',
  Aluno = 'Aluno',
  Administrador = 'Administrador',
  Médico = 'Médico',
  Enfermeiro = 'Enfermeiro',
  Psicólogo = 'Psicólogo',
  Nutricionista = 'Nutricionista',
  Técnico_de_enfermagem = 'Técnico de enfermagem',
  Agente_de_saúde = 'Agente de saúde',
  RESPONSAVEL = 'Responsável',
  OUTRO = '-',
}

export const PROFILE_NAME_DESCRIPTION: Record<string, string> = {
  [ProfileName.Gestor]: 'Gt.',
  [ProfileName.Colaborador]: 'Colab.',
  [ProfileName.Aluno]: 'Al.',
  [ProfileName.Administrador]: 'Adm.',
  [ProfileName.Médico]: 'Méd.',
  [ProfileName.Enfermeiro]: 'Enf.',
  [ProfileName.Psicólogo]: 'Psi.',
  [ProfileName.Nutricionista]: 'Nutri.',
  [ProfileName.Técnico_de_enfermagem]: 'Téc enf.',
  [ProfileName.Agente_de_saúde]: 'Ag. saúde',
  [ProfileName.RESPONSAVEL]: 'Resp.',
  [ProfileName.OUTRO]: '-',
}

export const ProfileNameOptions = [
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Gestor],
    value: ProfileName.Gestor,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Colaborador],
    value: ProfileName.Colaborador,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Aluno],
    value: ProfileName.Aluno,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Administrador],
    value: ProfileName.Administrador,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Enfermeiro],
    value: ProfileName.Enfermeiro,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Médico],
    value: ProfileName.Médico,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Psicólogo],
    value: ProfileName.Psicólogo,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Nutricionista],
    value: ProfileName.Nutricionista,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Técnico_de_enfermagem],
    value: ProfileName.Técnico_de_enfermagem,
  },
  {
    label: PROFILE_NAME_DESCRIPTION[ProfileName.Agente_de_saúde],
    value: ProfileName.Agente_de_saúde,
  },
]
