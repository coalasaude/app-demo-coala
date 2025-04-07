import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'

import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { CBaseContainer, CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'

import FilterCid from '../../../Cid/add/components/FilterCid'

const currentDate = dayjs()

interface GeneralDataProps {
  isPending?: boolean
}

export const GeneralData = ({ isPending }: GeneralDataProps) => {
  const router = useRouter()
  const { watch, setValue } = useFormContext()
  const [useCid, preDescription, validUntil] = watch(['useCid', 'preDescription', 'validUntil'])

  useEffect(() => {
    setValue(
      'body',
      (preDescription || '')
        .replace(/\[DATA_ATENDIMENTO\]/g, currentDate.format('DD/MM/YYYY'))
        .replace(/\[DIAS_ATESTADOS\]/g, validUntil),
    )
  }, [preDescription, setValue, validUntil])

  return (
    <CBaseContainer
      title='Atestado'
      isLoading={isPending}
      buttonLabel='Registrar'
      onCancel={() => router.back()}
    >
      <GridWrapper>
        <GridItem xs={12} md={4}>
          <CInputControlled
            variant='outlined'
            name='validUntil'
            placeholder='Digite a quantidade de dias de atestado'
            label='Dias de atestado'
            transform={{ input: [onlyNumsNormalizer], output: [maxLength(2)] }}
          />
        </GridItem>
      </GridWrapper>
      <Box my={2}>
        <Typography>Divulgação do CID-10 autorizada?</Typography>
        <CRadioButtonGroupControlled
          name='useCid'
          options={[
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' },
          ]}
        />
      </Box>
      {useCid === 'true' && (
        <GridWrapper>
          <GridItem xs={12}>
            <FilterCid />
          </GridItem>
        </GridWrapper>
      )}

      <GridWrapper>
        <GridItem xs={12}>
          <CTextAreaControlled
            variant='outlined'
            name='preDescription'
            placeholder='Digite a descrição do atestado'
            label='Descrição'
          />
        </GridItem>
      </GridWrapper>
      <Box my={2}>
        <GridWrapper>
          <GridItem xs={12}>
            <CTextAreaControlled
              placeholder='Digite a pré visualização do atestado'
              name='body'
              variant='outlined'
              label='Pré visualização do atestado:'
              disabled
            />
          </GridItem>
        </GridWrapper>
      </Box>
    </CBaseContainer>
  )
}

export default GeneralData
