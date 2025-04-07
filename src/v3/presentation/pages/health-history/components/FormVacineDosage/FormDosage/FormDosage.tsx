import { Box, Typography } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useRef } from 'react'
import dayjs from 'dayjs'

import { CDatePickerControlled } from '@/components/Forms'
import { formatDate } from '@/utils/formatDate'
import { removeEqualDates } from '@/v3/utils/removeDuplicateDates'
import { CInput } from '@/v3/presentation/newComponents'

export const FormDosage = ({
  getLabel,
  watchName,
  name,
  index,
  existentDoses,
  label,
}: {
  name: string
  watchName: string
  label?: string
  index: number
  getLabel: (index: number) => string
  existentDoses?: Date[]
}) => {
  const form = useFormContext()

  const num = form.watch(watchName)
  const refValue = useRef<Record<string, Date>>({})

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  })

  useEffect(() => {
    const numExistent = existentDoses?.length || 0
    const actualNum = Number(num) - numExistent
    const numOfFields = actualNum > 15 ? 15 : actualNum
    const fieldName = watchName.split('.').at(-1)?.slice(0, -1) + 'Dates'

    if (fields.length < numOfFields) {
      for (let i = fields.length; i < numOfFields; i++) {
        append(refValue.current[fields[i]?.id] ? new Date(refValue.current[fields[i]?.id]) : {})
      }
    } else if (fields.length > numOfFields) {
      for (let i = fields.length - 1; i >= numOfFields; i--) {
        refValue.current[fields[i]?.id] = form.getValues()?.vaccines?.[index]?.[fieldName]?.[i]
        remove(i)
      }
    }

    return () => {
      if (fields.length != numOfFields) {
        for (let i = fields.length - 1; i >= 0; i--) {
          remove(i)
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, existentDoses])

  const allFields = useMemo(() => {
    const fieldName = watchName.split('.').at(-1)?.slice(0, -1) + 'Dates'
    const fieldsValues = form.getValues()?.vaccines?.[index]?.[fieldName] || []

    const existentDosesData =
      existentDoses?.map((date) => ({
        date,
        index: 0,
        isExistent: true,
        id: date.toISOString(),
      })) || []
    const newFields = fields.map((field, i) => ({
      id: field.id,
      index: i,
      date: fieldsValues[i] ? new Date(fieldsValues[i]) : null,
      isExistent: false,
    }))

    return [
      ...removeEqualDates(
        { dates: existentDosesData, getDate: (item) => item.date },
        { dates: newFields, getDate: (item) => new Date(item.date || 0) },
      ),
      ...newFields,
    ].sort((a, b) => {
      if (!a.date?.getTime()) return 1
      return (a.date?.getTime() || 100000000) - (b.date?.getTime() || 100000000)
    })
    //
  }, [watchName, form, index, existentDoses, fields])

  return (
    <>
      {allFields.map((field, index) => {
        const isExistent = !!field.isExistent
        const date = field.date!

        return (
          <Box
            key={field.id}
            sx={{
              display: 'flex',
              textWrap: 'nowrap',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <Typography
              color={isExistent ? 'var(--mui-palette-grey-600)' : undefined}
              variant='h5'
              width='90px'
            >
              {getLabel(index)}
            </Typography>{' '}
            {isExistent && (
              <CInput
                size='small'
                placeholder='Data'
                label='Data'
                fullWidth
                value={date ? formatDate(date.toISOString()) : ''}
                disabled={true}
              />
            )}
            {!isExistent && (
              <CDatePickerControlled
                label={label}
                getFieldValue={(value) => (JSON.stringify(value) !== '{}' ? value || null : null)}
                name={`${name}[${field.index}]`}
                maxDate={dayjs()}
              />
            )}
          </Box>
        )
      })}
    </>
  )
}
