import { Box } from '@mui/material'
import { get, throttle } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { CAutoComplete, CSelectControlled, CDatePickerControlled } from '@/components/Forms'
import { CDivider, CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import {
  UserContactOptions,
  MeansContactOptions,
  TypeAssistanceOptions,
  PatientEvolutionOptions,
  WholiberedOptions,
  AdherenceToTreatmentOptions,
} from '@/constants/followUp'
import { User } from '@/v3/domain/User'
import { UserContact } from '@/v3/domain/follow-up'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import { useFetchUser } from '@/v3/presentation/hooks/useFetchUser'
import { Appointment } from '@/v3/domain/Appointment'
import { useFetchProfile } from '@/v3/presentation/hooks/useFetchProfile'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const FollowUpForm = ({
  error,
  appointmentData,
}: {
  error?: string
  appointmentData?: Appointment
}) => {
  const { apiRequest: apiRequestProfile, data: profiles } = useFetchProfile()
  const [onlyCollaboratorList, setOnlyCollaboratorList] =
    useState<{ value: string; label: string }[]>()
  const { apiRequest: apiRequestGetAllCollaborators, users: allCollaboratorsData } = useFetchUser()
  const [collaboratorFilter, setCollaboratorFilter] = useState<string>()

  const { watch, setValue } = useFormContext()
  const [faceToFaceAssistence, userMadeContact, beingMonitored, successfulContact] = watch([
    'face_to_face_assistance',
    'user_made_contact',
    'being_monitored',
    'successful_contact',
  ])
  const isSuccessfulContact = successfulContact === 'true'

  useEffect(() => {
    apiRequestProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const collaboratorId = profiles.find((p) => p.name === 'Colaborador')?.id

    if (collaboratorId && appointmentData?.institutionId) {
      apiRequestGetAllCollaborators({
        institution_id: String(appointmentData?.institutionId || appointmentData?.institution?.id),
        search_name: collaboratorFilter,
        profile_id: String(collaboratorId),
      })
      return
    }
  }, [
    apiRequestGetAllCollaborators,
    appointmentData?.institution?.id,
    appointmentData?.institutionId,
    collaboratorFilter,
    profiles,
  ])

  useEffect(() => {
    setOnlyCollaboratorList(
      allCollaboratorsData?.map((collaborator) => ({
        value: String(collaborator.id),
        label: collaborator.getFormattedName() || '',
      })),
    )
  }, [allCollaboratorsData])

  const doCollaboratorFilter = useMemo(
    () => throttle((value) => setCollaboratorFilter(value), 1500),
    [setCollaboratorFilter],
  )

  return (
    <>
      <Box my={3}>
        <GridWrapper>
          <GridItem xs={12} md={4}>
            <CSelectControlled
              name='means_contact'
              label='Por qual meio o contato foi feito?*'
              options={MeansContactOptions}
              error={get(error, 'data.means_contact')}
            />
          </GridItem>
        </GridWrapper>
        <Box pt={2} />
        <GridWrapper>
          <GridItem xs={12}>
            <CRadioButtonGroupControlled
              name='user_made_contact'
              label='Com quem fez o contato?*'
              options={UserContactOptions}
              error={get(error, 'data.user_made_contact')}
            />
          </GridItem>
        </GridWrapper>
        <Box pt={2} />
        <GridWrapper>
          {userMadeContact === UserContact.RESPONSIBLE && (
            <GridItem xs={12} md={6}>
              <CAutoComplete
                name='user_id'
                label='Responsável*'
                options={
                  appointmentData?.patient.responsable?.map(({ id, name, lastname }) => ({
                    value: id,
                    label: User.formatName(name || '', lastname || ''),
                  })) || []
                }
                onInputChange={(e, value, reason) => {
                  if (reason === 'input') setValue('user_id', value)
                }}
                error={get(error, 'data.user_id')}
              />
            </GridItem>
          )}
          {userMadeContact === UserContact.COLLABORATOR && (
            <GridItem xs={12} md={6}>
              <CAutoComplete
                name='user_id'
                label='Nome*'
                options={onlyCollaboratorList || []}
                onChange={(e, value) => setValue('user_id', value)}
                onInputChange={(e, value, reason) => {
                  if (reason === 'input') {
                    doCollaboratorFilter(value)
                  }
                }}
                error={get(error, 'data.user_id')}
              />
            </GridItem>
          )}
          {userMadeContact === UserContact.OTHER && (
            <>
              <GridItem xs={12} md={6}>
                <CInputControlled
                  placeholder='Digite o nome*'
                  name='user_without_access'
                  label='Nome*'
                  error={get(error, 'data.user_without_access')}
                />
              </GridItem>
              <GridItem xs={12} md={3}>
                <CInputControlled
                  variant='outlined'
                  placeholder='Digite quem é'
                  name='who_is'
                  label='Quem é?'
                  error={get(error, 'data.who_is')}
                />
              </GridItem>
              <GridItem xs={12} md={3}>
                <CInputControlled
                  variant='outlined'
                  placeholder='Digite o contato'
                  name='contact'
                  label='Contato'
                  error={get(error, 'data.contact')}
                />
              </GridItem>
            </>
          )}
          <GridItem xs={12} md={3}>
            <CDatePickerControlled
              name='date_of_contact'
              label='Data desse contato*'
              error={get(error, 'data.date_of_contact')}
            />
          </GridItem>
          <GridItem xs={12} md={3}>
            <CTimePickerControlled
              name='time_of_contact'
              label='Horário desse contato*'
              error={get(error, 'data.time_of_contact')}
              data-testid='time_of_contact'
            />
          </GridItem>
          <GridItem xs={12} md={3}>
            <CRadioButtonGroupControlled
              name='successful_contact'
              label='Teve sucesso no contato?*'
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={get(error, 'data.successful_contact')}
            />
          </GridItem>
          <GridItem xs={12} md={4}>
            <CRadioButtonGroupControlled
              name='face_to_face_assistance'
              label='Procurou assistência em saúde presencial?*'
              disabled={!isSuccessfulContact}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={get(error, 'data.face_to_face_assistance')}
            />
          </GridItem>
        </GridWrapper>
        <Box pt={2} />
        {faceToFaceAssistence === 'true' && (
          <GridWrapper>
            <GridItem xs={12} md={4}>
              <CSelectControlled
                name='type_assistance'
                variant='outlined'
                label='Tipo de assistência presencial*'
                options={TypeAssistanceOptions}
                error={get(error, 'data.type_assistance')}
              />
            </GridItem>
            <GridItem xs={12} md={4}>
              <CInputControlled
                name='name_assistance'
                placeholder='Digite o nome*'
                variant='outlined'
                label='Nome*'
                error={get(error, 'data.name_assistance')}
              />
            </GridItem>
            <GridItem xs={4} md={4}>
              <CInputControlled
                name='contact_assistance'
                placeholder='Digite o contato'
                variant='outlined'
                label='Contato'
                error={get(error, 'data.contact_assistance')}
              />
            </GridItem>
          </GridWrapper>
        )}
        <Box pt={2} />
        <GridWrapper>
          <GridItem xs={12} md={4}>
            <CRadioButtonGroupControlled
              name='change_conduct'
              label='Houve alteração de conduta?*'
              disabled={!isSuccessfulContact}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={get(error, 'data.change_conduct')}
            />
          </GridItem>
        </GridWrapper>
        <Box pt={2} />
        <GridWrapper>
          <GridItem xs={12} md={12}>
            <CInputControlled
              name='detail'
              variant='outlined'
              placeholder='Digite o detalhamento*'
              label='Detalhamento'
              error={get(error, 'data.detail')}
            />
          </GridItem>
          {isSuccessfulContact && (
            <>
              <GridItem xs={12} md={4}>
                <CRadioButtonGroupControlled
                  name='patient_evolution'
                  label='Qual a evolução do paciente?*'
                  disabled={!isSuccessfulContact}
                  options={PatientEvolutionOptions}
                  error={get(error, 'data.patient_evolution')}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CRadioButtonGroupControlled
                  name='adherence_to_treatment'
                  label='Adesão ao tratamento'
                  options={AdherenceToTreatmentOptions}
                  error={get(error, 'data.adherence_to_treatment')}
                />
              </GridItem>
            </>
          )}
          <GridItem xs={12} md={8}>
            <CRadioButtonGroupControlled
              name='being_monitored'
              label='Segue em acompanhamento?*'
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={get(error, 'data.being_monitored')}
            />
          </GridItem>
        </GridWrapper>
        <Box pt={2} />
        {beingMonitored !== 'true' && (
          <GridWrapper>
            <GridItem xs={12}>
              <CRadioButtonGroupControlled
                name='who_libered'
                label='Liberado por quem?*'
                options={WholiberedOptions}
                error={get(error, 'data.who_libered')}
              />
            </GridItem>
            <GridItem xs={12}>
              <CInputControlled
                name='outcome'
                variant='outlined'
                placeholder='Digite o desfecho*'
                label='Desfecho'
                error={get(error, 'data.outcome')}
              />
            </GridItem>
          </GridWrapper>
        )}
        {beingMonitored === 'true' && (
          <GridWrapper>
            <GridItem xs={12} md={3}>
              <CDatePickerControlled
                name='date_next_contact'
                label='Data do próximo contato*'
                error={get(error, 'data.date_next_contact')}
              />
            </GridItem>
            <GridItem xs={12} md={3}>
              <CTimePickerControlled
                name='time_next_contact'
                label='Horário do próximo  contato*'
                error={get(error, 'data.time_next_contact')}
                data-testid='time_next_contact'
              />
            </GridItem>
          </GridWrapper>
        )}
        <CDivider sx={{ borderBottomWidth: 1, paddingTop: 4, marginLeft: 2 }} />
      </Box>
    </>
  )
}

export default FollowUpForm
