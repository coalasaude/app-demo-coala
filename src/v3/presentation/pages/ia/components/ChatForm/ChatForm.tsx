import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from 'next-mdx-remote/serialize'
import { Box, CircularProgress } from "@mui/material"

import { useAuth } from "@/v3/presentation/hooks/useAuth"
import useMediaQuery from "@/hooks/useMediaQuery"
import CFilterDrawer from "@/v3/presentation/newComponents/layout/CFilterDrawer"

import ChatComponent from "../ChatComponent/ChatComponent"
import { Assistant } from "../../types/Assistant"
import { assistantsList } from "../../constants/assistantsList"
import { replacePlaceholders } from "../../utils/replacePlaceholders"
import SidebarHistory from "../SidebarHistory/SidebarHistory"

export interface IChat {
  isUser: boolean
  text?: string
  mdx?: MDXRemoteSerializeResult
  file?: {
    name: string
    type: string
  }
}

export interface IHistory {
  userId: string
  threadId: string
  assistantId: string
  question: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  id: string
}


export default function ChatForm({ isDrawerOpen, setIsDrawerOpen }:{ isDrawerOpen: boolean, setIsDrawerOpen: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter()
  const [assistant, setAssistant] = useState<Assistant>()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [messageBeenWritten, setMessageBeenWritten] = useState<MDXRemoteSerializeResult | null>(null)
  const [chat, setChat] = useState<IChat[]>([])
  const [history, setHistory] = useState<IHistory[]>([])
  const assistantId = router.query.assistantId
  const threadId = router.query.threadId
  const chatConversationRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const isMobile = useMediaQuery('sm')

  
  useEffect(() => {
    if (!threadId) {
      router.back()
    } else {
      loadChat()
      loadHistory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId])

  const loadChat = async () => {
    setIsInitialLoading(true)
    try {
        const response = await fetch(`/api/ai/load-thread-messages?threadId=${threadId}`)
        if (!response.ok) throw new Error("Erro ao buscar dados")

        const data = await response.json()
        const formattedMessages = await Promise.all(data.data.map(async (msg: any) => ({
        isUser: msg.role === 'user',
        text: msg.content[0].text.value,
        mdx: msg.role === 'assistant' ? await serialize(msg.content[0].text.value) : undefined,
      })))
      setChat(formattedMessages)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setIsInitialLoading(false)
    }
  }

  const loadHistory = async () => {
    setIsInitialLoading(true)
      try {
          const response = await fetch(`/api/ai/load-thread-history?assistantId=${assistantId}&userId=${user?.id}`)
          if (!response.ok) throw new Error("Erro ao buscar dados")
          const data = await response.json()
          setHistory(data.data)
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error)
      } finally {
        setIsInitialLoading(false)
      }
  }

  const appendChat = (chatData: IChat) => {
    setChat(prevChat => [...prevChat, chatData])
  }

    const scrollChatToBottom = useCallback(() => {
    if (chatConversationRef?.current) {
      chatConversationRef.current.scrollTo({
        top: chatConversationRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatConversationRef])

   async function onSubmit(question: string) {
    setIsLoading(true)
    appendChat({
      isUser: true,
      text: question,
    })
    try {
          const responseDataStream = await fetch(`/api/ai/run`, {
          method: 'POST',
          body: JSON.stringify({
            question,
            assistantId,
            threadId,
            isFirstMessage: chat.length === 0 ? true : false,
            userId: user?.id,
          }),
        })
        const reader = responseDataStream.body?.getReader()
        let output = ''
        let repeat = true
              
        while (repeat) {
          const { done, value } = await reader?.read() as any

          if (done) {
            repeat = false
            const modifiedResponse = replacePlaceholders(output)

            const mdxSource = await serialize(modifiedResponse)

            setMessageBeenWritten(null)
            appendChat({
              isUser: false,
              mdx: mdxSource,
              text: output,
            })
            setIsLoading(false)
            break
          } else {
            output += new TextDecoder().decode(value)
            const modifiedResponse = replacePlaceholders(output)
            const mdxSource = await serialize(modifiedResponse)
            setMessageBeenWritten(mdxSource)
          }
        }

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (chat.length) {
      scrollChatToBottom()
    }
  }, [chat, scrollChatToBottom])
  
  useEffect(() => {
    setAssistant(() => assistantsList.find(e => e.id === assistantId))
  }, [assistantId]) 



  return (
      <Box display={'flex'} height={'100%'}>
        {isInitialLoading || !assistant?.id  ? (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'} flexGrow={1} >
            <CircularProgress />
        </Box>
        ) : <ChatComponent messageBeenWritten={messageBeenWritten} chat={chat} assistant={assistant}  onSubmit={onSubmit} isLoading={isLoading}/>
        }
        {!isMobile && <SidebarHistory history={history} hasChatLength={chat.length > 0}/> }
        {isMobile &&       
        <CFilterDrawer
          open={isDrawerOpen}
          onClose={() => {setIsDrawerOpen(false)}}
          onApply={() => {setIsDrawerOpen(false)}}
          onClear={() => {setIsDrawerOpen(false)}}
          drawerTitle="Histórico"
          hideButtons
        >
          <Box display='flex' flexDirection='column' gap={2}>
          <SidebarHistory history={history} hasChatLength={chat.length > 0} onCloseDrawer={() => setIsDrawerOpen(false)}/>
          </Box>
        </CFilterDrawer> 
    }
      </Box>
  )
}

