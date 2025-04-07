import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { readExam, ReadExamParams } from '@/v3/infra/services/@v2/appointment/exam/read-exam'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadExam = (params: ReadExamParams) => {
  const { data, ...response } = useFetch({
    queryFn: async () => { return readExam(params) },
    queryKey: [QueryKeyEnum.APPOINTMENT_EXAM, params.appointmentId, params.examId],
  })

  return {
    ...response,
    exam: data,
  }
}
