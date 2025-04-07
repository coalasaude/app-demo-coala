import { useMemo } from 'react'

import { TimelineModel } from '@/v3/domain/@v2/appointment/timeline.model'
import { TimelineEvent } from '@/v3/domain/@v2/appointment/event.model'

type IconType =
  | 'HealthAndSafetyIcon'
  | 'OutlinedFlagOutlinedIcon'
  | 'AccessTimeOutlinedIcon'
  | 'MedicalServices'
  | 'Stethoscope'

export const TimelineEventDescription: Record<string, string> = {
  [TimelineEvent.FINISHED]: 'Ticket finalizado',
  [TimelineEvent.CREATED]: 'Solicitação',
  [TimelineEvent.START]: 'Atendimento iniciado',
  [TimelineEvent.DOCTOR_ATTENDANCE]: 'Atendimento médico',
  [TimelineEvent.NURSE_ATTENDANCE]: 'Atendimento enfermagem',
}

export const useAppointmentTicketRegister = (timeline?: TimelineModel | null) => {
  const getIconType = (status: TimelineEvent): IconType | null => {
    const mapper = {
      [TimelineEvent.CREATED]: 'HealthAndSafetyIcon',
      [TimelineEvent.START]: 'AccessTimeOutlinedIcon',
      [TimelineEvent.FINISHED]: 'OutlinedFlagOutlinedIcon',
      [TimelineEvent.DOCTOR_ATTENDANCE]: 'Stethoscope',
      [TimelineEvent.NURSE_ATTENDANCE]: 'MedicalServices',
    } as Record<string, IconType>

    return mapper[status] || null
  }

  const ticketsRegisters = useMemo(() => {
    return timeline?.events.map((event) => {
      const isRecord = event.type === TimelineEvent.RECORD

      if (isRecord) {
        return {
          id: event?.data?.id,
          title: event.data?.translatedType,
          descriptionName: event?.getCreatorFullName(),
          descriptionDate: event?.getFormatedCreatedAtDate(),
          iconType: getIconType(event.type),
          status: event?.data?.status,
          disabled: false,
          color: undefined,
          type: event.data?.recordType,
          createdAt: event.createdAt,
        }
      } else {
        const title = TimelineEventDescription[event.type]

        const color =
          event.type === TimelineEvent.FINISHED || event.type === TimelineEvent.CREATED
            ? 'var(--mui-palette-primary-main)'
            : undefined

        const isMedicalEvent =
          event.type === TimelineEvent.DOCTOR_ATTENDANCE ||
          event.type === TimelineEvent.NURSE_ATTENDANCE

        return {
          id: event.createdAt.toISOString(),
          title,
          description: !isMedicalEvent ? event.description : undefined,
          descriptionName: isMedicalEvent ? event.getCreatorFullName() : undefined,
          descriptionDate: isMedicalEvent ? event.getFormatedCreatedAtDate() : undefined,
          iconType: getIconType(event?.type),
          status: event.data?.status,
          disabled: true,
          color,
          type: event.type,
          createdAt: event.createdAt,
        }
      }
    })
  }, [timeline?.events])

  return ticketsRegisters
}
