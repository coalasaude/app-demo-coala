import { Grid } from '@mui/material'

import {
  CAccordion,
  CAccordionList,
  CAccordionBody,
  CDisplayRecord,
} from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { CardTextDownload } from '@/v3/presentation/components/CardText/CardTextDownload'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { UserInfoSection } from '../UserInfoSection'

import { UserInfoHealthInsuranceProps } from './types'

export const UserInfoHealthInsurance = ({
  healthInsurances,
  onAdd,
  onDelete,
  isLoading,
}: UserInfoHealthInsuranceProps) => {
  const { handleModal } = useModalContext()

  const handleOpenModal = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => onDelete(id)}
        title='Excluir Convênio'
        description='Tem certeza que deseja excluir esse convênio?'
      />,
    )
  }

  return (
    <UserInfoSection title='Convênios' onEdit={onAdd} variant='text'>
      <CAccordionList
        numColumnsMobile={1}
        numColumnsDesktop={2}
        options={healthInsurances}
        renderItem={(props) => (
          <CAccordion
            title={props.insuranceCompany || ''}
            subtitle={'Validade: ' + props.getFormattedValidUntil()}
          >
            <CAccordionBody
              secondaryButton={<DeleteIconButton onDelete={() => handleOpenModal(props.id)} />}
              loadingSecondaryButton={isLoading}
            >
              <Grid container spacing={2} px={0} py={2}>
                <Grid item xs={12} xl={4}>
                  <CDisplayRecord withDivider label='Código' value={props.code} />
                </Grid>
                <Grid item xs={12} xl={4}>
                  <CDisplayRecord withDivider label='Plano' value={props.plan} />
                </Grid>
                <Grid item xs={12} xl={4}>
                  <CardTextDownload
                    withDivider
                    label='Comprovante de convênio'
                    url={props.document?.url}
                    filename={props.getFileName()}
                  />
                </Grid>
              </Grid>
            </CAccordionBody>
          </CAccordion>
        )}
      />
      {healthInsurances.length === 0 && (
        <NotFound text='Não existem convênios cadastrados' mt={3} mb={2} />
      )}
    </UserInfoSection>
  )
}
