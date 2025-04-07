import * as yup from 'yup'

import {
  HealthUnitCareUnits,
  HealthUnitImagingExams,
  HealthUnitImmobilizationTypes,
  HealthUnitLaboratoryExams,
  HealUnitPatientType,
  HealthUnitCareModality,
  HealthUnitPaymentMethods,
} from '@/v3/domain/api/ApiHealthUnitResponse'
import { isValidPhone } from '@/validators/phone'
import { cleanTelephone } from '@/utils/cleanTelephone'
import { timeValidator } from '@/validators/timeValidator'
import { cnpjValidator } from '@/validators/cnpjValidator'
import { getIsTimeGreaterOrEqualThanValidator } from '@/validators/isTimeGreaterOrEqualThanValidator'

const onlyNums = (value: string) => (value ? value.replace(/\D/g, '') : undefined)

export const schema = yup.object({
  healthUnitType: yup.string().optional(),

  contact: yup.object().shape({
    email: yup.string().email().optional(),

    phone: yup
      .string()
      .required()
      .test('is-valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true
        return !!value && isValidPhone(cleanTelephone(value))
      })
      .transform(onlyNums),

    whatsapp: yup
      .string()
      .test('is-valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true
        return !!value && isValidPhone(cleanTelephone(value))
      })
      .transform(onlyNums),
  }),

  address: yup
    .object()
    .shape({
      zipCode: yup.string().optional().transform(onlyNums),
      city: yup.string().optional(),
      state: yup.string().optional(),
      street: yup.string().optional(),
      number: yup.string().optional(),
      complement: yup.string().optional(),
      block: yup.string().optional(),
      neighborhood: yup.string().optional(),
    })
    .required(),

  company: yup.object().shape({
    companyName: yup.string().required(),
    cnpj: cnpjValidator.required().transform(onlyNums),
    name: yup.string().optional(),
  }),

  infrastructure: yup.object().shape(
    {
      openAt: timeValidator.when('closeAt', {
        is: (val: string) => Boolean(val),
        then: (yup) => yup.required('Este campo é obrigatório quando o campo "Fecha" é preenchido'),
      }),

      closeAt: timeValidator.when('openAt', {
        is: (val: string) => Boolean(val),
        then: (yup) =>
          yup
            .required('Este campo é obrigatório quando o campo "Abre" é preenchido')
            .test(
              'is-greater',
              'O campo "Fecha" deve ser maior que o campo "Abre"',
              getIsTimeGreaterOrEqualThanValidator('openAt'),
            ),
      }),

      careModality: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitCareModality))),
      patientType: yup.array().of(yup.mixed().oneOf(Object.values(HealUnitPatientType))),
      notes: yup.string().optional(),
    },
    [['openAt', 'closeAt']],
  ),

  financial: yup.object().shape({
    appointmentAveragePrice: yup.string().optional(),
    responsibleFinance: yup.string().optional(),
    paymentMethods: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitPaymentMethods))),
    bank: yup.object().shape({
      name: yup.string().optional(),
      branch: yup.string().optional(),
      account: yup.string().optional(),
    }),
    pixKey: yup.string().optional(),
  }),

  appointment: yup.object().shape({
    doSutures: yup.boolean().optional(),
    doMedication: yup.boolean().optional(),
    doSurgery: yup.boolean().optional(),
    imagingExams: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitImagingExams))),
    laboratoryExams: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitLaboratoryExams))),
    careUnits: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitCareUnits))),
    immobilizationTypes: yup
      .array()
      .of(yup.mixed().oneOf(Object.values(HealthUnitImmobilizationTypes))),
  }),
})
