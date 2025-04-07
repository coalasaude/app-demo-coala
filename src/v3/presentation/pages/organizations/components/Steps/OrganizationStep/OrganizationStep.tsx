import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { cnpjNormalizer } from '@/components/Forms/normalizers/cnpjNormalizer'
import { CSelectControlled } from '@/components/Forms'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { Section } from '../../Section'
import { ORGANIZATION_TYPE_OPTIONS } from '../../../constants/organizationType'

type OrganizationStepProps = {
  sections?: ('organiationType' | 'administrative' | 'logo')[]
}

export const OrganizationStep = ({ sections }: OrganizationStepProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  if (!sections) {
    sections = ['organiationType', 'administrative', 'logo']
  }

  return (
    <>
      {sections.includes('organiationType') && (
        <Section title='Qual é o tipo de organização?'>
          <CSelectControlled
            name='organization.organizationType'
            label='Tipo de organização'
            required
            options={ORGANIZATION_TYPE_OPTIONS}
            size='small'
            fullWidth
            error={get(errors, 'organization.organizationType')}
          />
        </Section>
      )}

      {sections.includes('administrative') && (
        <Section title='Dados administrativos'>
          <CInputControlled
            name='organization.nickname'
            placeholder='Digite o apelido da organização'
            label='Apelido'
            error={!!get(errors, 'organization.nickname')}
          />

          <CInputControlled
            placeholder='Digite o nome fantasia da organização'
            name='organization.fantasyName'
            label='Nome fantasia'
            required
            error={!!get(errors, 'organization.fantasyName')}
          />

          <CInputControlled
            placeholder='Digite a razão social da organização'
            name='organization.socialReason'
            label='Razão Social'
            required
            error={!!get(errors, 'organization.socialReason')}
          />

          <CInputControlled
            placeholder='Digite o CNPJ da organização'
            name='organization.cnpj'
            label='CNPJ'
            required
            transform={{ output: cnpjNormalizer }}
            error={!!get(errors, 'organization.cnpj')}
          />
        </Section>
      )}

      {sections.includes('logo') && (
        <Section title='Logotipo da organização'>
          <Box maxWidth={384}>
            <CFileInputControlled name='logo' label='Upload' accept='png' />
          </Box>
        </Section>
      )}
    </>
  )
}
