import { StraightenOutlined } from '@mui/icons-material'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined'
import { Box, useMediaQuery as mUseMediaQuery, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { bindPathParams } from '@/utils/bindParams'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { useFetchBrowseBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useFetchBrowseBodyMass'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { CAvatar, CTooltip } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'

import { AllergyModal } from '../AllergyModal'
import { UserModal } from '../UserModal'

interface CHeaderAppointmentProps {
  appointment: AppointmentReadDataModel
  canEdit: boolean
  refetchAppointment?: () => void
}

export const AppointmentHeaderUserData = ({
  appointment,
  canEdit,
  refetchAppointment,
}: CHeaderAppointmentProps) => {
  const isMobile = useMediaQuery('sm')
  const isDesktop = mUseMediaQuery('(min-width:1280px)')
  const [showAllergyModal, setShowUserAllergyModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const patientId = appointment?.patient?.id ? appointment.patient.id : -1

  const { bodyMass } = useFetchBrowseBodyMass({ userId: patientId })
  const { user } = useFetchReadUser({ userId: patientId })

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const onCloseUserAllergyModal = (options?: { shouldRefetch?: boolean }) => {
    setShowUserAllergyModal(false)
    setAnchorEl(null)
    if (options?.shouldRefetch) refetchAppointment?.()
  }

  const onCloseUserModal = () => {
    setShowUserModal(false)
    setAnchorEl(null)
  }

  const navigateToUserRouter = (id?: number) =>
    WebViewManager.open(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
        userId: String(id),
      }),
      '_blank',
    )

  const navigateToUpdatePatient = (id?: number) => {
    if (!id) return null

    const url = bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.EDIT.path, {
      id: String(id),
    })

    WebViewManager.open(url, '_blank')
  }

  const onHeaderPatientClick = () => {
    if (appointment?.patient?.id) return navigateToUserRouter(appointment.patient?.id)
    if (canEdit) return navigateToUpdatePatient(appointment.id)
  }

  const patientGenre = appointment?.patient?.genre ? appointment?.patient?.genre : ''
  const patientBirthday = appointment?.patient?.birthday
    ? ' | ' + appointment.getPatientAgeText()
    : ''
  const profileNames =
    Number(appointment?.patient?.profileNames?.length) > 0
      ? ' | ' + appointment?.patient?.getPatientRole()
      : ''
  const patientSubtitle = patientGenre + patientBirthday + profileNames
  const iconStyles = { height: 18, width: 20 }
  const userMedicineAllergyName = appointment.patient?.getPatientAllergies()
  const allertAllergy = userMedicineAllergyName || appointment.patient?.deniesAllergies
  const bodyMassData = bodyMass?.data?.sort((a, b) => b.id - a.id)[0]
  const getFormattedWeight = bodyMassData?.getFormattedWeight() || '-'
  const getFormattedHeightWithUnit = bodyMassData?.getFormattedHeightWithUnit() || '-'
  const getFormattedMeasureDateAndDays = bodyMassData?.getFormattedMeasureDateAndDays() || '-'
  const getWeightMinimumWeight = appointment?.patient?.getWeightMinimumEstimatedWeight()
  const patientImageUrl = user?.image?.url || ''
  const canClick = canEdit && appointment?.patient

  return (
    <GridWrapper alignItems='center' spacing={0}>
      <GridItem xs={12}>
        <Stack direction='row' gap={1} alignItems='center'>
          <CAvatar
            size='extraLarge'
            type={patientImageUrl ? 'photo' : 'initials'}
            name={appointment?.getPatientFullName() || 'Paciente não definido'}
            imageUrl={patientImageUrl}
          />
          <Stack direction='column' gap={1} width='100%'>
            <Stack
              direction='row'
              alignItems='center'
              gap={1}
              onClick={onHeaderPatientClick}
              sx={{ cursor: 'pointer' }}
              width='fit-content'
            >
              <Typography variant='h5' display='block'>
                {appointment?.getPatientFullName() || 'Paciente não definido'}
              </Typography>
              <OpenInNewOutlinedIcon
                fontSize='small'
                style={{ color: 'var(--mui-palette-grey-500)' }}
              />
            </Stack>

            {(appointment?.patient?.genre || appointment?.patient?.birthday) && (
              <Typography variant='body2'>{patientSubtitle}</Typography>
            )}
            <Stack direction='row' gap={2}>
              <CTooltip
                description={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `Peso: ${getFormattedWeight}<br/>
                  Altura: ${getFormattedHeightWithUnit}<br/>
                  Atualização: ${getFormattedMeasureDateAndDays}<br/>
                  Peso mínimo estimado: ${getWeightMinimumWeight || '-'}`,
                    }}
                  />
                }
                placement='bottom'
              >
                <Box display='flex'>
                  <Box
                    display='flex'
                    onClick={(e) => {
                      if (!canClick) return
                      e.stopPropagation()
                      setShowUserModal(!showAllergyModal)
                      handleClick(e)
                    }}
                    sx={{
                      cursor: canClick ? 'pointer' : 'default',
                      '&:hover': {
                        textDecoration: canClick ? 'underline' : 'none',
                      },
                    }}
                  >
                    <StraightenOutlined
                      style={{ fill: 'var(--mui-palette-grey-500)', ...iconStyles }}
                    />
                    {bodyMassData ? (
                      <>
                        <Stack direction='row' alignItems='center'>
                          <Typography
                            ml={0.5}
                            variant='caption'
                            color='var(--mui-palette-grey-500)'
                          >
                            {bodyMassData?.getFormattedWeight() || '-'}
                          </Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center'>
                          <Typography
                            mx={0.5}
                            variant='caption'
                            color='var(--mui-palette-grey-500)'
                          >
                            {'|'}
                          </Typography>
                          <Typography variant='caption' color='var(--mui-palette-grey-500)'>
                            {bodyMassData?.getFormattedHeightWithUnit() || '-'}
                          </Typography>
                        </Stack>
                      </>
                    ) : (
                      <Stack direction='row' alignItems='center'>
                        <Typography variant='caption' color='var(--mui-palette-grey-500)'>
                          Sem informação
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                </Box>
              </CTooltip>

              <Stack
                direction='row'
                alignItems='center'
                flex={1}
                maxWidth={isMobile ? '20%' : isDesktop ? '25%' : '20%'}
              >
                <CTooltip description={`Alergias: ${userMedicineAllergyName || '-'}`}>
                  <Box
                    display='flex'
                    onClick={(e) => {
                      if (!canClick) return
                      e.stopPropagation()
                      setShowUserAllergyModal(!showAllergyModal)
                      handleClick(e)
                    }}
                    sx={{
                      cursor: canClick ? 'pointer' : 'default',
                      '&:hover': {
                        textDecoration: canClick ? 'underline' : 'none',
                      },
                    }}
                  >
                    <ReportGmailerrorredOutlinedIcon
                      style={{
                        fill: allertAllergy
                          ? 'var(--mui-palette-error-main)'
                          : 'var(--mui-palette-grey-500)',
                        ...iconStyles,
                      }}
                    />
                    <Typography
                      flex={1}
                      variant='body2'
                      color={
                        allertAllergy
                          ? 'var(--mui-palette-error-main)'
                          : 'var(--mui-palette-grey-500)'
                      }
                      whiteSpace='nowrap'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      maxWidth={100}
                    >
                      {userMedicineAllergyName || '-'}
                    </Typography>
                  </Box>
                </CTooltip>
              </Stack>

              {showAllergyModal && appointment?.patient?.id && (
                <AllergyModal
                  id={appointment.patient.id}
                  onClose={onCloseUserAllergyModal}
                  isOpen={showAllergyModal}
                  anchorEl={anchorEl}
                />
              )}

              {showUserModal && appointment?.patient?.id && (
                <UserModal
                  id={appointment.patient.id}
                  onClose={onCloseUserModal}
                  isOpen={showUserModal}
                  anchorEl={anchorEl}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
      </GridItem>
    </GridWrapper>
  )
}
