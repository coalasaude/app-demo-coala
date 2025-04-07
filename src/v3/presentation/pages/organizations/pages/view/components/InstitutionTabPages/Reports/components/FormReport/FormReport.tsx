import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { CAutoComplete, CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'

import { getReportType, ReportTypeEnum, ReportTypeMap } from '../../constants/report-type'
import { FormBrand } from '../FormBrand/FormBrand'
import { FormInstitution } from '../FormInstitution/FormInstitution'
import { FormNetwork } from '../FormNetwork/FormNetwork'

import { IFormReportProps } from './types'

export function FormReport({
  data,
  isBrand,
  isInstitution,
  isNetwork,
  helperText,
}: IFormReportProps) {
  const { watch } = useFormContext()

  const reportType = watch('type') as ReportTypeEnum
  const reportTypeSelected = getReportType(reportType)

  return (
    <Box>
      <GridWrapper spacing={spacing(2)} rowSpacing={spacing(2)} mb={spacing(3)}>
        <GridItem xs={12} md={6}>
          <CAutoComplete
            label='Selecione o tipo de relatório*'
            placeholder='Selecione o tipo de relatório*'
            name='reportType'
            options={[
              {
                label: ReportTypeMap[ReportTypeEnum.HEALTH_HISTORY].label,
                value: ReportTypeEnum.HEALTH_HISTORY,
              },
            ]}
          />
          {helperText && (
            <Typography variant='body2' mt={-1}>
              {helperText}
            </Typography>
          )}
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDatePickerControlled
            label='Selecione o mês*'
            disabled={reportTypeSelected.disabledPeriodSelect}
            name='period'
            views={['year', 'month']}
            maxDate={dayjs()}
            format='MMMM/YYYY'
          />
        </GridItem>
        {isNetwork && <FormNetwork data={data} />}
        {isBrand && <FormBrand data={data} />}
        {isInstitution && <FormInstitution data={data} />}
      </GridWrapper>
    </Box>
  )
}
