import dayjs from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { CDatePickerControlled, CSelectControlled } from '@/components/Forms'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'
import {
  CInputControlled,
  CRadioButtonGroupControlled,
  CTextAreaControlled,
} from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import { MIN_ACCEPTED_USER_DATE, UNTIL_TODAY } from '@/v3/utils/accept-date'
import { AuthorizationStatus } from '@/v3/domain/medicine'

import { IMedicineFormProps } from './types'

export function FormMedicine({
  concentrationUnitOptions,
  dosageUnitOptions,
  scheduledMedicineOptions,
  prefixName = '',
  handleAsyncUpload,
}: IMedicineFormProps) {
  const { watch } = useFormContext()

  const isSos = watch(prefixName + 'isSos')
  const isContinuousUsage = watch(prefixName + 'isContinuousUsage')

  const renderConditionalInputs = () => {
    if (isSos && isContinuousUsage) {
      return null
    }
    if (isSos && !isContinuousUsage) {
      return renderTreatmentDays()
    }
    if (!isSos && isContinuousUsage) {
      return renderStartHour()
    }
    if (!isSos && !isContinuousUsage) {
      return renderTreatmentDaysAndStart()
    }

    return null
  }

  const renderTreatmentDays = () => (
    <GridItem xs={12} md={4}>
      <CInputControlled
        placeholder='Digite a quantidade de dias de tratamento'
        name={prefixName + 'treatmentDays'}
        label='Dias de tratamento*'
        fullWidth
        transform={{ output: [onlyNumsNormalizer] }}
      />
    </GridItem>
  )

  const renderStartHour = () => (
    <GridItem xs={12} sm={4} md={3}>
      <CTimePickerControlled name={prefixName + 'startHour'} label='Hora do início do período*' />
    </GridItem>
  )

  const renderTreatmentDaysAndStart = () => (
    <>
      {renderTreatmentDays()}
      <GridItem xs={12} sm={4} md={3}>
        <CDatePickerControlled
          name={prefixName + 'startDate'}
          label='Data do início do período*'
          maxDate={dayjs(UNTIL_TODAY)}
          minDate={dayjs(MIN_ACCEPTED_USER_DATE)}
        />
      </GridItem>
      {renderStartHour()}
    </>
  )

  return (
    <GridWrapper spacing={spacing(3)} pb={spacing(3)}>
      <GridItem xs={12} md={6}>
        <CInputControlled
          name={prefixName + 'name'}
          label='Nome do medicamento*'
          fullWidth
          placeholder='DIgite o nome do medicamento'
        />
      </GridItem>
      <GridItem xs={12} md={6} display={['none', 'none', 'block']} />
      <GridItem xs={6} md={3}>
        <CInputControlled
          name={prefixName + 'concentration'}
          label='Concentração*'
          placeholder='Digite a concentração'
          fullWidth
          transform={{
            output: [onlyNumsNormalizer],
          }}
        />
      </GridItem>
      <GridItem xs={6} md={3}>
        <CSelectControlled
          name={prefixName + 'medicineConcentrationUnitId'}
          label='Unidade (ml,mg, etc)*'
          options={concentrationUnitOptions}
        />
      </GridItem>
      <GridItem xs={6} md={3}>
        <CInputControlled
          name={prefixName + 'dosage'}
          label='Dosagem*'
          placeholder='Digite a dosagem'
          fullWidth
          transform={{
            output: [onlyNumsNormalizer],
          }}
        />
      </GridItem>
      <GridItem xs={6} md={3}>
        <CSelectControlled
          name={prefixName + 'medicineDosageUnitId'}
          label='Unidade (comprimido, gota, etc)*'
          options={dosageUnitOptions}
        />
      </GridItem>
      <GridItem xs={12} md={4}>
        <CSelectControlled
          name={prefixName + 'scheduledMedicineId'}
          label='Frequência de uso*'
          options={scheduledMedicineOptions}
        />
      </GridItem>
      <GridItem xs={12} md={8} display={['none', 'none', 'block']} />
      <GridItem xs={12}>
        <CSwitchControlled name={prefixName + 'isSos'} label='Uso se necessário*' />
      </GridItem>
      {isSos && (
        <GridItem xs={12}>
          <CTextAreaControlled
            name={prefixName + 'recommendation'}
            placeholder='Digite as recomendações de uso'
            fullWidth
            label='Condições de uso*'
          />
        </GridItem>
      )}
      <GridItem xs={12}>
        <CSwitchControlled name={prefixName + 'isContinuousUsage'} label='Uso contínuo*' />
      </GridItem>
      {renderConditionalInputs()}
      <GridItem xs={12}>
        <CTextAreaControlled
          name={prefixName + 'observation'}
          placeholder='Alguma observação importante?'
          fullWidth
          label='Observações'
        />
      </GridItem>
      <GridItem xs={12}>
        <CRadioButtonGroupControlled
          row
          options={[
            { label: 'Não', value: AuthorizationStatus.NOT_AUTHORIZED },
            { label: 'Sim', value: AuthorizationStatus.AUTHORIZED_SCHOOL },
          ]}
          name={prefixName + 'authorizationStatus'}
          label='Autoriza a medicação na escola?*'
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <CFileInputAsyncControlled
          placeholder='Adicione uma foto do medicamento'
          label='Foto do medicamento'
          accept='image/*'
          name={prefixName + 'packagePhoto'}
          onUploadFunc={handleAsyncUpload}
        />
      </GridItem>
    </GridWrapper>
  )
}
