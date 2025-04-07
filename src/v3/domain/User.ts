import dayjs, { Dayjs } from 'dayjs'

import { Address } from '@/types/address'
import { Genre } from '@/types/genre'
import { Institution as InstitutionType } from '@/types/institution'
import { UserStatus } from '@/types/user'
import { capitalizeName } from '@/utils/capitalizeName'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { ProfileType } from '@/types/profile'

import { SchemaTypeEnum } from '../presentation/enums/schema-types.enum'

import { TApiUserResponse } from './api/ApiUserResponse'
import { UserProfile } from './UserProfile'
import { Subscription } from './Subscription'
import { TApiImageResponse } from './api/ApiImageResponse'
import { GeneralInformation } from './GeneralInformation'
import { MeasureBodyMassIndex } from './MeasureBodyMassIndex'
import { HealthInsurance } from './HealthInsurance'
import { ProfessionalReference } from './ProfessionalReference'
import { Institution } from './Institution'

/**
 * @deprecated - Use userModel from backend v2
 */
export class User {
  id?: number
  cpf?: string | null
  email?: string | null
  name?: string | null
  lastname?: string | null
  lastName?: string | null
  socialName?: string | null
  telephone?: string | null
  birthday?: string | Dayjs | null
  genre?: Genre | null
  status?: UserStatus
  createdAt?: Date
  updatedAt?: Date
  institutions: InstitutionType[] = []
  address: Address[] = []
  certificateUrl?: string | null
  validTelephone?: boolean | null
  validEmail?: boolean | null
  hasPassword?: boolean
  responsible: User[] = []
  responsable?: TApiUserResponse[] = []
  childrens: User[] = []
  userImage?: TApiImageResponse | null
  subscription: Subscription[] = []
  userProfile?: UserProfile[] = []
  generalInformation?: GeneralInformation
  measureBodyMassIndex?: MeasureBodyMassIndex[]
  healthInsurance?: HealthInsurance[]
  professionalReference?: ProfessionalReference[]
  url?: string

  constructor(params: TApiUserResponse) {
    if (!params) return
    this.id = params.id
    this.cpf = params.cpf
    this.email = params.email
    this.name = params.name
    this.lastname = params.lastname || params.lastName
    this.lastName = params.lastName || params.lastname
    this.socialName = params.social_name
    this.telephone = params.telephone
    this.birthday = params.birthday
    this.genre = params.genre
    this.status = params.status
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.institutions = params.institutions || []
    this.address = params.address || []
    this.certificateUrl = params.certificate_url || null
    this.validTelephone = params.valid_telephone
    this.validEmail = params.valid_email
    this.hasPassword = params.hasPassword
    this.url = params.url
    this.responsible =
      params?.responsable?.map?.((responsable) => new User(responsable.responsable)) || []
    this.childrens = params?.childrens?.map?.((children) => new User(children.children)) || []
    this.userImage = params.UserImage
    this.subscription =
      params.Subscription?.map((subscription) => new Subscription(subscription)) || []

    if (params.UserProfile) {
      this.userProfile = params.UserProfile?.map((userProfile) => new UserProfile(userProfile))
    }

    if (params.responsible) {
      this.responsable = params.responsible?.map?.(({ responsable }) => responsable)
    }

    if (params.userProfile) {
      this.userProfile = params.userProfile?.map((userProfile) => new UserProfile(userProfile))
    }

    if (params.generalInformation) {
      this.generalInformation = new GeneralInformation(params.generalInformation)
    }

    if (params.GeneralInformation) {
      this.generalInformation = new GeneralInformation(params.GeneralInformation)
    }

    if (params.measureBodyMassIndex) {
      this.measureBodyMassIndex = params.measureBodyMassIndex.map(
        (measureBodyMassIndex) => new MeasureBodyMassIndex(measureBodyMassIndex),
      )
    }

    if (params.MeasureBodyMassIndex) {
      this.measureBodyMassIndex = params.MeasureBodyMassIndex.map(
        (measureBodyMassIndex) => new MeasureBodyMassIndex(measureBodyMassIndex),
      )
    }

    if (params.HealthInsurance) {
      this.healthInsurance = params.HealthInsurance.map(
        (healthInsurance) => new HealthInsurance(healthInsurance),
      )
    }

    if (params.ProfessionalReference) {
      this.professionalReference = params.ProfessionalReference.map(
        (professionalReference) => new ProfessionalReference(professionalReference),
      )
    }
  }

  getFullNameWithCpf() {
    if (this.name && this.lastName)
      return User.formatFullNameWithCPF(this.name, this.lastName, this.cpf ?? undefined)

    return null
  }

  getProfilesText() {
    const profiles = this.userProfile
      ?.map((UserProfile: UserProfile) => UserProfile?.profile?.name)
      .filter((name) => !!name)
      .filter((name, index, self) => self.indexOf(name) === index)

    if (this.childrens?.length) {
      profiles?.push('Responsável')
    }

    return profiles?.length ? profiles.join(' / ') : 'Sem perfis'
  }

  getStatusFormatted() {
    if (this.status === UserStatus.ACTIVE) return { label: 'Ativo', schema: SchemaTypeEnum.SUCCESS }
    if (this.status === UserStatus.INACTIVE)
      return { label: 'Inativo', schema: SchemaTypeEnum.ERROR }
    if (this.status === UserStatus.FIRST_ACCESS)
      return { label: 'Pendente', schema: SchemaTypeEnum.WARNING }
    if (this.status === UserStatus.NO_ACCESS)
      return { label: 'Sem acesso', schema: SchemaTypeEnum.NEUTRAL }
    if (this.status === UserStatus.TRIAL)
      return { label: 'Teste gratuito', schema: SchemaTypeEnum.BRAND }

    return { label: '', schema: SchemaTypeEnum.NEUTRAL }
  }

  getFullName() {
    if (this.name && this.lastName)
      return `${capitalizeName(this.name)} ${capitalizeName(this.lastName)}`

    return null
  }

  getFormattedName() {
    if (this.name && this.lastName) {
      return `${capitalizeName(this.name)} ${capitalizeName(this.lastName)}`
    } else if (this.name && this.lastname) {
      return `${capitalizeName(this.name)} ${capitalizeName(this.lastname)}`
    } else if (this.name) {
      return capitalizeName(this.name)
    }

    return 'Não cadastrado'
  }

  getNumResponsibleText() {
    if (this.responsible?.length) {
      if (this.responsible.length == 1) return `1 responsável`
      return `${this.responsible.length} responsáveis`
    }
    return ''
  }

  getFormattedPhone() {
    if (!this.telephone) return ''

    return formatPhoneNumber(this.telephone)
  }

  getAge() {
    const date = dayjs(this.birthday)
    const today = dayjs()
    return today.diff(date, 'years')
  }

  static formatName(name?: string, lastName?: string) {
    if (name && lastName) {
      return `${capitalizeName(name)} ${capitalizeName(lastName)}`
    } else if (name && lastName) {
      return `${capitalizeName(name)} ${capitalizeName(lastName)}`
    } else if (name) {
      return capitalizeName(name)
    }

    return 'Não cadastrado'
  }

  static formatFullNameWithCPF(name?: string, lastName?: string, cpf?: string) {
    if (name && lastName && cpf) {
      return `${capitalizeName(name)} ${capitalizeName(lastName)} (${cpf})`
    } else if (name && lastName && !cpf) {
      return `${capitalizeName(name)} ${capitalizeName(lastName)}`
    }

    return 'Não cadastrado'
  }

  getFormatedBirthday() {
    if (this.birthday) return dayjs(this.birthday).format('DD/MM/YYYY')

    return ''
  }

  getFormattedHeight() {
    if (this.measureBodyMassIndex?.length) {
      this.measureBodyMassIndex.sort((a, b) => {
        return dayjs(a.measurementDate).diff(dayjs(b.measurementDate))
      })
      const mostRecentBodyMass = this.measureBodyMassIndex[this.measureBodyMassIndex.length - 1]

      if (mostRecentBodyMass?.height) {
        return `${mostRecentBodyMass.height}cm`
      }
    }

    return ''
  }

  getFormattedWeight() {
    if (this.measureBodyMassIndex?.length) {
      this.measureBodyMassIndex.sort((a, b) => {
        return dayjs(a.measurementDate).diff(dayjs(b.measurementDate))
      })
      const mostRecentBodyMass = this.measureBodyMassIndex[this.measureBodyMassIndex.length - 1]
      if (mostRecentBodyMass?.weight) {
        return `${mostRecentBodyMass.weight}kg`
      }
    }

    return ''
  }

  getFormattedGenderAndAge() {
    if (this.genre && this.birthday) {
      return `${this.genre} - ${this.getAge()} anos`
    } else if (this.genre && !this.birthday) {
      return `${this.genre}`
    } else if (!this.genre && this.birthday) {
      return `${this.getAge()} anos`
    }

    return ''
  }

  getGenreArticle() {
    if (this.genre === Genre.Masculino) {
      return 'o'
    } else if (this.genre === Genre.Feminino) {
      return 'a'
    }

    return 'e'
  }

  getPassword() {
    return this.hasPassword ? '******' : '-'
  }

  getProfileName(institutionId?: number) {
    const userProfile = this.userProfile?.find(
      ({ institutionId: institution_id, profile }) =>
        (institution_id === institutionId || institution_id === null) && profile?.name,
    )
    return userProfile?.profile?.name
  }

  getInstitutionFantasyNameInAGroup() {
    return (
      this.userProfile?.reduce(
        (
          group: Record<
            string,
            {
              institution: Institution | undefined
              institutionId: number | undefined
              profiles: (string | undefined)[]
              profile_id: (number | undefined)[]
              is_coverage: boolean | undefined
              id: number | undefined
              is_health_leader: boolean | undefined
              hasProfileWithAccess: boolean | undefined
            }
          >,
          { profile: profile_user, institution, isCoverage: is_coverage, id, institutionId },
        ) => {
          const { fantasyName } = institution || {}
          const fantasy_name = fantasyName ? fantasyName : 'Coala'
          const { name } = profile_user || {}
          const is_health_leader = this.userProfile?.some(
            ({ isHealthLeader, institutionId: institutionIdMap }) =>
              isHealthLeader && institutionIdMap === institutionId,
          )
          if (fantasy_name in group) {
            group[fantasy_name].profiles.push(name) && group[fantasy_name].profile_id.push(id)
          } else {
            const hasProfileWithAccess = this.userProfile?.some(
              ({ profile }) => profile?.type === ProfileType.NORMAL,
            )

            group[fantasy_name] = {
              institution,
              institutionId,
              profiles: [name],
              profile_id: [id],
              is_coverage,
              id,
              is_health_leader,
              hasProfileWithAccess,
            }
          }

          return group
        },
        {},
      ) || {}
    )
  }

  hasProfileName(profileName: string): boolean {
    return this.userProfile?.some((e) => e?.profile?.name === profileName) || false
  }

  hasProfileType(profileType: ProfileType): boolean {
    return this.userProfile?.some((e) => e?.profile?.type === profileType) || false
  }

  hasResponsible() {
    const responsable = this.responsable?.some((e) => e?.id)
    const responsible = this.responsible?.some((e) => e?.id)
    const hasResponsible = responsable || responsible

    return hasResponsible
  }

  isMedicalProfile(): boolean {
    return (
      this.userProfile?.some(
        (e) =>
          e?.profile &&
          e.profile.type === ProfileType.MEDICAL &&
          e.profile.registrationDescription === 'CRM',
      ) || false
    )
  }

  static isMedical(userProfile?: UserProfile[]): boolean {
    if (!userProfile) return false

    return (
      userProfile?.some(
        (e) =>
          e?.profile &&
          e.profile.type === ProfileType.MEDICAL &&
          e.profile.registrationDescription === 'CRM',
      ) || false
    )
  }

  isUserResponsible(responsibleId?: number): boolean {
    if (!responsibleId) return false
    return this.responsible?.some((e) => e.id === responsibleId) || false
  }

  isSameOrResponsible(userId?: number): boolean {
    const isSameUser = this.id === userId
    const isResponsible = this.isUserResponsible(userId)

    return isSameUser || isResponsible
  }
}
