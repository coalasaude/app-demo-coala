import { Dispatch, SetStateAction } from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { RecordsPath } from '@/types/records'
import { CRadioButtonGroup } from '@/v3/presentation/newComponents/molecules/CRadioButtonGroup'

export const PathForm = ({ setPath }: { setPath: Dispatch<SetStateAction<RecordsPath>> }) => {
  return (
    <GridWrapper>
      <GridItem>
        <CRadioButtonGroup
          name='path'
          defaultValue={RecordsPath.MEDICAL_RECORD}
          onChange={(e, value) => {
            setPath(value as RecordsPath)
          }}
          options={[
            {
              value: RecordsPath.MEDICAL_RECORD,
              label: 'Pronto atendimento',
            },
            {
              value: RecordsPath.PRESCRIPTION,
              label: 'Receituário',
            },
            {
              value: RecordsPath.SICK_NOTE,
              label: 'Atestado',
            },
            {
              value: RecordsPath.REPORT,
              label: 'Relatório',
            },
            {
              value: RecordsPath.EXAM,
              label: 'Exame',
            },
            {
              value: RecordsPath.ATTACHMENT,
              label: 'Anexo',
            },
          ]}
        />
      </GridItem>
    </GridWrapper>
  )
}

export default PathForm
