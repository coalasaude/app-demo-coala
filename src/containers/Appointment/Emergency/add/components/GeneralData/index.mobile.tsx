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

const GeneralDataMobile = ({
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
    <>
      {((isClinical !== undefined && isInstitutional) || !isInstitutional) && (
        <>
          <Box mt={2} mb={1}>
            <Typography variant='h4'>Qual o motivo do atendimento?</Typography>
            <Typography mt={1}>
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
            <Typography mt={1} mb={1}>
              Descreva brevemente a queixa ou sintoma em até 50 caracteres.
            </Typography>
          </Box>
          <CInputControlled
            name='resume'
            label='Descrição da queixa'
            placeholder='Digite a descrição da queixa'
            error={get(error, 'data.resume')}
            fullWidth
            helperText={`${resume?.length || 0}/${characterLimit}`}
            transform={{
              output: [maxLength(characterLimit)],
            }}
            disabled={isUpdate}
          />
          <Box mt={2} mb={1}>
            <Typography variant='h4'>Deseja incluir uma imagem?</Typography>
            <Typography mt={1}>
              Inclua imagens que possam auxiliar no atendimento (por exemplo, fotos de lesões,
              secreções, reações alérgicas, etc...)
            </Typography>
          </Box>

          <Box mt={2}>
            <CFileInputControlled
              accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
              name='file'
              label='Carregar foto'
            />
          </Box>
        </>
      )}
    </>
  )
}

export default GeneralDataMobile
