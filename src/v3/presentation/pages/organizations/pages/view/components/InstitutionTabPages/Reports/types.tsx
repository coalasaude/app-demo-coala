import { Brand, Institution, Network } from '@/v3/domain/organizations/Organization'

export type IRepostType = {
  data: Institution | Network | Brand
  type: 'institution' | 'brand' | 'network'
}
