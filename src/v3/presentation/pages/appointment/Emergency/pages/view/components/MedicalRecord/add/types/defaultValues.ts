import { initialDiagnoseValues } from '@/containers/Appointment/Emergency/cid/add/types'

export const defaultValuesNurse = {
  diagnose: initialDiagnoseValues,
  classification: null as string | null,
  systolic: 0,
  certificatePass: '',
  diastolic: 0,
  heart_rate: 0,
  respiratory_frequency: 0,
  body_temperature: '',
  oxygen_saturation: 0,
  history:
    'Paciente de __ anos, chega a consulta acompanhado de responsável/colaborador ___ queixando-se de ___, com início ___, associado a ____. \nAlergias e intolerâncias: \nDoenças ou cirurgias prévias: \nOutras comorbidades: \nMedicamento contínuo: \nPeso __kg. \nCartão de vacinação:',
  exam: 'Boa visualização por teleconsulta. Ao momento do exame, paciente apresentou-se  BEG (bom estado geral), acordado, ativo, reativo, interagindo com o examinador, acianótico (não apresenta coloração azulada), anictérico (não apresenta coloração amarelada), normocorado (com coloração normal) e respirando em AA (ar ambiente). Avalio',
  impression:
    'Paciente estável clinicamente, com história clínica e exame físico com situação clínica sugestiva de _______.',
  conduct:
    'Gerenciamento dos sintomas: \nOrientações de autocuidado: \nPrescrição de medicamentos: \nEncaminhamento para avaliação adicional: \nMonitoramento: \n\nOriento sobre sinais de alarme, tais como ________________________ e sobre a importância de procurar atendimento hospitalar caso apresente algum destes sintomas.',
}

export const defaultValuesMedical = {
  diagnose: initialDiagnoseValues,
  classification: null as string | null,
  systolic: 0,
  certificatePass: '',
  diastolic: 0,
  heart_rate: 0,
  respiratory_frequency: 0,
  body_temperature: '',
  oxygen_saturation: 0,
  history:
    'Paciente de __ anos, chega a consulta acompanhado de responsável/colaborador ___ queixando-se de ___, com início ___, associado a ____. \nAlergias e intolerâncias: \nDoenças ou cirurgias prévias: \nOutras comorbidades: \nMedicamento contínuo: \nPeso __kg. \nCartão de vacinação:',
  exam: 'Boa visualização e áudio via telemedicina. Não recebo imagens anexas. \n Padrão respiratório: \n Abdomen: \n MMSS:\n',
  impression:
    'Paciente estável clinicamente, com história clínica e exame físico com situação clínica sugestiva de _______.',
  conduct:
    'Orientações gerais: \nProcurar pronto-socorro mais próximo em caso de: \nOriento alimentação: \n \nMostro-me disponível para reavaliação caso seja necessário e para dúvidas',
}
