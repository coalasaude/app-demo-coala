import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import apiRequest from '../../../../api'

interface AcademicInterestArea {
  category: InterestAreaCategory.ACADEMIC
  interestSubjectIds: number[]
  proficientSubjectIds?: number[]
  observation?: string
}

interface ExtracurricularInterestArea {
  category: InterestAreaCategory.EXTRACURRICULAR
  interests: string
  proficients?: string
  observation?: string
}

interface OtherInterestArea {
  category: InterestAreaCategory.OTHERS
  title: string
  observation?: string
}

export interface AddManyMentalHealthAreaOfInterestParams {
  userId: number
  interestAreas: (AcademicInterestArea | ExtracurricularInterestArea | OtherInterestArea)[]
}

export async function addManyMentalHealthAreaOfInterest({
  userId,
  ...body
}: AddManyMentalHealthAreaOfInterestParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/users/:userId/mental-health/records/interest-areas',
    body: body,
    pathParams: { userId },
  })
}
