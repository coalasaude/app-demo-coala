import dayjs from 'dayjs'
import * as yup from 'yup'

export const getIsTimeGreaterOrEqualThanValidator = (field: string) => {
  const isTimeGreaterOrEqualThanValidator: yup.TestFunction<string | undefined> = function (
    value?: string,
  ) {
    const openAt = this.resolve<string>(yup.ref(field))

    return Boolean(
      value && (dayjs(openAt).isBefore(dayjs(value)) || dayjs(openAt).isSame(dayjs(value))),
    )
  }

  return isTimeGreaterOrEqualThanValidator
}
