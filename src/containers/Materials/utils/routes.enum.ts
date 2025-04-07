import { EbookConfig } from '../Ebooks/config'
import { GuidanceLettersConfig } from '../GuidanceLetters/Clinic/config'
import { MentalHealthLettersConfig } from '../GuidanceLetters/MentalHealth/config'
import { ManualsConfig } from '../Manuals/config'
import { ClinicProtocolsConfig } from '../Protocols/Clinic/config'
import { MentalHealthProtocolsConfig } from '../Protocols/MentalHealth/config'
import { SchoolNutritionConfig } from '../SchoolNutrition/config'
import { SchoolPsychologyConfig } from '../SchoolPsychology/config'

import { getRoutes } from './getRoutes'

const createRoutes = (config: any, keys: string[]) => {
  return keys.reduce(
    (acc, key) => {
      acc[key] = getRoutes(config, key)
      return acc
    },
    {} as Record<string, any>,
  )
}

const routeKeys = [
  'primeiro',
  'segundo',
  'terceiro',
  'quarto',
  'quinto',
  'sexto',
  'setimo',
  'oitavo',
  'nono',
  'decimo',
  'decimoPrimeiro',
  'decimoSegundo',
  'decimoTerceiro',
  'decimoQuarto',
  'decimoQuinto',
  'decimoSexto',
  'decimoSetimo',
  'decimoOitavo',
  'decimoNono',
  'vigesimo',
]

export const routesSchoolNutrition = createRoutes(SchoolNutritionConfig, routeKeys)
export const routesSchoolPsychology = createRoutes(SchoolPsychologyConfig, routeKeys.slice(0, 4))
export const routesMentalHealthProtocols = createRoutes(
  MentalHealthProtocolsConfig,
  routeKeys.slice(0, 3),
)
export const routesClinicProtocols = createRoutes(ClinicProtocolsConfig, routeKeys.slice(0, 9))
export const routesManuals = createRoutes(ManualsConfig, routeKeys.slice(0, 2))
export const routesEbook = createRoutes(EbookConfig, routeKeys.slice(0, 2))
export const routesGuidanceLetters = createRoutes(GuidanceLettersConfig, routeKeys.slice(0, 9))
export const routesMentalHealth = createRoutes(MentalHealthLettersConfig, routeKeys.slice(0, 5))

export const getRoutesByTypeAndName = (type: string, name: string) => {
  const routeMap: Record<string, Record<string, any>> = {
    '/school-nutrition': routesSchoolNutrition,
    '/school-psychology': routesSchoolPsychology,
    '/protocols/mental-health': routesMentalHealthProtocols,
    '/protocols/clinic': routesClinicProtocols,
    '/manuals': routesManuals,
    '/ebook': routesEbook,
    '/guidance-letters/clinic': routesGuidanceLetters,
    '/guidance-letters/mental-health': routesMentalHealth,
  }

  const result = (routeMap[type]?.[name] as string) || ''

  return result
}
