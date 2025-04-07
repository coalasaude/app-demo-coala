import { Box, FormControlLabel } from '@mui/material'
import dayjs from 'dayjs'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'

import NFilter from '@/components/Template/NFilter'
import { MedicalRecordClassificationOptions } from '@/constants/medicalRecordClassification'
import { AppointmentStatusType } from '@/constants/status'
import { CCheckbox } from '@/v3/presentation/newComponents'
import CDatePicker from '@/v3/presentation/newComponents/atoms/CDatePicker'
import { ComplaintSelectInput } from '@/v3/presentation/newComponents/implementations/form/ComplaintSelectInput'
import { InstitutionSelectInput } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectInput'
import { CFilterDrawer } from '@/v3/presentation/newComponents/layout/CFilterDrawer'

import { IAppointmentFilterFields } from '../type'

interface DrawerFilterAppointmentProps {
  isOpen: boolean
  filters: IAppointmentFilterFields
  setIsOpen: (isOpen: boolean) => void
  onSetFilters: (filters: IAppointmentFilterFields) => void
}

export const DrawerFilterAppointment = ({
  onSetFilters,
  filters,
  isOpen,
  setIsOpen,
}: DrawerFilterAppointmentProps) => {
  const [dateSearch, setDateSearch] = useState<Date | null>(filters.searchDate || null)
  const [status, setStatus] = useState(filters.status)
  const [classification, setClassification] = useState(filters.classification)
  const [complaintId, setComplaintId] = useState<number | null>(filters.complaintId || null)
  const [institutionId, setInstitutionId] = useState<number | null>(filters.institutionId || null)

  useEffect(
    () => {
      if (institutionId != filters.institutionId) setInstitutionId(filters.institutionId || null)
      if (!dayjs(dateSearch).isSame(filters.searchDate)) setDateSearch(filters.searchDate || null)
      if (complaintId !== filters.complaintId) setComplaintId(filters.complaintId || null)
      if (!isEqual(filters.status, status)) setStatus(filters.status)
      if (!isEqual(filters.classification, classification))
        setClassification(filters.classification)
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      filters.classification,
      filters.complaintId,
      filters.institutionId,
      filters.status,
      filters.searchDate,
    ],
  )

  const onClearFilters = () => {
    setDateSearch(null)
    setInstitutionId(null)
    setComplaintId(null)
    setStatus([])
    setClassification([])
  }

  const handleClose = () => {
    onSetFilters({
      complaintId: complaintId || undefined,
      searchDate: dateSearch || undefined,
      institutionId: institutionId || undefined,
      status: status,
      classification: classification,
    })
    setIsOpen(false)
  }

  return (
    <CFilterDrawer
      open={isOpen}
      onClose={handleClose}
      onApply={handleClose}
      onClear={() => onClearFilters()}
    >
      <CDatePicker
        value={dateSearch ? dayjs(dateSearch) : null}
        label='Data do atendimento'
        onChange={(e) => {
          if (dayjs.isDayjs(e) && e.isValid()) {
            setDateSearch(e.toDate())
          } else if (e === null) {
            setDateSearch(null)
          }
        }}
      />
      <Box mt={2}>
        <InstitutionSelectInput
          label='Instituição'
          setInstitutionId={(id) => setInstitutionId(id || null)}
          institutionId={institutionId}
        />
      </Box>
      <NFilter.Content label='Queixa'>
        <ComplaintSelectInput
          label='Queixa'
          setComplaintId={(id) => setComplaintId(id || null)}
          complaintId={complaintId}
        />
      </NFilter.Content>
      <NFilter.Content label='Risco'>
        {MedicalRecordClassificationOptions.map(({ value, label }) => {
          const clasificationArray = classification || []
          const isChecked = clasificationArray.indexOf(value) > -1

          return (
            <Box
              key={value}
              onClick={(e) => {
                e.preventDefault()
                const exists = clasificationArray.includes(value)
                const newValue = exists
                  ? clasificationArray.filter((item) => item !== value)
                  : [...clasificationArray, value]

                setClassification(newValue)
              }}
            >
              <FormControlLabel
                control={<CCheckbox checked={isChecked} size='small' />}
                checked={true}
                label={label}
              />
            </Box>
          )
        })}
      </NFilter.Content>
      <NFilter.Content label='Status'>
        {AppointmentStatusType.map(({ value, label }) => {
          const statusArray = status || []
          const isChecked = statusArray.indexOf(value) > -1

          return (
            <Box
              key={value}
              onClick={(e) => {
                e.preventDefault()
                const exists = statusArray.includes(value)
                const newValue = exists
                  ? statusArray.filter((item) => item !== value)
                  : [...statusArray, value]

                setStatus(newValue)
              }}
            >
              <FormControlLabel
                control={<CCheckbox checked={isChecked} size='small' />}
                checked={true}
                label={label}
              />
            </Box>
          )
        })}
      </NFilter.Content>
    </CFilterDrawer>
  )
}
