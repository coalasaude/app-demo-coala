import * as yup from 'yup'
import dayjs from 'dayjs'

export const schemaUser = yup.object({
  measurementDate: yup
    .date()
    .max(dayjs().add(1, 'day'), 'Data não pode ser futura')
    .test('measurementDate-required', 'Campo obrigatório', function (value) {
      const { height, weight } = this.parent
      return !!value || (!height && !weight)
    }),

  height: yup
    .string()
    .nullable()
    .test('height-required', 'Campo obrigatório', function (value) {
      const { weight, measurementDate } = this.parent
      if (!value && !weight && !!measurementDate) {
        return false
      }
      return true
    }),

  weight: yup
    .string()
    .nullable()
    .test('weight-required', 'Campo obrigatório', function (value) {
      const { height, measurementDate } = this.parent
      if (!value && !height && !!measurementDate) {
        return false
      }
      return true
    }),
})
