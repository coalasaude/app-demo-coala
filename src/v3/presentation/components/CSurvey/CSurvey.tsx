import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { usePostHog } from 'posthog-js/react'

import { CButton, CInput } from '../../newComponents'
import { ModalCard, useModalContext } from '../Modal'

const iconDictionary = [
  SentimentVeryDissatisfiedIcon,
  SentimentDissatisfiedIcon,
  SentimentNeutralIcon,
  SentimentSatisfiedIcon,
  SentimentSatisfiedAltIcon,
]

export interface ICSurveyProps {
  label: string
  lowerBoundLabel?: string
  upperBoundLabel?: string
  submitButtonLabel?: string
  event: {
    name: string
    data?: Record<string, unknown>
  }
  onSubmit?: (value: number, comment?: string) => void
}

export const CSurvey: React.FC<ICSurveyProps> = ({
  label,
  lowerBoundLabel = 'Muito insatisfeito',
  upperBoundLabel = 'Muito satisfeito',
  submitButtonLabel = 'Enviar',
  event,
  onSubmit,
}) => {
  const [score, setScore] = React.useState<number | null>(null)
  const { handleModal } = useModalContext()
  const posthog = usePostHog()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (score !== null) {
      const parsedScore = score + 1
      posthog.capture(event.name, { ...event.data, score: parsedScore })
      onSubmit?.(parsedScore, inputRef.current?.value)
    }

    handleModal(null)
  }

  return (
    <ModalCard
      sx={{
        width: ['100%', 368],
      }}
    >
      <Typography
        variant='h4'
        component='p'
        sx={{
          marginBottom: 2,
          width: 'calc(100% - 24px)',
        }}
      >
        {label}
      </Typography>

      <Stack direction='row' spacing={1} justifyContent='space-between'>
        {iconDictionary.map((Icon, index) => (
          <Icon
            key={index}
            color={score === Number(index) ? 'primary' : 'action'}
            onClick={() => setScore(Number(index))}
            fontSize='large'
            style={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      <Stack direction='row' spacing={1} justifyContent='space-between' sx={{ marginBottom: 2 }}>
        <Typography variant='caption'>{lowerBoundLabel}</Typography>
        <Typography variant='caption'>{upperBoundLabel}</Typography>
      </Stack>
      <Box mb={2}>
        <Typography mb={1} variant='body1'>
          Se quiser, deixe uma sugestão, crítica ou elogio:
        </Typography>
        <CInput
          InputProps={{ inputRef }}
          fullWidth
          size='small'
          label={''}
          placeholder={'Digite um comentário'}
        />
      </Box>

      <CButton size='medium' fullWidth onClick={handleSubmit} disabled={score === null}>
        {submitButtonLabel}
      </CButton>
    </ModalCard>
  )
}
