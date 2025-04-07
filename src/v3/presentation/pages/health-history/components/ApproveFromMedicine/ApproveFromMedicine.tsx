import dayjs from 'dayjs'

import { CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'
import { MedicineModel } from '@/v3/domain/@v2/health-history/medicine/medicine.model'
import { CContainerContent } from '@/v3/presentation/newComponents'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'

export const ApproveFromMedicine = ({ medicine }: { medicine: MedicineModel }) => {
  const renderAdditionalComponents = () => {
    if (medicine.isSOS && medicine.isContinuousUsage) {
      return null
    }
    if (
      (medicine.isSOS && !medicine.isContinuousUsage) ||
      (!medicine.isSOS && !medicine.isContinuousUsage)
    ) {
      return (
        <>
          <GridItem xs={6}>
            <CDatePickerControlled name='startDate' label='Data de início*' maxDate={dayjs()} />
          </GridItem>
          <GridItem xs={6}>
            <CTimePickerControlled name='startHour' label='Hora de início*' />
          </GridItem>
        </>
      )
    } else if (!medicine.isSOS && medicine.isContinuousUsage) {
      return (
        <GridItem xs={6} sm={6}>
          <GridItem xs={6}>
            <CTimePickerControlled name='startHour' label='Hora do início*' />
          </GridItem>
        </GridItem>
      )
    }
    return null
  }
  return (
    <CContainerContent>
      <GridWrapper spacing={spacing(3)}>
        <GridItem xs={12}>
          <CSwitchControlled name='isUsingMedicine' label='Fazendo uso do medicamento' />
        </GridItem>
        {renderAdditionalComponents()}
      </GridWrapper>
    </CContainerContent>
  )
}
