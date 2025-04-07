import 'i18next'

import common from '../../public/locales/pt/translation.json'

const resources = {
  common,
} as const

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof resources
  }
}
