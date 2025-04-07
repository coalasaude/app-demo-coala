import { Stack } from '@mui/material'
import React from 'react'

import { Experimental_CTicket } from '@/v3/presentation/newComponents/molecules/Experimental_CTicket'
import { RecordsType } from '@/types/records'
import { DefaultStatus } from '@/v3/domain/api/ApiCourseResponse'

import { CTicketGroup } from '../../../../../../../../../newComponents/molecules/CTicketGroup'

import { EmptyList } from './EmptyList'

interface Register {
  id: string | number | undefined
  title: string | undefined
  description?: string | undefined
  descriptionName?: string | undefined
  descriptionDate?: string | undefined
  status?: DefaultStatus
  icon?: React.ReactNode
  disabled?: boolean
  color?: string
  createdAt?: string | Date
  type?: string
}

interface RecordsListProps {
  registers: Register[]
  selected?: {
    recordId: number
    type: RecordsType
  }
  hasPatient?: boolean
  onSelect: (recordId: number | string | undefined, recordType?: string) => void
  isResumeVideoLog?: boolean
}

export const RecordsList = ({
  registers,
  selected,
  hasPatient = false,
  onSelect,
  isResumeVideoLog,
}: RecordsListProps) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    !isResumeVideoLog ? (
      <Stack
        id='records-list'
        gap={2}
        width={268}
        sx={(theme) => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
      >
        {children}
      </Stack>
    ) : (
      <>{children}</>
    )

  return (
    <Wrapper>
      {!registers?.length ? (
        <EmptyList hasPatient={hasPatient} />
      ) : (
        <CTicketGroup>
          {registers.map((item) => {
            return (
              <Experimental_CTicket
                key={item.id}
                title={item.title || ''}
                description={item.description}
                descriptionName={item.descriptionName}
                descriptionDate={item.descriptionDate}
                status={
                  item.status ? (item.status.toLowerCase() as 'active' | 'inactive') : undefined
                }
                selected={selected?.recordId === item.id && selected?.type === item.type}
                icon={item.icon}
                onClick={() => onSelect(item.id, item.type)}
                disabled={item.disabled}
                color={item.color}
              />
            )
          })}
        </CTicketGroup>
      )}
    </Wrapper>
  )
}
