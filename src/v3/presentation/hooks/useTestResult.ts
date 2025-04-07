import { getTestResult } from '@/v3/infra/services/course'

export const useTestResult = () => {
  const handleTestResult = async (moduleId: number) => {
    const res = await getTestResult(moduleId)
    return res.data
  }
  return {
    handleTestResult,
  }
}
