import * as yup from 'yup'

import { cnpjValidator } from '@/validators/cnpjValidator'
import { isValidPhone } from '@/validators/phone'
import { cleanTelephone } from '@/utils/cleanTelephone'
import { getIsTimeGreaterOrEqualThanValidator } from '@/validators/isTimeGreaterOrEqualThanValidator'

import { OrganizationType } from '../../constants/organizationType'

const onlyNums = (value: string) => (value ? value.replace(/\D/g, '') : undefined)

export const schema = yup.object({
  organization: yup.object().shape({
    nickname: yup.string().nullable().optional(),
    organizationType: yup.string().required(),
    fantasyName: yup.string().required(),
    socialReason: yup.string().required(),
    cnpj: cnpjValidator.required().transform(onlyNums),
  }),

  contacts: yup.object().shape({
    email: yup.string().email().optional().nullable(),
    telephone: yup
      .string()
      .required()
      .test('is-valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true
        return !!value && isValidPhone(cleanTelephone(value))
      })
      .transform(onlyNums),

    whatsapp: yup
      .string()
      .optional()
      .nullable()
      .test('is-valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true
        return !!value && isValidPhone(cleanTelephone(value))
      })
      .transform(onlyNums),
  }),

  address: yup.object().shape({
    zipCode: yup.string().optional().nullable().transform(onlyNums),
    city: yup.string().optional().nullable(),
    state: yup
      .string()
      .optional()
      .nullable()
      .test('len', 'Deve ter 2 caracteres', (value) => value?.length === 2 || !value),
    street: yup.string().optional().nullable(),
    number: yup.string().optional().nullable(),
    complement: yup.string().optional().nullable(),
    block: yup.string().optional().nullable(),
    neighborhood: yup.string().optional().nullable(),
  }),

  financial: yup.object().shape({
    responsableFinance: yup.string().optional().nullable(),
    dueDate: yup.string().optional().nullable(),

    bank: yup.object().shape({
      bank: yup.string().optional().nullable(),
      agency: yup.string().optional().nullable(),
      account: yup.string().optional().nullable(),
      pixKey: yup.string().optional().nullable(),
    }),
  }),

  links: yup.object().shape({
    network: yup.object().shape({
      brands: yup.array().optional().nullable(),
    }),

    brand: yup.object().shape({
      network: yup.number().optional().nullable(),
    }),

    institution: yup.object().shape({
      brand: yup.number().optional().nullable(),
    }),
  }),

  settings: yup
    .object()
    .shape({
      standardCoverage: yup.object().shape({
        openingHours: yup.boolean().optional(),
        startTime: yup.string().when('openingHours', ([openingHours], schema) => {
          if (openingHours) return schema.required()
          return schema.nullable().optional()
        }),
        endTime: yup
          .string()
          .when('openingHours', ([openingHours], schema) => {
            if (openingHours) return schema.required()
            return schema.nullable().optional()
          })
          .when('startTime', {
            is: (val: string) => Boolean(val),
            then: (yup) =>
              yup
                .required(
                  'Este campo é obrigatório quando o campo "Horário de início" é preenchido',
                )
                .test(
                  'is-greater',
                  'O campo "Horário final" deve ser maior que o campo "Horário de início"',
                  getIsTimeGreaterOrEqualThanValidator('startTime'),
                ),
          }),
        emergency: yup.array().optional().nullable(),
        amenities: yup
          .number()
          .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
          .nullable()
          .optional(),
        accidentCoverage: yup.array().optional().nullable(),
        accidentCoverageValue: yup.string().optional().nullable(),
        mentalHealthModule: yup.array().optional().nullable(),
        nutritionCoverage: yup.array().optional().nullable(),
      }),

      coalaAtHome: yup.object().shape({
        enableHiring: yup.array().optional().nullable(),
        plan: yup.string().optional().nullable(),
      }),

      extendedCoverage: yup.object().shape({
        enabledProducts: yup.array().optional().nullable(),
        enableHiring: yup.array().optional().nullable(),
        manuallyAssignUser: yup.boolean().optional().nullable(),
      }),

      communication: yup.object().shape({
        openingOfServices: yup.boolean().optional().nullable(),
        changesInService: yup.boolean().optional().nullable(),
        disableNotifications: yup.boolean().optional().nullable(),
        pendingFirstAccess: yup.boolean().optional().nullable(),
      }),

      financial: yup.object().shape({
        valuePerUserCovered: yup.object().shape({
          manager: yup.string().optional().nullable(),
          employee: yup.string().optional().nullable(),
          student: yup.string().optional().nullable(),
        }),

        costCenter: yup.string().optional().nullable(),
        emails: yup.string().optional().nullable(),
      }),
    })
    .when('organization.organizationType', {
      is: (organizationType: OrganizationType) => organizationType === OrganizationType.INSTITUTION,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
})
