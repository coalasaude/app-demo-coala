import * as yup from 'yup'

export const schemaAllergy = yup.object({
  causerAgent: yup.string().test('causerAgent-required', 'Campo obrigatório', function (value) {
    const { symptom, categoryId } = this.parent
    if (symptom || categoryId) {
      return !!value
    }
    return true
  }),
  symptom: yup
    .array(yup.number().required())
    .min(1)
    .test('symptom-required', 'Campo obrigatório', function (value) {
      const { causerAgent, categoryId } = this.parent
      if (causerAgent || categoryId) {
        return !!value
      }
      return true
    }),
  orientations: yup.string(),
  otherCategory: yup.string().nullable(),
  categoryId: yup.string().test('categoryId-required', 'Campo obrigatório', function (value) {
    const { causerAgent, symptom } = this.parent
    if (causerAgent || symptom) {
      return !!value
    }
    return true
  }),
  deniesAllergies: yup.boolean().optional(),
})
