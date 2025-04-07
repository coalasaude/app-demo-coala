import * as yup from 'yup'

import {
  MeansContact,
  UserContact,
  PatientEvolution,
  TypeAssistance,
  AdherenceToTreatment,
  WhoLibered,
} from '@/v3/domain/follow-up'

export const schema = yup.object({
  means_contact: yup
    .string()
    .oneOf([MeansContact.CHAT, MeansContact.EMAIL, MeansContact.WHATS_APP, MeansContact.TELEPHONE])
    .required(),
  user_made_contact: yup
    .string()
    .oneOf([UserContact.COLLABORATOR, UserContact.OTHER, UserContact.RESPONSIBLE])
    .required(),
  adherence_to_treatment: yup
    .string()
    .oneOf([
      AdherenceToTreatment.COMPLETED,
      AdherenceToTreatment.CONTINUOUS,
      AdherenceToTreatment.DISCONTINUED,
      AdherenceToTreatment.INTERMITTENT,
      AdherenceToTreatment.NOT_STARTED,
    ])
    .nullable(),
  date_of_contact: yup.date().required(),
  time_of_contact: yup.date().required(),
  successful_contact: yup.boolean().required(),
  face_to_face_assistance: yup.boolean().required(),
  type_assistance: yup
    .string()
    .oneOf([
      TypeAssistance.DENTISTRY,
      TypeAssistance.HOSPITAL,
      TypeAssistance.OPHTHALMOLOGY,
      TypeAssistance.ORTHOPEDICS,
      TypeAssistance.OTORHINOLARYNGOLOGY,
      TypeAssistance.PEDIATRIC_ASSISTANT,
    ])
    .nullable(),
  name_assistance: yup.string(),
  contact_assistance: yup.string(),
  change_conduct: yup.boolean().required(),
  detail: yup.string(),
  being_monitored: yup.boolean().required(),
  patient_evolution: yup
    .string()
    .oneOf([
      PatientEvolution.BETTER,
      PatientEvolution.MAINTAINED,
      PatientEvolution.WORST,
      PatientEvolution.RETRIEVED,
    ])
    .nullable(),
  who_libered: yup.string().oneOf([WhoLibered.COALA, WhoLibered.EXTERNAL_PROFESSIONAL]).nullable(),
  user_without_access: yup.string(),
  date_next_contact: yup.date().required(),
  time_next_contact: yup.date().required(),
  user_id: yup
    .string()
    .when('user_without_access', {
      is: (user_without_access: string) => !user_without_access,
      then: (schema) => schema.required(),
    })
    .nullable(),
}) as any
