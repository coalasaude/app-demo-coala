import { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import { useState } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'

export interface Benefit {
  title: string
  description: string
  icon: SvgIconComponent
}

interface BenefitsSectionProps {
  benefits: Benefit[]
  title: string
  subtitle: string
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits, title, subtitle }) => {
  const isResponsive = useMediaQuery('md')
  const isMobile = useMediaQuery('xl')
  const [showAll, setShowAll] = useState(false)
  const displayedBenefits = isResponsive && !showAll ? benefits.slice(0, 4) : benefits

  return (
    <Box my={8} display='flex' flexDirection='column' alignItems='center'>
      <Typography
        fontSize={isMobile ? 22 : 24}
        fontWeight={900}
        lineHeight='120%'
        color='primary.main'
        align='center'
        mb={2}
      >
        {title}
      </Typography>

      <Typography
        fontSize={16}
        fontWeight={400}
        lineHeight='120%'
        color='text.secondary'
        align='center'
        maxWidth={600}
        mb={6}
      >
        {subtitle}
      </Typography>

      <Grid container spacing={2} justifyContent='center'>
        {displayedBenefits.map((benefit, idx) => (
          <Grid item xs={12} sm={6} md={6} key={idx}>
            <Card elevation={0} sx={{ borderRadius: 3, height: '100%', p: 2 }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  p: 0,
                  '&:last-child': { pb: 0 },
                }}
              >
                <Box display='flex' justifyContent='center' gap={2}>
                  <Box
                    bgcolor='var(--mui-palette-grey-100)'
                    borderRadius={2}
                    minWidth={64}
                    minHeight={64}
                    width={64}
                    height={64}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <benefit.icon sx={{ height: 40, width: 40, color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      lineHeight='140%'
                      color='primary.main'
                    >
                      {benefit.title}
                    </Typography>

                    <Typography
                      fontSize={12}
                      fontWeight={400}
                      lineHeight='140%'
                      color='text.secondary'
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isResponsive && !showAll && (
        <Button
          variant='outlined'
          sx={{ mt: 4 }}
          onClick={() => setShowAll(true)}
          fullWidth={isMobile}
        >
          Ver todos os itens
        </Button>
      )}
    </Box>
  )
}
