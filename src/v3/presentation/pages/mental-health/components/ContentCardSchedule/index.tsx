import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { timeNormalizer } from '@/v3/presentation/formatter/timeNormalizer'
import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'

import { useMyScheduleContext } from '../../contexts/my-schedule.provider'

import {
  StyledContentCardScheduleWrapper,
  StyledHeaderContentCardSchedule,
  StyledInputRowContentCardSchedule,
  StyledTextField,
} from './styles'

const ContentCardSchedule = ({ title, errors }: { title: string; errors: any }) => {
  const [expanded, setExpanded] = useState(false)
  const { mySchedule, setIdsTobeDeleted, idsTobeDeleted } = useMyScheduleContext()
  const { control, watch, setValue } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: title,
  })
  const fieldArrayValues = watch(title)

  const formatOnBlur = (e: any) => {
    let value = e.target.value

    if (/^\d{1,2}$/.test(value)) {
      value = value.padStart(2, '0') + ':00'
    } else if (/^\d{2}:$/.test(value)) {
      value = value + '00'
    }
    setValue(e.target.name, value)
  }

  useEffect(() => {
    if (mySchedule?.[title as keyof typeof mySchedule]) {
      setExpanded(true)
    }
  }, [mySchedule, setExpanded, title])

  function handleOnChange() {
    if (expanded) {
      setExpanded(false)
      const day = mySchedule?.[title as keyof typeof mySchedule] || []
      const ids = day.filter((d) => !!d.id).map((d) => Number(d.id))
      setIdsTobeDeleted([...idsTobeDeleted, ...ids])
    } else {
      setExpanded(true)
      if (!fields.length) append({ startTime: '', endTime: '' })
    }
  }
  return (
    <StyledContentCardScheduleWrapper expanded={expanded}>
      <StyledHeaderContentCardSchedule>
        <Typography variant='h4' sx={{ color: expanded ? 'black' : 'var(--mui-palette-grey-700)' }}>
          {title}
        </Typography>
        <CSwitch checked={expanded} onChange={handleOnChange} />
      </StyledHeaderContentCardSchedule>

      {expanded &&
        fields.map((field: any, index) => {
          const errorsArray = errors?.data?.message instanceof Array ? errors.data.message : []
          const currentValue = fieldArrayValues[index]
          const error = errorsArray?.find((data: any) => {
            return !field.userId && data.time === currentValue.startTime + currentValue.endTime
          })
          const hasError = !!error?.errorMessage
          return (
            <Fragment key={field.id}>
              <StyledInputRowContentCardSchedule>
                <StyledTextField
                  placeholder='Hora Início'
                  label='Hora Início'
                  name={`${title}.${index}.startTime`}
                  InputProps={{
                    error: hasError,
                  }}
                  variant='outlined'
                  transform={{ input: timeNormalizer }}
                  onBlur={formatOnBlur}
                />
                <StyledTextField
                  placeholder='Hora Fim'
                  label='Hora Fim'
                  name={`${title}.${index}.endTime`}
                  InputProps={{
                    error: hasError,
                  }}
                  variant='outlined'
                  transform={{ input: timeNormalizer }}
                  onBlur={formatOnBlur}
                />
                {index === 0 ? (
                  <AddCircleOutlineOutlinedIcon
                    onClick={() => append({ startTime: '', endTime: '' })}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <DeleteOutlineOutlinedIcon
                    onClick={() => {
                      if (currentValue.userId) {
                        setIdsTobeDeleted(currentValue.id)
                      }
                      remove(index)
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </StyledInputRowContentCardSchedule>
              <Box ml={2} color='error.main'>
                {error?.errorMessage && <span>{error.errorMessage}</span>}
              </Box>
            </Fragment>
          )
        })}
    </StyledContentCardScheduleWrapper>
  )
}

export default ContentCardSchedule
