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

export const Financial = ({ data, canEdit }: Props) => {
  return (
    <Section.Container p={2}>
      <Section.Title
        content='Dados financeiros'
        icon={canEdit && <EditButton healthUnitId={data?.id} section={EditSections.FINANCIAL} />}
      />

      <Section.Group>
        <GridWrapper>
          <GridItem xs={6} sm={4}>
            <CDisplayRecord
              value={data?.financial?.appointmentAveragePrice}
              label='Custo médio da consulta'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={8} sm={4}>
            <CDisplayRecord
              value={data?.financial?.responsibleFinance}
              label='Responsável pelo financeiro/NFEs'
              withDivider={false}
            />
          </GridItem>
          <GridItem xs={7} sm={4}>
            <CDisplayRecord
              withDivider={false}
              value={data?.financial?.formattedPaymentMethod}
              label='Formas de pagamento aceitas'
            />
          </GridItem>
        </GridWrapper>
      </Section.Group>

      <Section.Group>
        <GridWrapper>
          <GridItem xs={6} sm={3}>
            <CDisplayRecord withDivider={false} value={data?.financial?.bank?.name} label='Banco' />
          </GridItem>
          <GridItem xs={6} sm={3}>
            <CDisplayRecord
              withDivider={false}
              value={data?.financial?.bank?.branch}
              label='Agência'
            />
          </GridItem>
          <GridItem xs={6} sm={3}>
            <CDisplayRecord
              withDivider={false}
              value={data?.financial?.bank?.account}
              label='Conta'
            />
          </GridItem>
          <GridItem xs={6} sm={3}>
            <CDisplayRecord withDivider={false} value={data?.financial?.pixKey} label='Pix' />
          </GridItem>
        </GridWrapper>
      </Section.Group>
    </Section.Container>
  )
}
