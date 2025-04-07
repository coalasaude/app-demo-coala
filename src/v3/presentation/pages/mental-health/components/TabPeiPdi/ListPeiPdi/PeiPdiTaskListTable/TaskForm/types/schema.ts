import * as yup from 'yup'

export const taskSchema = yup.object({
  categoryId: yup.number().required(),
  subCategoryId: yup.mixed<number | string>().required(),
  objective: yup.string().optional(),
  activities: yup.string().optional(),
  adaptations: yup.string().optional(),
  supportTechnologies: yup.string().optional(),
  assessment: yup.string().optional(),
})
