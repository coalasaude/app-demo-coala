import { CalendarSettingsDays, FrequencyInterval } from '@/constants/mentalHealth'

type GeneratePeiRequest = {
  frequency?: FrequencyInterval
  days?: CalendarSettingsDays[]
  ageYears?: number
  ageMonths?: number
  duration?: number
  specialCondition?: string
  difficulties?: string
  objective?: string
}

type GeneratePeiResponse = {
  category: string
  tasks: {
    subcategory: string
    goal: string
    assistiveTechnologies: string
    curricularAdaptations: string
    proposedActivities: string
  }[]
}

export const fetchGeneratePeiAI = async (
  data: GeneratePeiRequest,
): Promise<GeneratePeiResponse[]> => {
  const response = await fetch('/api/ai/generate-pei', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch PEI/PDI data')
  }

  const result = await response.json()

  return result.data
}
