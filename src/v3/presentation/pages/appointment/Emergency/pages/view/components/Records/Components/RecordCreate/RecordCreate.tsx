import { useRouter } from 'next/router'

import RecordCreateSvg from 'public/assets/svg/AppointmentsView/Record-Create.svg'
import { CDisplayFeedback } from '@/v3/presentation/newComponents/layout/CDisplayFeedback'

interface RecordCreateProps {
  url: string
}

export const RecordCreate = ({ url }: RecordCreateProps) => {
  const route = useRouter()
  const addRecord = () => {
    route.push(url)
  }

  return (
    <CDisplayFeedback
      title='Registro gerado!'
      buttonProps={{ onClick: addRecord, children: 'Adicionar novo registro' }}
      subtitle='Você pode visualizar o documento na aba de resumo.'
      align='center'
    >
      <RecordCreateSvg />
    </CDisplayFeedback>
  )
}
