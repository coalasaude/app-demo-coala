import { useLayout } from '@/hooks/useLayout'

import { useMyScheduleContext } from '../contexts/my-schedule.provider'
import { formatDayToPayload } from '../utils/days'

import { useFetchCalendarSettings } from './useCalendarSettings'

export const useMySchedule = (title?: string) => {
  const { setMySchedule, idsTobeDeleted, getCalendarSettings } = useMyScheduleContext()
  const { showSnackBar } = useLayout()
  const {
    addCalendarSettings,
    deleteCalendarSettings,
    updateCalendarSettings,
    add: { error },
  } = useFetchCalendarSettings()

  const formatTimeInput = (value: string) => {
    const numbers = value.replace(/\D/g, '')

    return numbers.length > 2 ? (numbers.slice(0, 2) + ':' + numbers.slice(2)).slice(0, 5) : numbers
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    position: string
  ) => {
    const value = formatTimeInput(event.target.value)
    setMySchedule((prev) => {
      const newSchedule = prev
      const currentDay = newSchedule?.[formatDayToPayload(title!)]
      const newRow = currentDay?.map((row, idx) => {
        if (idx === index) {
          return {
            ...row,
            [position]: value,
          }
        }
        return row
      })
      return prev?.[formatDayToPayload(title!)]
        ? { ...prev, [formatDayToPayload(title!)]: newRow }
        : prev
    })
  }

  const handleSubmit = async (values: any) => {
    if (idsTobeDeleted.length > 0) {
      await deleteCalendarSettings(idsTobeDeleted)
    }
    const valuesWithDate = Object.keys(values).reduce<
      { startTime: string; endTime: string; day: string; id?: number }[]
    >((result, key) => {
      const value = values[key]
      const valuesWithDate = value?.filter((time: any) => time.startTime || time.endTime)
      if (valuesWithDate?.length)
        valuesWithDate.map((current: any) => {
          if (idsTobeDeleted.includes(current.id)) return
          result.push({
            day: key,
            startTime: current.startTime,
            endTime: current.endTime,
            id: current.id,
          })
        })
      return result
    }, [])
    const notCreatedValues = valuesWithDate.filter(({ id }) => !id)
    if (notCreatedValues.length > 0) {
      const { error } = await addCalendarSettings(notCreatedValues)
      if (error) {
        showSnackBar({
          message: 'Erro ao cadastrar horários',
          type: 'warning',
        })
        return
      }
    }

    const { error: updateError } = await updateCalendarSettings(
      valuesWithDate.filter(({ id }) => id)
    )
    if (updateError) {
      showSnackBar({
        message: 'Erro ao atualizar horários',
        type: 'warning',
      })
      return
    }

    await getCalendarSettings()
    showSnackBar({
      message: 'Horários atualizados com sucesso',
      type: 'success',
    })
  }

  return {
    handleInputChange,
    handleSubmit,
    submittingError: error,
  }
}
