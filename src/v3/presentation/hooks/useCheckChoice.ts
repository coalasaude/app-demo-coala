import { getCheckChoice } from '@/v3/infra/services/course'

export const useCheckChoice = () => {
  const handleCheckChoice = async (choiceId: number) => {
    const res = await getCheckChoice(choiceId)
    return res.data[0]
  }

  return {
    handleCheckChoice,
  }
}
