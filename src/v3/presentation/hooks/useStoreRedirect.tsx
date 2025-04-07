import { getMobileOperatingSystem } from '@/utils/getMobileOperationSystem'

export const useStoreRedirect = () => {
  const operationSystem = getMobileOperatingSystem()

  function onGoToStore(params?: { fallBack: () => void }) {
    if (operationSystem === 'iOS') {
      window.location.href = 'https://apps.apple.com/us/app/coala-sa%C3%BAde/id1640751439'
    } else if (operationSystem === 'Android' || operationSystem === 'Windows Phone') {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.coala.appcoala'
    } else {
      params?.fallBack()
    }
  }

  return { onGoToStore }
}
