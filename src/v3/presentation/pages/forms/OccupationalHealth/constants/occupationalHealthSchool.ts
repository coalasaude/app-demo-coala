import { Benefit } from '../components/BenefitsSection'

import Manager from '/public/assets/svg/OccupationalHealth/icons/Manager.svg'
import HealthInsurance from '/public/assets/svg/OccupationalHealth/icons/HealthInsurance.svg'
import Notebook from '/public/assets/svg/OccupationalHealth/icons/Notebook.svg'
import Hospital from '/public/assets/svg/OccupationalHealth/icons/Hospital.svg'
import Stethoscope from '/public/assets/svg/OccupationalHealth/icons/Stethoscope.svg'
import Cardiogram from '/public/assets/svg/OccupationalHealth/icons/Cardiogram.svg'
import SaveWater from '/public/assets/svg/OccupationalHealth/icons/SaveWater.svg'

export const benefits: Benefit[] = [
  {
    title: 'Gestão do e-Social',
    description:
      'Mantenha sua escola em conformidade com todas as obrigações do e-Social, sem estresse. Nossa equipe gerencia tudo para você.',
    icon: Manager,
  },
  {
    title: 'Gestão CAT (Comunicação de Acidente do Trabalho)',
    description:
      'Estamos ao seu lado para comunicar de forma eficaz qualquer acidente, com todo suporte necessário.',
    icon: Hospital,
  },
  {
    title: 'PGR (Programa de Gerenciamento de Risco)',
    description:
      'Desenvolvemos um programa personalizado para identificação e mitigação de riscos, criando um ambiente escolar seguro para todos.',
    icon: HealthInsurance,
  },
  {
    title: 'PCMSO (Programa de Controle Médico de Saúde Ocupacional)',
    description:
      'Cuidamos da saúde de seus colaboradores, garantindo o bem-estar no dia a dia escolar.',
    icon: Stethoscope,
  },
  {
    title: 'LTCAT (Laudo Técnico de Condições Ambientais do Trabalho)',
    description:
      'Estamos ao seu lado para comunicar de forma eficaz qualquer acidente, com todo suporte necessário.',
    icon: Notebook,
  },
  {
    title: 'Exames Ocupacionais',
    description:
      'Realizamos exames admissionais, demissionais e periódicos. Afinal, a saúde em dia é fundamental.',
    icon: Cardiogram,
  },
  {
    title: 'ASO (Atestado de Saúde Ocupacional)',
    description:
      'Emitimos atestados que comprovam a aptidão de colaboradores e alunos para as suas funções.',
    icon: SaveWater,
  },
]

export const benefitsText = {
  title: 'O QUE VOCÊ GANHA AO ADERIR AO NOSSO SERVIÇO?',
  subtitle:
    'Ao se reunir à nossa rede de cuidado, você garantirá que sua escola esteja sempre em conformidade, segura e acolhedora. Confira tudo que oferecemos:',
}

export const description = {
  header:
    'Sabemos que a gestão escolar exige dedicação e apoio constantes. Por isso, oferecemos um serviço completo em Saúde Ocupacional, para que você possa focar no que realmente importa: a educação das crianças.',
  support:
    'Gerenciar a saúde na escola pode ser desafiador, e estamos aqui para tornar esse processo mais fácil para você. Nossa equipe especializada está pronta para oferecer todo o suporte e cuidado necessários.',
  subSupport:
    'Tem dúvidas ou quer saber mais? Clique no botão abaixo e entraremos em contato para compartilhar todas as informações, incluindo a disponibilidade do serviço na sua região!',
}

export const titles = {
  header: 'SAÚDE OCUPACIONAL COM CONFORTO E CONFIANÇA.',
  support: 'SUPORTE E CUIDADO ESPECIALIZADO AO SEU ALCANCE',
}
