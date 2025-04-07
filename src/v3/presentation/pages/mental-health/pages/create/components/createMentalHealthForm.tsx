import { Button } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'
import { useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

import { CAutoComplete } from '@/components/Forms'
import { useFetchInstitutions } from '@/v3/presentation/hooks/useFetchInstitutions'
import { useFetchUser } from '@/v3/presentation/hooks/useFetchUser'
import { useFetchProfile } from '@/v3/presentation/hooks/useFetchProfile'
import { useLayout } from '@/hooks/useLayout'
import ContentWrapper from '@/v3/presentation/components/layout/ContentWrapper'
import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'

import MentalHealthCalendar from '../../../components/MentalHealthCalendar'
import {
  StyledButtonWrapper,
  StyledDivider,
  StyledInfoSession,
  StyledMyScheduleTitle,
  StyledMyScheduleWrapper,
  StyledParticipantsWrapper,
  StyledScheduleListTitle,
  StyledStudentInfoWrapper,
  StyledSwitchWrapper,
} from '../styles'
import { useMentalHealthContext } from '../../../contexts/mental-health.provider'
import { convertToISO, formatISODateToString, incrementHour } from '../../../utils/date'
import { generateTimeSlots } from '../../../utils/generateTimeSlots'
import { useFetchMentalHealth } from '../../../hooks/useFetchMentalHealth'
import { MentalHealthScheduleStatus } from '../../../../../../domain/api/ApiMentalHealthSchedule'

export default function CreateMentalHealthForm() {
  const { apiRequest: apiRequestInstitutions, data: institutionsData } = useFetchInstitutions()
  const { apiRequest: apiRequestGetAllStudents, users: allStudentsData } = useFetchUser()
  const { apiRequest: apiRequestGetAllCollaborators, users: allCollaboratorsData } = useFetchUser()

  const { getUserById: apiRequestGetStudent, user: studentData } = useFetchUser()

  const {
    addMentalHealthSession,
    getAvailableUsers: apiRequestProf,
    availableUsers: profData,
  } = useFetchMentalHealth()
  const { showSnackBar } = useLayout()

  const { apiRequest: apiRequestProfile, data: profiles } = useFetchProfile()
  const { selectedDate } = useMentalHealthContext()
  const [institutionFilter, setInstitutionFilter] = useState<string>()
  const [userFilter, setUserFilter] = useState<string>()
  const [collaboratorFilter, setCollaboratorFilter] = useState<string>()
  const [profFilter, setProfFilter] = useState<string>()

  const [onlyCollaboratorList, setOnlyCollaboratorList] =
    useState<{ value: string; label: string }[]>()
  const [profOptions, setProfOptions] = useState<{ value: string; label: string }[]>([])
  const [responsibleIds, setResponsibleIds] = useState<{ value: string; label: string }[]>([])
  const { watch, setValue } = useFormContext()
  const [
    institutionId,
    studentId,
    hour,
    toResponsible,
    collaboratorId,
    toStudent,
    typeProfessionalId,
    professionalId,
    toCollaborator,
  ] = watch([
    'institution_id',
    'studentId',
    'hour',
    'toResponsible',
    'collaboratorId',
    'toStudent',
    'typeProfessionalId',
    'professionalId',
    'toCollaborator',
  ])
  const doInstitutionFilter = useMemo(
    () => throttle((value) => setInstitutionFilter(value), 1500),
    [setInstitutionFilter],
  )
  const doUserFilter = useMemo(
    () => throttle((value) => setUserFilter(value), 1500),
    [setUserFilter],
  )

  const doProfFilter = useMemo(
    () => throttle((value) => setProfFilter(value), 1500),
    [setProfFilter],
  )

  useEffect(() => {
    apiRequestProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (institutionFilter) {
      apiRequestInstitutions({ search_name: institutionFilter })
      return
    }
    apiRequestInstitutions()
  }, [apiRequestInstitutions, institutionFilter])

  useEffect(() => {
    const studentId = profiles.find((profile) => profile.name === 'Aluno')?.id
    const collaboratorId = profiles.find((profile) => profile.name === 'Colaborador')?.id

    if (institutionId && studentId && collaboratorId) {
      apiRequestGetAllStudents({
        institution_id: institutionId,
        search_name: userFilter,
        profile_id: String(studentId),
      })
      apiRequestGetAllCollaborators({
        institution_id: institutionId,
        search_name: collaboratorFilter,
        profile_id: String(collaboratorId),
      })
      return
    }
  }, [
    institutionId,
    userFilter,
    profiles,
    apiRequestGetAllStudents,
    apiRequestGetAllCollaborators,
    collaboratorFilter,
  ])

  useEffect(() => {
    if (institutionId && selectedDate && hour) {
      setValue('professionalId', '')
      setProfOptions([])
      apiRequestProf({
        institutionId,
        startFrom: convertToISO(selectedDate, hour) || '',
        startTo: convertToISO(selectedDate, incrementHour(hour, 1)) || '',
        search_name: profFilter,
      })
    }
  }, [institutionId, selectedDate, hour, apiRequestProf, setValue, profFilter])

  useEffect(() => {
    if (studentId) {
      apiRequestGetStudent(studentId)
      return
    }
  }, [apiRequestGetStudent, studentId])

  useEffect(() => {
    if (profData.length && typeProfessionalId) {
      const filteredUsers = profData.filter((userItem) =>
        userItem?.userProfile?.some((profileItem) => profileItem?.profileId === typeProfessionalId),
      )
      const options = filteredUsers.map((user) => ({
        value: String(user.id),
        label: user.getFormattedName() || '',
      }))
      setProfOptions(options)
    }
  }, [profData, typeProfessionalId])

  useEffect(() => {
    setOnlyCollaboratorList(
      allCollaboratorsData?.map((collaborator) => ({
        value: String(collaborator.id),
        label: collaborator.getFormattedName() || '',
      })),
    )
  }, [allCollaboratorsData])

  const profileList = profiles
    .filter((profile) => profile.institutionTypeId === null)
    .map((profile) => ({
      value: profile.id,
      label: profile.name,
    }))
    .filter(
      (profile) =>
        profile.label !== 'Aluno Imaginário' &&
        profile.label !== 'Gestor Trial' &&
        profile.label !== 'Aluno',
    )

  const handleSubmit = () => {
    if (!selectedDate) {
      showSnackBar({
        message: 'Selecione uma data para criar a sessão',
        type: 'error',
      })
      return
    }
    if (!toStudent && !toResponsible && !toCollaborator) {
      showSnackBar({
        message: 'Selecione pelo menos um participante para criar a sessão',
        type: 'error',
      })
      return
    }

    const hourAndMinuts = hour.split(':') || []

    const payload = {
      status: MentalHealthScheduleStatus.Agendada,
      toStudent,
      start: dayjs(selectedDate)
        .set('hours', hourAndMinuts[0])
        .set('minutes', hourAndMinuts[1])
        .set('seconds', 0)
        .toString(),
      collaboratorId: Number(collaboratorId),
      professionalId,
      institutionId,
      studentId,
      responsibleIds: responsibleIds.map((responsibleId) => Number(responsibleId.value)),
    }

    addMentalHealthSession(payload)
  }

  const doCollaboratorFilter = useMemo(
    () => throttle((value) => setCollaboratorFilter(value), 1500),
    [setCollaboratorFilter],
  )

  return (
    <StyledMyScheduleWrapper>
      <ContentWrapper>
        <StyledMyScheduleTitle>Preencha os dados para sessão</StyledMyScheduleTitle>
        <StyledStudentInfoWrapper>
          <CAutoComplete
            sx={{ flex: '1' }}
            name='institution_id'
            options={
              institutionsData?.map((institution) => ({
                value: institution.id,
                label: institution.getFantasyNameWithCnpj(),
              })) || []
            }
            label='Instituição'
            onInputChange={(e, value, reason) => {
              if (reason === 'reset' || reason === 'clear') {
                setValue('studentId', '')
                setValue('requested_user_id', '')
              }
              if (reason === 'input') {
                doInstitutionFilter(value)
              }
            }}
          />
          <CAutoComplete
            sx={{ flex: '1' }}
            name='studentId'
            label='Aluno'
            disabled={!institutionId}
            onInputChange={(e, value, reason) => {
              if (reason === 'reset' || reason === 'clear') {
                setValue('studentId', '')
              }
              if (reason === 'input') {
                doUserFilter(value)
              }
            }}
            options={
              allStudentsData?.map((user) => ({
                value: user.id,
                label: user.getFormattedName(),
              })) || []
            }
          />
        </StyledStudentInfoWrapper>
        <StyledDivider />
        <MentalHealthCalendar />
        <StyledScheduleListTitle>
          <h1>{formatISODateToString(selectedDate)}</h1>
        </StyledScheduleListTitle>
        <StyledInfoSession>
          <CAutoComplete
            sx={{ flex: '1' }}
            label='Selecione um horário'
            options={generateTimeSlots(50, selectedDate)}
            name='hour'
            disabled={!studentId}
          />
          <CAutoComplete
            sx={{ flex: '2' }}
            name='typeProfessionalId'
            options={profileList}
            label='Tipo de profissional'
          />
          <CAutoComplete
            sx={{ flex: '2' }}
            name='professionalId'
            label='Selecione um profissional'
            options={profOptions || []}
            onInputChange={(e, value, reason) => {
              if (reason === 'input') {
                doProfFilter(value)
              }
            }}
          />
        </StyledInfoSession>
        <StyledMyScheduleTitle>Quem participa da sessão?</StyledMyScheduleTitle>
        <StyledParticipantsWrapper>
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
            disabled={studentData?.responsible?.length === 0}
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
        </StyledParticipantsWrapper>
        <StyledButtonWrapper>
          <Button
            variant='contained'
            fullWidth
            onClick={handleSubmit}
            disabled={!institutionId || !studentId || !hour || !professionalId}
          >
            Salvar
          </Button>
          <Button variant='outlined' fullWidth>
            Cancelar
          </Button>
        </StyledButtonWrapper>
      </ContentWrapper>
    </StyledMyScheduleWrapper>
  )
}
