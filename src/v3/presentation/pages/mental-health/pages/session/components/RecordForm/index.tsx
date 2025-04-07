import { Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import Router from 'next/router'
import { throttle } from 'lodash'

import { CDivider } from '@/v3/presentation/newComponents'
import { CAutoComplete } from '@/components/Forms'
import { useFetchUser } from '@/v3/presentation/hooks/useFetchUser'
import { useFetchProfile } from '@/v3/presentation/hooks/useFetchProfile'
import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'

import {
  AddMentalHealthRecordPayload,
  RecordUserPayload,
  useFetchMentalHealth,
} from '../../../../hooks/useFetchMentalHealth'
import { ModalCertificate } from '../ModalCertificate'

import {
  FormWrapper,
  StyledButtonsWrapper,
  StyledSwitchWrapper,
  StyledCTextAreaControlled,
} from './styles'

export const RegisterForm = ({
  studentId,
  scheduleId,
  appointmentId,
  institutionId,
}: {
  studentId?: number
  scheduleId?: number
  appointmentId?: number
  institutionId?: number
}) => {
  const { watch, setValue, formState } = useFormContext()
  const [responsibleIds, setResponsibleIds] = useState<{ label: string; value: string }[]>([])
  const { apiRequest: apiRequestGetAllCollaborators, users: allCollaboratorsData } = useFetchUser()
  const { getUserById: apiRequestGetStudent, user: studentData } = useFetchUser()
  const { apiRequest: apiRequestProfile, data: profiles } = useFetchProfile()
  const { addMentalHealthRecord } = useFetchMentalHealth()
  const [showModal, setShowModal] = useState(false)
  const [collaboratorFilter, setCollaboratorFilter] = useState<string>()
  const [onlyCollaboratorList, setOnlyCollaboratorList] =
    useState<{ value: string; label: string }[]>()

  const [toStudent, toResponsible, toCollaborator, collaboratorId, description, certificatePass] =
    watch([
      'toStudent',
      'toResponsible',
      'toCollaborator',
      'collaboratorId',
      'description',
      'certificatePass',
    ])

  useEffect(() => {
    const profileId = profiles.find((profile) => profile.name === 'Colaborador')?.id
    if (institutionId && profileId) {
      apiRequestGetAllCollaborators({
        institution_id: String(institutionId),
        profile_id: String(profileId),
        search_name: collaboratorFilter,
      })
      return
    }
  }, [profiles, apiRequestGetAllCollaborators, institutionId, collaboratorFilter])

  useEffect(() => {
    setOnlyCollaboratorList(
      allCollaboratorsData?.map((collaborator) => ({
        value: String(collaborator.id),
        label: collaborator.getFormattedName() || '',
      })),
    )
  }, [allCollaboratorsData])

  useEffect(() => {
    if (studentId) {
      apiRequestGetStudent(studentId)
      return
    }
  }, [studentId, apiRequestGetStudent])

  useEffect(() => {
    apiRequestProfile()
  }, [apiRequestProfile])

  const handleSubmit = async () => {
    const users: RecordUserPayload[] = []
    if (toStudent && studentId) {
      users.push({ id: studentId, type: 'CHILDREN' })
    }
    if (toResponsible) {
      users.push(
        ...responsibleIds.map((e) => {
          return { id: Number(e.value), type: 'RESPONSIBLE' as const }
        }),
      )
    }
    if (toCollaborator) {
      users.push({
        id: collaboratorId,
        type: 'COLLABORATOR',
      })
    }

    if (scheduleId && appointmentId) {
      const payload: AddMentalHealthRecordPayload = {
        status: toResponsible || toStudent || toCollaborator ? 'EXTERNAL' : 'INTERNAL',
        description,
        scheduleId,
        certification_password: certificatePass,
        appointment_id: appointmentId,
      }
      if (users.length > 0) {
        payload.users = users
      }

      await addMentalHealthRecord(payload)
    }
  }

  const doCollaboratorFilter = useMemo(
    () => throttle((value) => setCollaboratorFilter(value), 1500),
    [setCollaboratorFilter],
  )

  return (
    <>
      <FormWrapper>
        <h1>Novo Registro</h1>
        <h2>Configuração de visualização do registro:</h2>
        <StyledSwitchWrapper>
          <CSwitch name='toStudent' onChange={(e) => setValue('toStudent', e.target.checked)} />
          Aluno
        </StyledSwitchWrapper>
        <StyledSwitchWrapper>
          <CSwitch
            name='toResponsible'
            onChange={(e) => setValue('toResponsible', e.target.checked)}
          />
          Responsável
        </StyledSwitchWrapper>
        <CAutoComplete
          sx={{ maxWidth: '500px', display: toResponsible ? 'block' : 'none' }}
          name='responsibleIds'
          options={
            studentData?.responsible?.map((responsible) => ({
              value: responsible.id,
              label: responsible.getFormattedName(),
            })) || []
          }
          multiple
          onChange={(e, value) => setResponsibleIds(value)}
          label='Selecione o responsável'
        />
        <StyledSwitchWrapper>
          <CSwitch
            name='toCollaborator'
            onChange={(e) => setValue('toCollaborator', e.target.checked)}
          />
          Colaborador
        </StyledSwitchWrapper>
        <CAutoComplete
          sx={{ maxWidth: '500px', display: toCollaborator ? 'block' : 'none' }}
          name='collaboratorId'
          options={onlyCollaboratorList || []}
          onChange={(e, value) => setValue('collaboratorId', value)}
          label='Selecione o colaborador'
          onInputChange={(e, value, reason) => {
            if (reason === 'input') {
              doCollaboratorFilter(value)
            }
          }}
        />
        <CDivider />
        <StyledCTextAreaControlled
          id='outlined-multiline-static'
          label='Descrição do registro'
          placeholder='Digite a descrição do registro'
          name='description'
          variant='outlined'
        />
        <CDivider />
        <StyledButtonsWrapper>
          <Button variant='outlined' onClick={() => Router.back()}>
            Cancelar
          </Button>
          <Button onClick={() => setShowModal(true)} disabled={!formState.isDirty}>
            Adicionar
          </Button>
        </StyledButtonsWrapper>
      </FormWrapper>
      <ModalCertificate
        open={showModal}
        isLoading={false}
        onClose={() => {
          setShowModal(false)
        }}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
