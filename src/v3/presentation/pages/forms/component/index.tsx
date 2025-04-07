import { useEffect, useState } from 'react'

import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { InstitutionConfigEnum } from '@/constants/institutionConfig'

export const TypeFormComponent = ({ dataName }: { dataName: string }) => {
  const { auth } = useAuth()
  const [hasMentalHealth, setHasMentalHealth] = useState(false)
  const institutionIds = auth?.user?.getInstitutionsIds()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const institutionDataArray =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    institutionIds?.map((institutionId) => useFetchInstitution(institutionId)) || []

  useEffect(() => {
    if (institutionDataArray.length === 0) return

    institutionDataArray.forEach(({ data }) => {
      if (data) {
        const mentalHealthSetting = data.institutionSettings.find(
          (setting) =>
            setting.name === InstitutionConfigEnum.MENTAL_HEALTH_PRODUCT &&
            setting.value === 'true',
        )
        if (mentalHealthSetting) {
          setHasMentalHealth(true)
        }
      }
    })
  }, [institutionDataArray])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://embed.typeform.com/next/embed.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const hiddenFields = {
    email: auth?.user?.email || '',
    name: auth?.user?.name || '',
    user_id: auth?.user?.id || '',
    colaborador: ['Colaborador', 'Gestor'].includes(auth?.user?.getProfileNames().join(' ') || ''),
    responsavel: !!auth?.user?.isResponsible,
    saude_mental: hasMentalHealth,
    origem: auth?.user?.getProfileNames().join(' ') || '',
  }

  const hiddenFieldsQuery = hiddenFields
    ? Object.entries(hiddenFields)
        .map(
          ([key, value]) =>
            `${key}=${typeof value === 'string' ? value : encodeURIComponent(value)}`,
        )
        .join(',')
    : ''

  return (
    <div
      data-tf-live={dataName}
      data-tf-hidden={hiddenFieldsQuery}
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    ></div>
  )
}

export default TypeFormComponent
