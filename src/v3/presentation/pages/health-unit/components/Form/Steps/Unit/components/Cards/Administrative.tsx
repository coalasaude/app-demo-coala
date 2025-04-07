import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { CSelectControlled } from '@/components/Forms'
import { HealthUnitType } from '@/v3/domain/api/ApiHealthUnitResponse'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { HEALTH_UNIT_TYPE_OPTIONS } from '@/v3/presentation/pages/health-unit/constants'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const Administrative = ({ noBorder }: { noBorder?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <Card noBorder={noBorder} title='Dados administrativos'>
      <CInputControlled
        placeholder='Digite o nome da unidade de saúde'
        name='company.name'
        label='Nome da Unidade'
        size='small'
        fullWidth
        error={!!get(errors, 'company.name.message')}
      />

      <CSelectControlled
        name='healthUnitType'
        label='Tipo de Unidade'
        value={HealthUnitType.HOSPITAL}
        options={HEALTH_UNIT_TYPE_OPTIONS}
        size='small'
        fullWidth
        error={get(errors, 'company.healthUnitType.message')}
      />

      <CInputControlled
        name='company.companyName'
        placeholder='Digite a razão social da unidade de saúde'
        label='Razão social'
        size='small'
        fullWidth
        required
        error={!!get(errors, 'company.companyName.message')}
      />

      <CInputControlled
        name='company.cnpj'
        placeholder='Digite o CNPJ da unidade de saúde'
        label='CNPJ'
        type='tel'
        size='small'
        transform={{ output: cnpjNormalizer, input: cnpjNormalizer }}
        fullWidth
        required
        error={!!get(errors, 'company.cnpj.message')}
      />
    </Card>
  )
}
