import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '@/components/Button'
import SmallSelectCardSurvey from '@/components/Template/UnauthenticatedTemplate/Survey/Mobile'
import { CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { PSurvey, schema, defaultValues } from './types/TSurvey'
import { SurveyConfig } from './components/config'

export const SurveyMobile = ({ onSubmit }: PSurvey) => {
  const [gradeStatus, setGradeStatus] = useState(0)
  const { handleSubmit, control, formState, watch, ...others } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const comment = watch('comment')

  return (
    <Box sx={{ background: 'white', position: 'relative', padding: 2, my: 2, borderRadius: 2 }}>
      <Box display='flex' flexDirection='column' alignItems='center' mt={4}>
        <Typography variant='h3' color='var(--mui-palette-grey-700)' textAlign='center'>
          Quão‎{' '}
          <Typography component='span' variant='h3' color='primary'>
            satisfeito(a)
          </Typography>
          {'‎‎ você ficou com o atendimento prestado?'}
        </Typography>
        <CForm form={{ handleSubmit, control, formState, watch, ...others }} onSubmit={onSubmit}>
          <Box mt={4}>
            {SurveyConfig.map(({ id, image, name }) => (
              <SmallSelectCardSurvey
                key={id}
                name={name}
                isSelected={gradeStatus === id}
                Icon={image}
                onClick={() => {
                  setGradeStatus(id)
                }}
              />
            ))}
          </Box>
          <Box mt={4}>
            <Typography color='var(--mui-palette-grey-700)'>
              Se quiser, deixe uma sugestão, crítica ou elogio:
            </Typography>
            <Box mt={2} />
            <GridWrapper>
              <GridItem xs={12}>
                <CInputControlled
                  name='comment'
                  size='medium'
                  label='Comentário'
                  placeholder='Digite um comentário'
                />
              </GridItem>
            </GridWrapper>
            <Box mt={4}>
              <Button
                color='purple_gradient'
                fullWidth
                disabled={!gradeStatus}
                onClick={() =>
                  onSubmit({
                    grade: gradeStatus,
                    comment: comment || '',
                  })
                }
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </CForm>
      </Box>
    </Box>
  )
}

export default SurveyMobile
