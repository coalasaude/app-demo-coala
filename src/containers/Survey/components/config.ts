import VerySatisfied from '/public/assets/svg/Survey/VerySatisfied.svg'
import VeryUnsatisfied from '/public/assets/svg/Survey/VeryUnsatisfied.svg'
import Dissatisfied from '/public/assets/svg/Survey/Dissatisfied.svg'
import Indifferent from '/public/assets/svg/Survey/Indifferent.svg'
import Satisfied from '/public/assets/svg/Survey/Satisfied.svg'

export const SurveyConfig = [
  {
    name: 'Muito satisfeito(a)',
    image: VerySatisfied,
    id: 5,
  },
  {
    name: 'Satisfeito(a)',
    image: Satisfied,
    id: 4,
  },
  {
    name: 'Indiferente',
    image: Indifferent,
    id: 3,
  },
  {
    name: 'Insatisfeito(a)',
    image: Dissatisfied,
    id: 2,
  },
  {
    name: 'Muito insatisfeito(a)',
    image: VeryUnsatisfied,
    id: 1,
  },
]
