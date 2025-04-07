import { Brand, Institution, Network } from '@/v3/domain/organizations/Organization'

type IFormReportOrganizationProps =
  | {
      data: Network
      isNetwork: true
      isInstitution?: false
      isBrand?: false
    }
  | {
      data: Institution
      isInstitution: true
      isNetwork?: false
      isBrand?: false
    }
  | {
      data: Brand
      isBrand: true
      isNetwork?: false
      isInstitution?: false
    }

export type IFormReportProps = { helperText?: string } & IFormReportOrganizationProps

export const getFormReportProps = (
  type: 'network' | 'institution' | 'brand',
  data: Network | Institution | Brand,
): IFormReportOrganizationProps => {
  if (type === 'network') {
    return { data: data as Network, isNetwork: true }
  } else if (type === 'brand') {
    return { data: data as Brand, isBrand: true }
  } else {
    return { data: data as Institution, isInstitution: true }
  }
}
