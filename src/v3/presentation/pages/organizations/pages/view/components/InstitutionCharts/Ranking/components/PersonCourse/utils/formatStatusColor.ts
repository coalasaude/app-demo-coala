import { PersonTypeStatus } from '../type'

const statusColorMap: { [key in PersonTypeStatus]: string } = {
  [PersonTypeStatus.IN_PROGRESS]: 'var(--mui-palette-primary-main)',
  [PersonTypeStatus.FINISHED]: 'var(--mui-palette-success-main)',
  [PersonTypeStatus.NOT_STARTED]: 'var(--mui-palette-grey-500)',
}

export const formatStatusColor = (status: PersonTypeStatus): string => {
  return statusColorMap[status] || 'var(--mui-palette-grey-500)'
}
