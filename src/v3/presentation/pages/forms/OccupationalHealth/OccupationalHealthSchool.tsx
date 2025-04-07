import { usePostHog } from 'posthog-js/react'

import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useModalContext } from '@/v3/presentation/components/Modal'

import { ContainerBackgroundGrid } from './components/ContainerBackgroundGrid'
import { HeaderSection } from './components/HeaderSection'
import { BenefitsSection } from './components/BenefitsSection'
import { SupportSection } from './components/SupportSection'

import FooterSupportOccupational from '/public/assets/svg/OccupationalHealth/FooterSupportOccupational.svg'
import HeaderOccupational from '/public/assets/svg/OccupationalHealth/HeaderOccupational.svg'

import { benefits, benefitsText, description, titles } from './constants'
import { ModalOccupational } from './components/ModalOccupational'

export const OccupationalHealthSchool = () => {
  const { getCount } = usePageTimeCounter()
  const { handleModal } = useModalContext()
  const posthog = usePostHog()
  const button = 'Quero saber mais'

  const onClick = () => {
    posthog.capture('clicked_occupational_health_school_scheduled', {
      time_spent: getCount(),
    })

    handleModal(<ModalOccupational />)
  }

  return (
    <ContainerBackgroundGrid>
      <HeaderSection
        title={titles.header}
        description={description.header}
        Svg={HeaderOccupational}
        buttonText={button}
        onButtonClick={onClick}
      />

      <BenefitsSection
        title={benefitsText.title}
        subtitle={benefitsText.subtitle}
        benefits={benefits}
      />

      <SupportSection
        title={titles.support}
        description={description.support}
        subDescription={description.subSupport}
        Svg={FooterSupportOccupational}
        buttonText={button}
        onButtonClick={onClick}
      />
    </ContainerBackgroundGrid>
  )
}

export default OccupationalHealthSchool
