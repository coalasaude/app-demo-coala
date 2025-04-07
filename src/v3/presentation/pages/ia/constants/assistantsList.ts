import IA_PPS from 'public/assets/svg/IA/AI_PPS.svg'
import Weelchair from 'public/assets/svg/IA/wheelchair.svg'
import Anger from 'public/assets/svg/IA/anger.svg'
import Clipboard from 'public/assets/svg/IA/clipboard.svg'
import LoudSpeaker from 'public/assets/svg/IA/loudspeaker.svg'
import Chart from 'public/assets/svg/IA/bar_chart.svg'
import Mortar from 'public/assets/svg/IA/mortar_board.svg'
import Seeding from 'public/assets/svg/IA/seedling.svg'
import Hammer from 'public/assets/svg/IA/hammer_and_wrench.svg'
import Mag from 'public/assets/svg/IA/mag.svg'
import Blub from 'public/assets/svg/IA/blub.svg'
import Balloon from 'public/assets/svg/IA/speech_balloon.svg'
import Americas from 'public/assets/svg/IA/earth_americas.svg'
import ChartUp from 'public/assets/svg/IA/chart_with_upwards_trend.svg'
import School from 'public/assets/svg/IA/school.svg'
import Family from 'public/assets/svg/IA/man-woman-boy.svg'
import Scales from 'public/assets/svg/IA/scales.svg'
import Lock from 'public/assets/svg/IA/lock.svg'
import Arts from 'public/assets/svg/IA/performing_arts.svg'

import { Assistant } from '../types/Assistant'

export enum AssistantCategories {
  HEALTH = 'HEALTH',
  INCLUSION = 'INCLUSION',
  MANAGEMENT = 'MANAGEMENT',
  MARKETING = 'MARKETING',
  FINANCIAL = 'FINANCIAL',
  LEGAL = 'LEGAL',
  OTHERS = 'OTHERS',
}

export const assistantCategoriesOptions = [
  {
    label: 'Saúde',
    value: AssistantCategories.HEALTH,
  },
  {
    label: 'Inclusão',
    value: AssistantCategories.INCLUSION,
  },
  {
    label: 'Gestão',
    value: AssistantCategories.MANAGEMENT,
  },
  {
    label: 'Marketing',
    value: AssistantCategories.MARKETING,
  },
  {
    label: 'Juridico',
    value: AssistantCategories.LEGAL,
  },
  {
    label: 'Financeiro',
    value: AssistantCategories.FINANCIAL,
  },
  {
    label: 'Outros',
    value: AssistantCategories.OTHERS,
  },
]

export const assistantsList: Assistant[] = [
  {
    name: 'Promoção e prevenção de saúde',
    id: 'asst_XeCplk9sWbxm9PR7FLi1yUI6',
    icon: IA_PPS,
    description:
      'Cuide da saúde com a gente! Nosso assistente te ajuda a criar hábitos saudáveis e te lembra de marcar',
    category: AssistantCategories.HEALTH,
  },
  {
    name: 'Educação inclusiva',
    id: 'asst_NQ4PuqR7uTFNzHZODBPhSDmB',
    icon: Weelchair,
    description:
      'Aprendizado para todos! Nosso assistente oferece recursos personalizados para cada aluno, garantindo uma educação inclusiva e de qualidade.',
    category: AssistantCategories.INCLUSION,
  },
  {
    name: 'Prevenção e gestão de bullying e violência',
    id: 'asst_VlLPdsXD3FllEEWHRbTSs7tD',
    icon: Anger,
    description:
      'Um ambiente seguro para todos! Nosso assistente te ajuda a identificar e prevenir casos de bullying e violência, promovendo um clima escolar mais saudável.',
    category: AssistantCategories.INCLUSION,
  },
  {
    name: 'Base Nacional Comum Curricular',
    id: 'asst_IGpN0CdCP01iefNsKHb4N1C1',
    icon: Clipboard,
    description:
      'A BNCC na palma da sua mão! Nosso assistente te auxilia a implementar a BNCC em sala de aula, oferecendo materiais e atividades didáticas.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Marketing escolar',
    id: 'asst_vfifQjdISaYxX0KdLM1eyUio',
    icon: LoudSpeaker,
    description:
      'Atraia mais alunos para a sua escola! Nosso assistente te ajuda a criar campanhas de marketing eficazes e a divulgar sua escola nas redes sociais.',
    category: AssistantCategories.MARKETING,
  },
  {
    name: 'Campanhas de matrículas',
    id: 'asst_cjOar7y4FgiGMolqWDNJNdYF',
    icon: School,
    description:
      'Simplifique o processo de matrículas! Nosso assistente automatiza tarefas e te ajuda a acompanhar as inscrições de novos alunos.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Indicadores e métricas',
    id: 'asst_janCE9NA0E3W3KjiWnVHwVke',
    icon: Chart,
    description:
      'Acompanhe o desempenho da sua escola em tempo real! Nosso assistente gera relatórios personalizados com indicadores e métricas importantes.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Treinamento e desenvolvimento',
    id: 'asst_14bc1179HDPINmj82GTFnTy7',
    icon: Mortar,
    description:
      'Invista no desenvolvimento da sua equipe! Nosso assistente oferece cursos e materiais de treinamento online, personalizados para cada profissional.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Suporte às Famílias',
    id: 'asst_GzCy9DRDTtVBs5yRJlCdv2JB',
    icon: Family,
    description:
      'Fortaleça a parceria com as famílias! Nosso assistente facilita a comunicação entre escola e família, oferecendo informações e recursos importantes.',
    category: AssistantCategories.OTHERS,
  },
  {
    name: 'Finanças escolares',
    id: 'asst_QPhmSoTQ3pdsQB6qGNYDMQWf',
    icon: Seeding,
    description:
      'Gerencie as finanças da sua escola com mais eficiência! Nosso assistente automatiza processos e te ajuda a tomar decisões mais assertivas.',
    category: AssistantCategories.FINANCIAL,
  },
  {
    name: 'Infraestrutura escolar',
    id: 'asst_0WPz9V8mJDfoz2v67J8yZqPM',
    icon: Hammer,
    description:
      'Melhore a infraestrutura da sua escola! Nosso assistente te ajuda a identificar as necessidades de manutenção e a encontrar soluções mais eficientes.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Conformidade Legal e Regulatória',
    id: 'asst_rXm14szis6bnAieni6pGbrED',
    icon: Scales,
    description:
      'Esteja em conformidade com a legislação! Nosso assistente te mantém atualizado sobre as novas leis e regulamentações, garantindo a segurança jurídica da sua escola.',
    category: AssistantCategories.LEGAL,
  },
  {
    name: 'Prevenção de evasão escolar',
    id: 'asst_XLKWtxh2eyCcfKW1AWQ6IyY5',
    icon: Mag,
    description:
      'Mantenha seus alunos engajados! Nosso assistente identifica alunos em risco de evasão e oferece suporte personalizado para cada um',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Inovação e tecnologia educacional',
    id: 'asst_DGlq0L4Lz9Dg4sQf52OwvupE',
    icon: Blub,
    description:
      'Inove na sua escola! Nosso assistente te ajuda a implementar novas tecnologias em sala de aula, transformando a experiência de aprendizado.',
    category: AssistantCategories.OTHERS,
  },
  {
    name: 'LGPD e Cibersegurança',
    id: 'asst_Ele65h1pU4KiXsntuAONAXtV',
    icon: Lock,
    description:
      'Proteja os dados dos seus alunos! Nosso assistente garante a conformidade com a LGPD e te ajuda a implementar medidas de segurança cibernética.',
    category: AssistantCategories.OTHERS,
  },
  {
    name: 'Mediação de conflitos e clima escola',
    id: 'asst_Fkf8XOy9fBQMTwx496LWVH0Z',
    icon: Balloon,
    description:
      'Promova um clima escolar positivo! Nosso assistente te ajuda a mediar conflitos e a construir um ambiente mais colaborativo.',
    category: AssistantCategories.OTHERS,
  },
  {
    name: 'Sustentabilidade',
    id: 'asst_77fz8mJ39A6gytDga59AuBQ3',
    icon: Americas,
    description:
      'Eduque para a sustentabilidade! Nosso assistente oferece recursos e atividades para promover a educação ambiental na sua escola.',
    category: AssistantCategories.OTHERS,
  },
  {
    name: 'Cultura e engajamento escolar',
    id: 'asst_nDL2YClavGiYlUGVbFwMdxrL',
    icon: Arts,
    description:
      'Fortaleça a cultura da sua escola! Nosso assistente te ajuda a organizar eventos e atividades que promovam o engajamento da comunidade escolar.',
    category: AssistantCategories.MANAGEMENT,
  },
  {
    name: 'Planejamento estratégico escolar',
    id: 'asst_RriEJ4ARovtgi7a87XAhpw1t',
    icon: ChartUp,
    description:
      'Planeje o futuro da sua escola! Nosso assistente te ajuda a elaborar um plano estratégico eficaz, alinhado com as metas da sua instituição.',
    category: AssistantCategories.MANAGEMENT,
  },
]
