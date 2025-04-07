import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { GetCurrentCourseModel } from '@/v3/domain/@v2/dashboard/get-current-course.model'
import Paper from '@/v3/presentation/components/Paper'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { CButton } from '@/v3/presentation/newComponents'

export function CurrentCourseContent({ courses }: { courses: GetCurrentCourseModel[] }) {
  const router = useRouter()
  const course = courses[0]

  return (
    <Paper
      p={'20px'}
      flex={1}
      onClick={() =>
        router.push(bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.VIEW.path, { id: course?.id }))
      }
      sx={{
        cursor: 'pointer',
      }}
    >
      <Typography variant='h4' mb={2}>
        Cursos em andamento
      </Typography>
      <Box
        p={1}
        display='flex'
        gap={2}
        sx={{ backgroundColor: 'var(--mui-palette-grey-100)' }}
        borderRadius={2}
      >
        {course && (
          <>
            {course.image?.url && (
              <Image
                src={course.image.url}
                alt={course.course}
                style={{ borderRadius: '8px', objectFit: 'cover' }}
                width={120}
                height={96}
              />
            )}
            <Box my='auto' flex={1}>
              <Typography
                whiteSpace={'pre-line'}
                overflow='hidden'
                textOverflow='ellipsis'
                display='-webkit-box'
                sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                key={course.course}
                variant='h6'
                mb={1}
              >
                {course.course}
              </Typography>
              <Typography
                key={course.course}
                variant='body2'
                color='var(--mui-palette-grey-500)'
                mb='4px'
              >
                Seu progresso
              </Typography>
              <Box display='flex' alignItems='center' gap={2}>
                <Box
                  sx={{
                    height: '8px',
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: 'var(--mui-palette-grey-300)',
                    maxWidth: '177px',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${course.progress}%`,
                      borderRadius: '4px',
                      backgroundColor: 'var(--mui-palette-primary-main)',
                    }}
                  />
                </Box>
                <Typography variant='body2' color='var(--mui-palette-primary-main)' pr={1}>
                  {course.progress}%
                </Typography>
              </Box>
            </Box>
          </>
        )}
        {!course && (
          <Box
            minHeight={90}
            width='100%'
            display='flex'
            flexDirection='column'
            gap={2}
            alignItems='center'
            justifyContent='center'
          >
            <Typography variant='h6' color='var(--mui-palette-grey-500)' textAlign='center'>
              Você não tem nenhum curso em andamento.
            </Typography>
            <CButton
              variant='secondary'
              onClick={() => {
                router.push(NEW_ROUTES.AUTHENTICATED.COURSE.path)
              }}
            >
              <Typography variant='h6'>Ver cursos disponíveis</Typography>
            </CButton>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
