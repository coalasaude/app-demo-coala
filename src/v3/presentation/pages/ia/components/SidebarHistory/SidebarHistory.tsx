import { Box, Typography } from "@mui/material"
import AddCommentIcon from '@mui/icons-material/AddComment'
import { useRouter } from "next/router"

import { CDivider } from "@/v3/presentation/newComponents"
import useMediaQuery from "@/hooks/useMediaQuery"

import { IHistory } from "../ChatForm/ChatForm"

export default function SidebarHistory({ history, hasChatLength, onCloseDrawer } : 
  {history: IHistory[], hasChatLength: boolean, onCloseDrawer?: () => void}) {
  const { push, query } = useRouter()
  const assistantId = query.assistantId
  const isMobile = useMediaQuery('sm')

  const createThread = async () => {
    const response = await fetch("/api/ai/create-thread", { method: 'POST' })
    if (!response.ok) throw new Error("Erro ao criar thread")
    const data = await response.json()        
    push(`/app/ia/chat/${assistantId}/${data.data}`)
    onCloseDrawer?.()
  }

  return (
    <Box 
    borderLeft={isMobile ? '' :'1px solid var(--mui-palette-grey-200)'} 
    width={['100%','240px']} 
    display={'flex'}
    flexDirection={'column'}
    px={[0,2]}
    alignItems={['start','center']}
    overflow={'auto'}
    paddingBottom={[0, '140px']}
    >
      <Box display={'flex'} gap={1} mt={3} alignItems={['center']} mb={3} sx={{cursor: 'pointer'}} onClick={() => {
        if (hasChatLength) {
          createThread()
        }
      }}>
        <AddCommentIcon sx={{color: 'var(--mui-palette-grey-500)', width: '15px'}} />
        <Typography color={'var(--mui-palette-grey-500)'} variant="h5" fontWeight={700}>
          Nova conversa
        </Typography>
      </Box>
      <CDivider sx={{width: '100%'}}/>
      <Box mt={2} width={'100%'}>
        <Typography color={'var(--mui-palette-grey-500)'} variant="h5" fontWeight={700}>
          Conversas anteriores desse assistente        
        </Typography>
        <Box mt={2}
    >
      {history?.map((e) => {
        return (
          <Box key={e.id} mb={2} onClick={() => {
            push(`/app/ia/chat/${assistantId}/${e.threadId}`)
            onCloseDrawer?.()
          }}>
            <Typography 
              color={'var(--mui-palette-grey-500)'} 
              variant="body2"       
              sx={{
                width: '200px',
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                cursor: 'pointer'
              }}

            >
              {e.question}
            </Typography>
          </Box>
        )
      })}
        </Box>
      </Box>
    </Box>
  )
}