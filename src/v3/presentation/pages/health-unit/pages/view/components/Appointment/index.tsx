import { GridItem, GridWrapper } from '@/components/Grid'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { HealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/health-unit.model'

import * as Section from '../Section'
import { formatBoolean } from '../../../../utils/formatters'
import { EditSections } from '../../../../components/Form/Steps'
import { EditButton } from '../EditButton/EditButton'

type Props = {
  canEdit?: boolean
  data?: HealthUnitModel
}

export const Appointment = ({ data, canEdit }: Props) => {
  return (
    <Section.Container p={2}>
      <Section.Title
        content='Informações de Atendimento'
        icon={canEdit && <EditButton healthUnitId={data?.id} section={EditSections.SERVICES} />}
      />

      <Section.Group>
        <GridWrapper>
          <GridItem xs={7} sm={4}>
            <CDisplayRecord
              value={formatBoolean(data?.appointment?.doSutures)}
              label='A unidade realiza sutura?'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={7} sm={4}>
            <CDisplayRecord
              value={formatBoolean(data?.appointment?.doMedication)}
              label='A unidade realiza medicação?'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={7} sm={4}>
            <CDisplayRecord
              value={formatBoolean(data?.appointment?.doSurgery)}
              label='A unidade realiza cirurgia?'
              withDivider={false}
            />
          </GridItem>
        </GridWrapper>
      </Section.Group>

      <Section.Group>
        <GridWrapper>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={data?.appointment?.formattedImagingExams}
              withDivider={false}
              label='Exames de imagem disponíveis'
            />
          </GridItem>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={data?.appointment?.formattedLaboratoryExams}
              withDivider={false}
              label='Exames laboratoriais disponíveis'
            />
          </GridItem>
        </GridWrapper>
      </Section.Group>

      <Section.Group>
        <GridWrapper>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              withDivider={false}
              value={data?.appointment?.formattedCareUnits}
              label='Unidades de internação'
            />
          </GridItem>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              withDivider={false}
              value={data?.appointment?.formattedImmobilizationTypes}
              label='Tipos de imobilização'
            />
          </GridItem>
        </GridWrapper>
      </Section.Group>
    </Section.Container>
  )
}
