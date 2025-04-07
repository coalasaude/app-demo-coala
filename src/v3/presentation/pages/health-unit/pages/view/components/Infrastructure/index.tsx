import { GridItem, GridWrapper } from '@/components/Grid'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { HealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import * as Section from '../Section'
import { EditSections } from '../../../../components/Form/Steps'
import { EditButton } from '../EditButton/EditButton'

type Props = {
  canEdit?: boolean
  data?: HealthUnitModel
}

export const Infrastructure = ({ data, canEdit }: Props) => {
  const hasTime = data?.infrastructure?.openAt && data?.infrastructure?.closeAt

  return (
    <Section.Container p={2}>
      <Section.Title
        content='Dados de infraestrutura'
        icon={canEdit && <EditButton healthUnitId={data?.id} section={EditSections.OPERATION} />}
      />

      <Section.Group>
        <GridWrapper>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={data?.infrastructure?.formattedPatientType}
              label='Perfil do paciente'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={hasTime ? data?.infrastructure?.formattedTime : '-'}
              label='Horário de funcionamento'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={data?.infrastructure?.formattedCareModality}
              label='Modalidade de atendimento'
              withDivider={false}
            />
          </GridItem>
        </GridWrapper>
      </Section.Group>
      <Section.Group>
        <CDisplayRecord value={data?.infrastructure?.notes} label='Notas' withDivider={false} />
      </Section.Group>
    </Section.Container>
  )
}
