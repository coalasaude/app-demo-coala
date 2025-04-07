import { Complaint } from '@/types/complaint'

export const ComplaintDescription: Record<string, string> = {
  [Complaint.ALLERGY]: 'Alergia',
  [Complaint.PAIN]: 'Dor',
  [Complaint.FEVER]: 'Febre',
  [Complaint.SKIN_LESION]: 'Lesão de pele',
  [Complaint.FLU_SYMPTOMS]: 'Sintomas gripais',
  [Complaint.TRAUM]: 'Trauma',
  [Complaint.OTHERS]: 'Outros',
}

export const ComplaintClinicalOptions = [
  {
    label: ComplaintDescription[Complaint.ALLERGY],
    value: Complaint.ALLERGY,
  },
  {
    label: ComplaintDescription[Complaint.PAIN],
    value: Complaint.PAIN,
  },
  {
    label: ComplaintDescription[Complaint.FEVER],
    value: Complaint.FEVER,
  },
  {
    label: ComplaintDescription[Complaint.SKIN_LESION],
    value: Complaint.SKIN_LESION,
  },
  {
    label: ComplaintDescription[Complaint.FLU_SYMPTOMS],
    value: Complaint.FLU_SYMPTOMS,
  },
  {
    label: ComplaintDescription[Complaint.OTHERS],
    value: Complaint.OTHERS,
  },
]

export const ComplaintAccidentOptions = [
  {
    label: ComplaintDescription[Complaint.TRAUM],
    value: Complaint.TRAUM,
  },
]

export const ComplaintOptions = [
  {
    label: ComplaintDescription[Complaint.ALLERGY],
    value: Complaint.ALLERGY,
  },
  {
    label: ComplaintDescription[Complaint.PAIN],
    value: Complaint.PAIN,
  },
  {
    label: ComplaintDescription[Complaint.FEVER],
    value: Complaint.FEVER,
  },
  {
    label: ComplaintDescription[Complaint.SKIN_LESION],
    value: Complaint.SKIN_LESION,
  },
  {
    label: ComplaintDescription[Complaint.FLU_SYMPTOMS],
    value: Complaint.FLU_SYMPTOMS,
  },
  {
    label: ComplaintDescription[Complaint.TRAUM],
    value: Complaint.TRAUM,
  },
  {
    label: ComplaintDescription[Complaint.OTHERS],
    value: Complaint.OTHERS,
  },
]
