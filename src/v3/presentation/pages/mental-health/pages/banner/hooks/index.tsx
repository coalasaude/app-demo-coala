import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'

export const useTherapyBanner = () => {
  const SchoolProfileFlag = useFeatureFlag({
    flag: FeatureFlag.THERAPY_SCHOOL_BANNER,
  })

  const ResponsibleFlag = useFeatureFlag({
    flag: FeatureFlag.THERAPY_RESPONSIBLE_BANNER,
  })

  const isSchoolProfile = SchoolProfileFlag.isActive
  const isResponsible = ResponsibleFlag.isActive && !isSchoolProfile

  return {
    isSchoolProfile,
    isResponsible,
  }
}
