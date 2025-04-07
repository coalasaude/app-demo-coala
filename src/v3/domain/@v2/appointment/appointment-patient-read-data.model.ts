import dayjs from 'dayjs'

import { Genre } from '@/types/genre'
import {
  getMinimumEstimatedWeightBoy,
  getMinimumEstimatedWeightGirl,
} from '@/v3/utils/minimum-weight'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'

type ResponsibleModelConstructor = {
  id: number
  email: string
  cpf: string
  name: string
  telephone: string
  lastName: string
}

export type PatientModelConstructor = {
  id: number
  email: string
  cpf: string
  name: string
  telephone: string
  lastName: string
  socialName: string
  birthday: Date
  genre: string
  responsible: ResponsibleModelConstructor[]
  profileNames: string[]
  allergies: string[]
  deniesAllergies: boolean
}

export class PatientModel {
  public readonly id: number
  public readonly email: string
  public readonly cpf: string
  public readonly name: string
  public readonly telephone: string
  public readonly lastName: string
  public readonly socialName: string
  public readonly birthday: Date
  public readonly genre: string
  public readonly responsible: ResponsibleModelConstructor[]
  public readonly profileNames: string[]
  public readonly allergies: string[]
  public readonly deniesAllergies: boolean

  constructor(props: PatientModelConstructor) {
    this.id = props.id
    this.email = props.email
    this.cpf = props.cpf
    this.name = props.name
    this.telephone = props.telephone
    this.lastName = props.lastName
    this.socialName = props.socialName
    this.birthday = props.birthday
    this.genre = props.genre
    this.responsible = props.responsible
    this.profileNames = props.profileNames
    this.allergies = props.allergies
    this.deniesAllergies = props.deniesAllergies
  }

  getPatientAllergies() {
    if (this.allergies.length)
      return this.allergies.map((allergy) => nameNormalizer(allergy)).join(', ')

    if (this.deniesAllergies) return 'Negou alergias'

    return ''
  }

  getPatientAge() {
    if (!this.birthday) return null

    const date = dayjs(this.birthday)
    const today = dayjs()
    const years = today.diff(date, 'years')
    const months = today.diff(date, 'months') % 12
    const formattedMonths = `0.${months}`

    if (years <= 2) return Number(formattedMonths)
    return years
  }

  getPatientRole() {
    if (this.profileNames?.length === 0) return ''

    const role = this.profileNames?.map((name) => name).join(', ')
    return role
  }

  getWeightMinimumEstimatedWeight() {
    const age = this.getPatientAge()
    const genre = this.genre as Genre
    if (age === null || genre === null) return '-'

    if (genre === Genre.Masculino) return getMinimumEstimatedWeightBoy(age)

    return getMinimumEstimatedWeightGirl(age)
  }
}
