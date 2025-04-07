import { decrypt } from '@/utils/encrypt'
import cookies, { getCookies } from '@/utils/manage-cookies'
import { MePermissions } from '@/v3/domain/@v2/users/user-me-permissions.model'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { ActivationStatusEnum } from '@/v3/infra/services/login/login'
import { extractUrlTokens } from '@/v3/utils/extractUrlTokens'

export interface AuthState {
  accessToken?: string
  refreshToken?: string
  user?: UserModel
  institutionalSettings?: { name: string }[]
  selectedInstitution?: number
  selectedChildren?: number
  selfAccess?: boolean
  activationStatus?: ActivationStatusEnum
  token?: { attendanceOnly?: boolean; surveyOnly?: boolean }
  permissions?: MePermissions[]
  hasChildren?: boolean
  hasSubscription?: boolean
  redirectPage?: string
  userId?: number
}

class AuthStorageClass {
  userId?: number
  accessToken?: string
  refreshToken?: string
  selectedChildren?: number
  selectedInstitution?: number
  selfAccess?: boolean
  hasChildren?: boolean
  hasSubscription?: boolean
  saveRedirectRoute?: boolean = true
  private data: AuthState

  constructor() {
    this.data = {}
    this.get()
  }

  private generateData() {
    this.data = {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      selectedInstitution: this.selectedInstitution,
      selectedChildren: this.selectedChildren,
      selfAccess: this.selfAccess,
      hasChildren: this.hasChildren,
      hasSubscription: this.hasSubscription,
      userId: this.userId,
    }
  }

  get() {
    if (typeof window !== 'undefined') {
      let data = getCookies('AT') as AuthState

      const { accessToken, refreshToken } = extractUrlTokens()

      if (!data.accessToken && accessToken) data.accessToken = accessToken
      if (!data.refreshToken && refreshToken) data.refreshToken = refreshToken

      if (!data) {
        const storageDate = localStorage.getItem('AT')
        data = data ? JSON.parse(decrypt(storageDate || '')) : {}
      }
      this.accessToken = data?.accessToken
      this.refreshToken = data?.refreshToken
      this.selectedInstitution = data?.selectedInstitution
      this.selectedChildren = data?.selectedChildren
      this.selfAccess = data?.selfAccess
      this.hasChildren = data?.hasChildren
      this.hasSubscription = data?.hasSubscription
      this.userId = data?.userId || data?.user?.id
    }
    this.data = {}
    this.generateData()
    return this.data?.accessToken ? this.data : {}
  }

  set(params: Partial<AuthState>) {
    this.accessToken = params.hasOwnProperty('accessToken') ? params?.accessToken : this.accessToken
    this.hasChildren = params.hasOwnProperty('hasChildren') ? params?.hasChildren : this.hasChildren
    this.hasSubscription = params.hasOwnProperty('hasSubscription')
      ? params?.hasSubscription
      : this.hasSubscription
    this.refreshToken = params.hasOwnProperty('refreshToken')
      ? params?.refreshToken
      : this.refreshToken
    this.selectedChildren = params.hasOwnProperty('selectedChildren')
      ? params?.selectedChildren
      : this.selectedChildren
    this.selectedInstitution = params.hasOwnProperty('selectedInstitution')
      ? params?.selectedInstitution
      : this.selectedInstitution
    this.selfAccess = params.hasOwnProperty('selfAccess') ? params?.selfAccess : this.selfAccess
    this.userId = params.hasOwnProperty('selfAccess') ? params?.userId : this.userId
    this.generateData()
    // FIXME: Está salvando o mesmo dados em cookies e localStorage
    // O tamanho do cookie que está sendo salvo está ficando muito grande
    // Em usuários com muitos perfis, parece que o cookie nao salva.
    // Reduzir o tamanho do cookie e usar somente ele, ou migrar para localStorage e corrigir o app.
    cookies.set('AT', this.data, { expires: 365, sameSite: 'strict' })
  }

  logout() {
    this.accessToken = undefined
    this.refreshToken = undefined
    this.selectedChildren = undefined
    this.selectedInstitution = undefined
    this.selfAccess = undefined
    this.hasChildren = undefined
    this.userId = undefined
    cookies.remove('AT')
    this.data = {}
  }
}

export const AuthStorage = new AuthStorageClass()
