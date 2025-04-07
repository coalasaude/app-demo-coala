import { AUTHENTICATED_ROUTES } from '@/constants/routes'
import { INSTITUTION_ROLES, STUDENT_ROLES } from '@/types/role'

/**
 * Lista de rotas base que são protegidas. Todas as subRotas desta rota também terão proteção
 * Exemplo: /manager/rota_base/subRotas
 * @returns {number} setParams, params
 */
export const PROTECTED_BASE_ROUTES = {
  [AUTHENTICATED_ROUTES.HEALTH_HISTORIC]: [...INSTITUTION_ROLES, ...STUDENT_ROLES],
}
