import { useFetchCourseUsers } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchCourseUsers'

import RankingCourseContent from './components/RankingCourse'

export const RankingCourse = ({ institutionId }: { institutionId: number }) => {
  const { data } = useFetchCourseUsers({ institutionId })

  return (
    <RankingCourseContent
      person={data || []}
      title='Lei Lucas'
      subtitle='Confira como está o andamento do curso da Lei Lucas dos seus colaboradores'
    />
  )
}

export default RankingCourse
