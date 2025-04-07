import { HealthInsuranceModel } from '@/v3/domain/@v2/users/health-insurance.model'

export type UserInfoHealthInsuranceProps = {
  healthInsurances: HealthInsuranceModel[]
  onAdd: () => void
  onDelete: (id: number) => void
  isLoading?: boolean
}
