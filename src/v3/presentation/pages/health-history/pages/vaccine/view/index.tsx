import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { spacing } from '@/utils/spacing'
import { CardTextDownload } from '@/v3/presentation/components/CardText/CardTextDownload'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useFetchReadUserVaccine } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useFetchReadUserVaccine'
import { CDisplayRecord, PageHeader } from '@/v3/presentation/newComponents'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

export const VaccineViewPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const vaccineId = router.query.id as string

  const { user } = useFetchReadUser({ userId: userId })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const { vaccine } = useFetchReadUserVaccine({ userId, vaccineId: Number(vaccineId) })

  const handleAdd = () => {
    if (vaccine?.id) {
      router.push(
        bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.VACCINE.EDIT.path}`, {
          userId,
          id: vaccine?.id,
        })
      )
    }
  }

  return (
    <Box mx={spacing(2)}>
      {!vaccine ? (
        <ViewSkeleton />
      ) : (
        <>
          <PageHeader title='Ficha de saúde' />
          <CBaseContainer
            minWidth='280px'
            title='Dados da Vacina'
            onConfirm={handleAdd}
            buttonLabel={canManipulate ? 'Adicionar nova administração' : undefined}
          >
            <GridWrapper>
              <GridItem xs={12}>
                <GridWrapper>
                  <GridItem xs={12}>
                    <GridWrapper>
                      <GridItem xs={12} md={6}>
                        <CDisplayRecord label='Nome da Vacina' value={vaccine.name} withDivider />
                      </GridItem>
                      <GridItem xs={0} md={6} />
                    </GridWrapper>
                  </GridItem>
                  <GridItem xs={12}>
                    <GridWrapper>
                      <GridItem xs={6} md={3}>
                        <CDisplayRecord
                          withDivider
                          label='Doses'
                          value={
                            vaccine.vaccineDosage.length > 0 ? (
                              <Box flex='row'>
                                {Array.from({ length: vaccine.vaccineDosage.length }).map(
                                  (_, i) => (
                                    <CheckCircleOutlineIcon key={i} color='success' />
                                  )
                                )}
                              </Box>
                            ) : (
                              ''
                            )
                          }
                        />
                      </GridItem>
                      <GridItem xs={6} md={3}>
                        <CDisplayRecord
                          withDivider
                          label='Reforços'
                          value={
                            vaccine.vaccineReinforcement.length > 0 ? (
                              <Box flex='row'>
                                {Array.from({
                                  length: vaccine.vaccineReinforcement.length,
                                }).map((_, i) => (
                                  <CheckCircleOutlineIcon key={i} color='success' />
                                ))}
                              </Box>
                            ) : (
                              ''
                            )
                          }
                        />
                      </GridItem>
                      <GridItem xs={0} md={6} />
                    </GridWrapper>
                  </GridItem>
                </GridWrapper>
              </GridItem>
              <GridItem xs={12}>
                <Typography mb={spacing(2)} variant='h4' fontWeight='bold'>
                  Dose
                </Typography>
                <GridWrapper>
                  {vaccine.vaccineDosage.map((dosage, i) => (
                    <GridItem xs={4} key={dosage.id}>
                      <CDisplayRecord
                        label={`${i + 1}º dose`}
                        value={dayjs(dosage.dosageDate).format('DD/MM/YYYY')}
                        withDivider
                      />
                    </GridItem>
                  ))}
                </GridWrapper>
              </GridItem>
              {vaccine.vaccineReinforcement.length > 0 && (
                <GridItem xs={12}>
                  <Typography mb={spacing(2)} variant='h4' fontWeight='bold'>
                    Reforço
                  </Typography>
                  <GridWrapper>
                    {vaccine.vaccineReinforcement.map((reinforcement, i) => (
                      <GridItem xs={4} key={reinforcement.id}>
                        <CDisplayRecord
                          label={`${i + 1}º dose`}
                          value={dayjs(reinforcement.reinforcementDate).format('DD/MM/YYYY')}
                          withDivider
                        />
                      </GridItem>
                    ))}
                  </GridWrapper>
                </GridItem>
              )}
              {vaccine?.documents?.map?.((document) => (
                <GridItem xs={12} md={6} key={document.fileName}>
                  <CardTextDownload
                    withDivider
                    label='Comprovante de vacinação'
                    url={document?.url || ''}
                    filename={document?.formattedName || ''}
                  />
                </GridItem>
              ))}
            </GridWrapper>
          </CBaseContainer>
        </>
      )}
    </Box>
  )
}
