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
      zipCode: yup.string().nullable().optional().transform(onlyNums),
      city: yup.string().nullable().optional(),
      state: yup.string().nullable().optional(),
      street: yup.string().nullable().optional(),
      number: yup.string().nullable().optional(),
      complement: yup.string().nullable().optional(),
      block: yup.string().nullable().optional(),
      neighborhood: yup.string().nullable().optional(),
    })
    .required(),

  company: yup.object().shape({
    companyName: yup.string().required(),
    cnpj: cnpjValidator.required().transform(onlyNums),
    name: yup.string().optional(),
  }),

  infrastructure: yup.object().shape(
    {
      openAt: yup.string().when('closeAt', ([closeAt], schema) => {
        if (closeAt) return schema.required()
        return schema.nullable().optional()
      }),

      closeAt: yup
        .string()
        .when('openAt', ([openAt], schema) => {
          if (openAt) return schema.required()
          return schema.nullable().optional()
        })
        .when('openAt', {
          is: (val: string) => Boolean(val),
          then: (yup) =>
            yup
              .required('Este campo é obrigatório quando o campo "Horário de início" é preenchido')
              .test(
                'is-greater',
                'O campo "Horário final" deve ser maior que o campo "Horário de início"',
                getIsTimeGreaterOrEqualThanValidator('openAt'),
              ),
        }),

      careModality: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitCareModality))),
      patientType: yup.array().of(yup.mixed().oneOf(Object.values(HealUnitPatientType))),
      notes: yup.string().nullable().optional(),
    },
    [['openAt', 'closeAt']],
  ),

  financial: yup.object().shape({
    appointmentAveragePrice: yup.string().nullable().optional(),
    responsibleFinance: yup.string().nullable().optional(),
    paymentMethods: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitPaymentMethods))),
    bank: yup.object().shape({
      name: yup.string().nullable().optional(),
      branch: yup.string().nullable().optional(),
      account: yup.string().nullable().optional(),
    }),
    pixKey: yup.string().nullable().optional(),
  }),

  appointment: yup.object().shape({
    doSutures: yup.boolean().nullable().optional(),
    doMedication: yup.boolean().nullable().optional(),
    doSurgery: yup.boolean().nullable().optional(),
    imagingExams: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitImagingExams))),
    laboratoryExams: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitLaboratoryExams))),
    careUnits: yup.array().of(yup.mixed().oneOf(Object.values(HealthUnitCareUnits))),
    immobilizationTypes: yup
      .array()
      .of(yup.mixed().oneOf(Object.values(HealthUnitImmobilizationTypes))),
  }),
})
