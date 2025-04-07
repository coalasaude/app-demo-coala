import { Check, Clear } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { passwordScoreData } from '@/constants/passwordScore'
import { passwordStrength } from '@/utils/passwordStrength'
import { CInputControlled } from '@/v3/presentation/newComponents'

const RegexValidator = ({
  regex,
  label,
  value,
}: {
  regex: RegExp
  label: string
  value: string
}) => {
  const isValidRegex = regex.test(value)

  return (
    <Box display='flex' alignItems='center'>
      <Box mr={1}>{isValidRegex ? <Check color='success' /> : <Clear color='error' />}</Box>{' '}
      <Typography color={isValidRegex ? 'success.main' : 'error'} display='inline'>
        {label}
      </Typography>
    </Box>
  )
}

export const CreatePasswordForm = ({ value }: { value: string }) => {
  const passwordScore = passwordStrength(value)
  const passwordData = passwordScoreData[passwordScore]

  return (
    <GridWrapper>
      <GridItem xs={12}>
        <CInputControlled
          name='password'
          label='Senha*'
          placeholder='Digite sua senha'
          rules={{ required: true }}
          inputType='password'
        />
      </GridItem>
      <GridItem xs={12}>
        <Box mb={2}>
          <RegexValidator regex={/^.{8,}$/} label='Mínimo de 8 caracteres' value={value} />
          <RegexValidator
            regex={/(?=.*[a-z])(?=.*[A-Z])/}
            label='Letra maiúscula e minúscula'
            value={value}
          />
          <RegexValidator
            regex={/(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/}
            label='Um número e um caractere especial'
            value={value}
          />
        </Box>
      </GridItem>
      <GridItem xs={12}>
        <CInputControlled
          name='passwordConfirm'
          label='Confirmação de senha*'
          placeholder='Digite sua confirmação de senha'
          inputType='password'
        />
      </GridItem>
      <GridItem xs={12}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box
            mt={2}
            width={`${passwordScore}%`}
            style={{ borderRadius: '4px' }}
            bgcolor={passwordData.bgColor}
            height='4px'
            sx={{ transition: 'all .3s ease' }}
          />
          {passwordScore > 0 && (
            <Box textAlign='center' mt={2} ml={2}>
              <Typography color='var(--mui-palette-blue-100)'>{passwordData.text}</Typography>
            </Box>
          )}
        </Box>
      </GridItem>
    </GridWrapper>
  )
}
