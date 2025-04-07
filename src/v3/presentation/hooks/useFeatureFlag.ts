import { usePostHog } from 'posthog-js/react'

import { FeatureFlag, FeatureFlagMap } from '../constants/feature-flag.constants'
import { useFeatureFlagContext } from '../contexts/feature-flags/FeatureFlagProvider'

type VariantsForFlag<F extends FeatureFlag> = F extends keyof typeof FeatureFlagMap
  ? keyof (typeof FeatureFlagMap)[F]['variants'] | undefined
  : never

interface FeatureFlagProps<F extends FeatureFlag> {
  flag: F
  variant?: VariantsForFlag<F>
}

export const useFeatureFlag = <F extends FeatureFlag>({ flag, variant }: FeatureFlagProps<F>) => {
  const posthog = usePostHog()
  useFeatureFlagContext()

  const value = posthog.getFeatureFlag(FeatureFlagMap[flag].key)
  const variants = FeatureFlagMap[flag].variants
  const activeVariant = variant && variants && value == (variants as any)[variant]
  const activeFlag = !variant && value

  const payload = posthog.getFeatureFlagPayload(
    FeatureFlagMap[flag].key,
  ) as (typeof FeatureFlagMap)[F] extends { payload: infer P } ? P : undefined
  if (activeFlag || activeVariant) return { isActive: true, payload }

  return { isActive: false }
}
