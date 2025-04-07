import { cloneElement, useMemo } from 'react'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { useTherapyBanner } from '@/v3/presentation/pages/mental-health/pages/banner/hooks'

import { TherapyContentBanner } from '../components/TherapyContentBanner'
import { TherapyResponsibleContentBanner } from '../components/TherapyResponsibleContentBanner'
import { BannerEnum } from '../types/banner.enum'

export const useMentalHealthBanner = () => {
  const { handleModal } = useModalContext()
  const { isResponsible, isSchoolProfile } = useTherapyBanner()

  const banners = useMemo(() => {
    const banners = []

    if (isSchoolProfile) {
      banners.push(<TherapyContentBanner key={BannerEnum.THERAPY_CONTENT} />)
    }

    if (isResponsible) {
      banners.push(<TherapyResponsibleContentBanner key={BannerEnum.THERAPY_RESPONSIBLE} />)
    }

    return banners
  }, [isResponsible, isSchoolProfile])

  const onOpenBannerModal = () => {
    const filterBanners = banners.filter(
      (banner) => banner.key?.includes('therapy') && !banner.key?.includes('responsible'),
    )

    if (filterBanners[0]) {
      const hasClicked = localStorage.getItem(BannerEnum.THERAPY_CONTENT)
      const now = new Date().getTime()
      const dateOpened = new Date(hasClicked || '')
      const last24Hours = 24 * 60 * 60 * 1000

      if (Boolean(hasClicked) === false || now - dateOpened.getTime() > last24Hours)
        return handleModal(cloneElement(filterBanners[0], { isModal: true }), { isQuiet: true })
    }
  }

  return { banners, onOpenBannerModal }
}
