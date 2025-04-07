import dayjs from 'dayjs'
import * as yup from 'yup'

function formatDate(date: string | Date) {
  return dayjs(date).format('DD/MM/YYYY')
}

export const generalDataSchema = yup.object({
  birthDate: yup
    .date()
    .max(dayjs().toDate(), ({ max }) => `Deve ser menor que a data ${formatDate(max)}.`)
    .min(
      dayjs(new Date(new Date().setFullYear(new Date().getFullYear() - 100))).toDate(),
      () =>
        `A data de nascimento inserida não é válida. O ano informado excede o limite permitido.`,
    )
    .required(),
  bloodType: yup.string(),
  genre: yup.string().required(),
}) as any
