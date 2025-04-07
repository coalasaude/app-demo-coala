import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { DebouncedFunc } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { CAutoComplete, CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'
import { CRadioGrid } from '@/v3/presentation/components/CRadioGrid'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'

import { otherDiseasesId } from '../../constant/other-diseases.const'

export interface IFormDiseaseProps<T = any> {
  diseaseCidOptions: {
    value: T
    label: string
  }[]
  prefixName?: string
  diseaseAutoCompleteChange: DebouncedFunc<(value: any) => void>
  handleAsyncUpload?: (file: File) => Promise<number>
}

export const FormDisease = ({
  diseaseCidOptions,
  prefixName = '',
  diseaseAutoCompleteChange,
  handleAsyncUpload,
}: IFormDiseaseProps) => {
  const { watch } = useFormContext()
  const disease = watch(prefixName + 'disease')
  const isOtherDisease = disease == otherDiseasesId

  return (
    <Box mb={spacing(2.5)}>
      <GridWrapper spacing={3}>
        <GridItem xs={12} md={6}>
          <CAutoComplete
            sx={{ mb: 0 }}
            name={prefixName + 'disease'}
            label='Doença*'
            placeholder='Insira aqui uma doença*'
            fullWidth
            rules={{ required: true }}
            options={diseaseCidOptions}
            onInputChange={(e, value, reason) => {
              if (reason === 'input') diseaseAutoCompleteChange(value)
              if (reason === 'input' && !value) diseaseAutoCompleteChange('')
            }}
            noOptionsText='Doença não encontrada no sistema'
          />
        </GridItem>
        {isOtherDisease && (
          <GridItem xs={12} md={6}>
            <CInputControlled
              name={prefixName + 'otherDisease'}
              label='Outra doença'
              placeholder='Insira aqui outra doença'
            />
          </GridItem>
        )}
        <GridItem xs={12} md={6}>
          <CDatePickerControlled
            name={prefixName + 'dateDiagnosis'}
            label='Data do diagnóstico*'
            maxDate={dayjs()}
          />
        </GridItem>
      </GridWrapper>
      <Box my={2}>
        <CRadioGrid
          name={prefixName + 'haveTreatment'}
          label='Fez ou faz algum tratamento?*'
          numGridColumns={12}
          rules={{ required: true }}
          gridItemsSpacing={['10%']}
          options={[
            { value: true, label: 'Sim' },
            { value: false, label: 'Não' },
          ]}
        />
      </Box>
      <Box mb={2}>
        <CTextAreaControlled
          name={prefixName + 'observation'}
          label='Observações'
          placeholder='Observações: Existe algum cuidado especial para essa doença?'
          fullWidth
          rules={{ required: true }}
        />
      </Box>
      <GridWrapper mb={1}>
        <GridItem xs={12} md={6}>
          <CFileInputAsyncControlled
            name={prefixName + 'document'}
            label='Registro médico da doença '
            accept='.pdf, image/*'
            onUploadFunc={handleAsyncUpload}
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
