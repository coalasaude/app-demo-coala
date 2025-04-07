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
    email: yup.string().email().required(),
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
      .test('is-valid-phone', 'Telefone inválido', (value) => {
        if (!value) return true
        return !!value && isValidPhone(cleanTelephone(value))
      })
      .transform(onlyNums),
  }),

  address: yup.object().shape({
    zipCode: yup.string().optional().transform(onlyNums),
    city: yup.string().optional(),
    state: yup
      .string()
      .optional()
      .test('len', 'Deve ter 2 caracteres', (value) => value?.length === 2 || !value),
    street: yup.string().optional(),
    number: yup.string().optional(),
    complement: yup.string().optional(),
    block: yup.string().optional(),
    neighborhood: yup.string().optional(),
  }),

  financial: yup.object().shape({
    responsableFinance: yup.string().optional(),
    dueDate: yup.string().optional(),

    bank: yup.object().shape({
      bank: yup.string().optional(),
      agency: yup.string().optional(),
      account: yup.string().optional(),
      pixKey: yup.string().optional(),
    }),
  }),

  links: yup.object().shape({
    network: yup.object().shape({
      brands: yup.array().optional(),
    }),

    brand: yup.object().shape({
      network: yup.number().optional(),
    }),

    institution: yup.object().shape({
      brand: yup.number().optional(),
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
        emergency: yup.array().optional(),
        amenities: yup.number().optional(),
        accidentCoverage: yup.array().optional(),
        accidentCoverageValue: yup.string().optional(),
        mentalHealthModule: yup.array().optional(),
      }),

      coalaAtHome: yup.object().shape({
        enableHiring: yup.array().optional(),
        plan: yup.string().optional(),
      }),

      extendedCoverage: yup.object().shape({
        enabledProducts: yup.array().optional(),
        enableHiring: yup.array().optional(),
        manuallyAssignUser: yup.boolean().optional(),
      }),

      communication: yup.object().shape({
        openingOfServices: yup.boolean().optional(),
        changesInService: yup.boolean().optional(),
        disableNotifications: yup.boolean().optional(),
        pendingFirstAccess: yup.boolean().optional(),
      }),

      financial: yup.object().shape({
        valuePerUserCovered: yup.object().shape({
          manager: yup.string().optional(),
          employee: yup.string().optional(),
          student: yup.string().optional(),
        }),

        costCenter: yup.string().optional(),
        emails: yup.string().optional(),
        infringement: yup.boolean().required(),
        latePayment: yup.boolean().required(),
      }),
    })
    .when('organization.organizationType', {
      is: (organizationType: OrganizationType) => organizationType === OrganizationType.INSTITUTION,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
}) as any
