import { getQuizResult } from '@/v3/infra/services/course'

export const useQuizResult = () => {
  const handleQuizResult = async (moduleId: number) => {
    const res = await getQuizResult(moduleId)
    return res.data
  }
  return {
    handleQuizResult,
  }
}
