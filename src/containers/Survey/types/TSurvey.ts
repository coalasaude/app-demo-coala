import * as yup from 'yup'

export const schema = yup.object({
  grade: yup.number().required(),
  comment: yup.string(),
})

export const defaultValues = {
  grade: 0,
  comment: '',
}

export interface PSurvey {
  onSubmit: (body: typeof defaultValues) => Promise<void>
}
