export interface IGeneralDataFromProps<T = any, R = any> {
  bloodTypeOptions: {
    value: T
    label: string
  }[]
  genderOptions: {
    value: R
    label: string
  }[]
  prefixName?: string
}
