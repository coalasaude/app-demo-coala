import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION } from '@/constants/medicalRecordClassification'
import { AppointmentStatusDescription } from '@/constants/status'
import { ComplaintModel } from '@/v3/domain/@v2/appointment/complaint.model'
import { Institution } from '@/v3/domain/organizations/Organization'
import { useFetchBrowseComplaint } from '@/v3/presentation/hooks/api/@v2/appointment/complaint/useFetchBrowseComplaint'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { convertToArray } from '@/v3/utils/convert-to-array'

import { IAppointmentFilterFields } from '../components/AppointmentListTable/type'
import { convertFilterParams } from '../components/AppointmentListTable/utils/convert-filter-params'

const generateChipsList = ({
  institution,
  queryParams,
  complaint,
}: {
  queryParams: IAppointmentFilterFields
  institution: Institution | null
  complaint?: ComplaintModel | null
}) => {
  const chipsList = []

  if (queryParams.searchDate) {
    chipsList.push({
      label: dayjs(queryParams.searchDate).format('DD/MM/YYYY'),
      value: queryParams.searchDate,
    })
  }

  if (queryParams.classification) {
    const classifications = Array.isArray(queryParams.classification)
      ? queryParams.classification
      : [queryParams.classification]

    classifications.forEach((classification) => {
      chipsList.push({
        label: MEDICAL_RECORD_CLASSIFICATION_DESCRIPTION[classification],
        value: classification,
      })
    })
  }

  if (queryParams.institutionId != 0 && queryParams.institutionId) {
    chipsList.push({
      label: `Instituição: ${institution?.getFantasyName() || ''}`,
      value: queryParams.institutionId,
    })
  }

  if (queryParams.complaintId) {
    chipsList.push({
      label: complaint?.name || '',
      value: queryParams.complaintId,
    })
  }

  if (queryParams.status) {
    const statuses = Array.isArray(queryParams.status) ? queryParams.status : [queryParams.status]

    statuses.forEach((status) => {
      chipsList.push({
        label: AppointmentStatusDescription[status],
        value: status,
      })
    })
  }

  return chipsList
}

export const useAppointmentListFilters = () => {
  const router = useRouter()
  const queryParams = convertFilterParams(router.query)
  const { data } = useFetchInstitution(queryParams.institutionId)
  const { complaints } = useFetchBrowseComplaint({
    limit: 1,
    ids: [queryParams.complaintId || 0],
  })
  const { replaceManyQueryParam } = useUrlQueryControl({})

  const [isOpen, setIsOpen] = useState(false)

  const onSetFilters = (filters: IAppointmentFilterFields) => {
    if (!filters.offset) filters.offset = 0
    replaceManyQueryParam(filters)
  }

  const removeChipFilter = (deleteChip: string) => {
    const newQueryParams = { ...queryParams, offset: 0 } as Record<string, any>

    for (const [key, value] of Object.entries(newQueryParams)) {
      const keyValue = key as keyof IAppointmentFilterFields

      if (keyValue === 'classification' || keyValue === 'status') {
        const values = convertToArray(value)

        if (values.includes(deleteChip)) {
          newQueryParams[keyValue] = values.filter((item) => item !== deleteChip)
        }
      } else if (value === deleteChip) {
        newQueryParams[keyValue] = undefined
      }
    }

    onSetFilters(newQueryParams)
  }

  const chipsList = generateChipsList({
    queryParams,
    institution: data,
    complaint: complaints?.data?.[0],
  })

  return {
    filters: queryParams,
    isOpen,
    setIsOpen,
    onSetFilters,
    removeChipFilter,
    chipsList,
  }
}
