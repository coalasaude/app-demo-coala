import { get } from 'lodash'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

import {
  ComplaintAccidentOptions,
  ComplaintClinicalOptions,
  ComplaintOptions,
} from '@/constants/complaint'
import { CSelectControlled } from '@/components/Forms'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'

import { characterLimit } from '.'

const GeneralDataDesktop = ({
  error,
  isUpdate,
  resume,
  isClinical,
  isInstitutional,
}: {
  error: any
  isUpdate: boolean
  resume: any
  isClinical: boolean
  isInstitutional: boolean
}) => {
  const options = isClinical
    ? ComplaintClinicalOptions
    : isClinical === false
    ? ComplaintAccidentOptions
    : ComplaintOptions
  return (
    <Box mt={2}>
      {((isClinical !== undefined && isInstitutional) || !isInstitutional) && (
        <>
          <Box mb={1}>
            <Typography variant='h4'>Qual o motivo do atendimento?</Typography>
            <Typography color='var(--mui-palette-blue-100)'>
              Selecione a opção que melhor descreve o que te trouxe até aqui
            </Typography>
          </Box>
          <CSelectControlled
            name='complaint'
            disabled={isUpdate}
            label='Tipo da queixa'
            error={get(error, 'data.complaint')}
            options={options}
          />
          <Box mt={2} mb={1}>
            <Typography variant='h4'>Conta melhor pra gente o que aconteceu?</Typography>
            <Typography color='var(--mui-palette-blue-100)'>
              Descreva brevemente a queixa ou sintoma em até 50 caracteres.
            </Typography>
          </Box>
          <CInputControlled
            name='resume'
            placeholder='Digite a descrição da queixa'
            label='Descrição da queixa'
            fullWidth
            error={get(error, 'data.resume')}
            helperText={`${resume?.length || 0}/${characterLimit}`}
            transform={{
              output: [maxLength(characterLimit)],
            }}
            disabled={isUpdate}
          />
          <Box mt={2}>
            <Typography variant='h4'>Deseja incluir uma imagem?</Typography>
            <Typography color='var(--mui-palette-blue-100)'>
              Inclua imagens que possam auxiliar no atendimento (por exemplo, fotos de lesões,
              secreções, reações alérgicas, etc...)
            </Typography>
          </Box>
          <Box mt={2} width='30%'>
            <CFileInputControlled
              accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
              name='file'
              variant='outlined'
              label='Carregar foto'
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default GeneralDataDesktop
