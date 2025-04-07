/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

import { PageHeader } from '@/v3/presentation/newComponents'
import { EXPERIMENTAL_SearchInput } from '@/v3/presentation/components/EXPERIMENTAL_SearchInput'
import CSelect from '@/v3/presentation/newComponents/atoms/CSelect'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { assistantCategoriesOptions, assistantsList } from '../constants/assistantsList'

export default function IAPage() {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const router = useRouter()
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const createThread = async (id: string) => {
    const response = await fetch('/api/ai/create-thread', { method: 'POST' })
    if (!response.ok) throw new Error('Erro ao criar thread')
    const data = await response.json()
    router.push(`/app/ia/chat/${id}/${data.data}`)
  }

  /*const filteredAssistants = assistantsList.filter((assistant) => {
    const normalizeText = (text: string) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const matchesName = normalizeText(assistant.name).includes(normalizeText(nameFilter))
    const matchesCategory = categoryFilter ? assistant.category === categoryFilter : true

    return matchesName && matchesCategory
  })*/
     // disabling use until validation occurs

   const filteredAssistants: any[] = []

  return (
    <>
      <PageHeader title='Assistentes de IA' />
      <Box
        display='flex'
        alignItems={['start', 'center']}
        gap={2}
        width={['100%']}
        flexDirection={['column', 'row']}
      >
        <EXPERIMENTAL_SearchInput
          name='search_input_user'
          onSearch={(e) => setNameFilter(e)}
          placeholder='Buscar agentes'
          sx={{ width: ['100%', '50%'], maxWidth: ['100%', '250px'] }}
          data-testid='searchInputName'
        />
        <CSelect
          nullOptionText='Todos'
          placeholder='Categorias'
          sx={{
            width: ['100%', '150px !important'],
            backgroundColor: 'var(--mui-palette-grey-100)',
          }}
          options={assistantCategoriesOptions}
          onChange={(e) => setCategoryFilter((e.target.value as string) || null)}
        />
      </Box>
      <Typography variant='h2' mt={2}>
        Assistentes criados
      </Typography>
      <Typography variant='body1'>
        Nossos assistentes de IA foram desenvolvidos para otimizar suas tarefas diárias. Automatize
        processos, personalize o aprendizado e obtenha insights valiosos para tomar decisões mais
        assertivas.
      </Typography>
      <Grid container spacing={2}>
        {filteredAssistants.map((e) => (
          <Grid item xs={12} sm={6} md={4} key={e.id}>
            <Box
              p={2}
              display='flex'
              height={'100%'}
              flexDirection={'row'}
              border='1px solid var(--mui-palette-grey-200)'
              borderRadius={2}
              onClick={() => {
                createThread(e.id)
                posthog.capture(`clicked_ai_assistant`, {
                  time_spent: getCount(),
                  name: e.name,
                  assistantId: e.id,
                })
              }}
              gap={2}
              sx={{
                cursor: 'pointer',
                ':hover': {
                  background: 'var(--mui-palette-grey-200)',
                },
              }}
            >
              <Box
                minWidth={'67px'}
                height={'67px'}
                borderRadius={2}
                bgcolor={'var(--mui-palette-grey-100)'}
                display='flex'
                alignItems='center'
                justifyContent={['center']}
              >
                <e.icon sx={{ width: '60px' }} />
              </Box>
              <Box display='flex' flexDirection='column' gap={1}>
                <Typography variant='h3' color='primary'>
                  {e.name}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                  }}
                >
                  {e.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
