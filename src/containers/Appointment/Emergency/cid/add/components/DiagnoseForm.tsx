import { Box } from '@mui/material'
import dayjs from 'dayjs'

import { CDatePickerControlled } from '@/components/Forms'
import { cidTypeOptions } from '@/constants/cid'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { CInputControlled } from '@/v3/presentation/newComponents'
import FilterCid from '@/v3/presentation/pages/appointment/Emergency/pages/view/components/Cid/add/components/FilterCid'

type DiagnoseFormProps = {
  diagnoseExternal: boolean
  prefix?: string
}

export const DiagnoseForm = ({ diagnoseExternal, prefix = '' }: DiagnoseFormProps) => {
  return (
    <>
      <Box mb={2}>
        <GridWrapper>
          <GridItem xs={12} md={12}>
            <Box display='flex' alignContent='center'>
              <CRadioButtonGroupControlled
                row
                name={prefix + 'diagnoseExternal'}
                label='É diagnóstico externo?'
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
            </Box>
          </GridItem>
        </GridWrapper>
      </Box>
      <Box mb={2}>
        <CRadioButtonGroupControlled
          row
          name={prefix + 'type'}
          label='Qual é o tipo de diagnóstico?'
          options={cidTypeOptions}
        />
      </Box>
      <Box>
        <GridWrapper>
          {diagnoseExternal && (
            <>
              <GridItem xs={12} md={6}>
                <CInputControlled
                  name={prefix + 'externalDocName'}
                  label='Nome do profissional'
                  placeholder='Digite o nome do profissional'
                />
              </GridItem>
              <GridItem xs={12} md={6}>
                <CInputControlled
                  name={prefix + 'externalDocCRM'}
                  label='Registro no conselho (CRM)'
                  placeholder='Digite o registro no conselho (CRM)'
                />
              </GridItem>
            </>
          )}
          <GridItem xs={12} md={6}>
            <FilterCid prefix={prefix} />
          </GridItem>
          <GridItem xs={12} md={6}>
            <CDatePickerControlled name={prefix + 'date'} label='Data' maxDate={dayjs()} />
          </GridItem>
        </GridWrapper>
      </Box>
    </>
  )
}

export default DiagnoseForm
