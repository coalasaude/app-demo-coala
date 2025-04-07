import { Box, Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useRef, useState } from "react"
import { CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { MDXRemoteSerializeResult } from "next-mdx-remote"

import { CForm } from "@/components/Forms"
import { CTextAreaControlled } from "@/v3/presentation/newComponents"

import { Assistant } from "../../types/Assistant"
import { IChat } from "../ChatForm/ChatForm"
import MDXComponent from "../MDX/MdxLayout"

import { schema, initialValues } from "./schema"

interface IChatComponent {
  chat: IChat[];
  assistant: Assistant;
  onSubmit: (question: string) => Promise<void>;
  isLoading?: boolean;
  messageBeenWritten?: any;
}


const AIMessage = ({
  mdx,
  assistant
}: {
  mdx: MDXRemoteSerializeResult;
  assistant: Assistant;
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        mt: 1,
        gap: 2,
        overflow: "auto",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <assistant.icon width={'30px'} height={'30px'} />
        <Box
          sx={{
            p: 1,
            pt: 1,
            mr: 2,
            textAlign: "left",
            wordBreak: "break-word",
            flexGrow: 1,
          }}
        >
          <MDXComponent {...mdx} />
        </Box>
      </Box>
    </Box>
  )
}


const UserMessage = ({ text }: { text: string; }) => {
  return (
    <Box display="flex" justifyContent="flex-end" width="100%">
      <Box
        sx={{
          p: 1,
          bgcolor: "grey.200",
          borderRadius: 3,
          maxWidth: "70%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  )
}

export const ChatFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box 
      marginTop={2}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={[2,4]}
      flexWrap={"wrap"}
    >
      {children}
    </Box>
  )
}

export const AssistantData = ({assistant}: {assistant: Assistant}) => {
  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <assistant.icon sx={{ width: '100%' }} />
        <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>
          <Typography variant="h2">{assistant.name}</Typography>
          <Typography variant="body1" color={'var(--mui-palette-grey-500)'}>{assistant.description}</Typography>
        </Box>
    </Box>
  )
}

export default function ChatComponent({onSubmit, assistant, isLoading, chat, messageBeenWritten}: IChatComponent) {
  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const { watch } = form
  const questionValue = watch('question')
  const chatConversationRef = useRef<HTMLDivElement>(null)

  const scrollChatToBottom = () => {
    if (chatConversationRef?.current && autoScrollEnabled) {
      chatConversationRef.current.scrollTo({
        top: chatConversationRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (chat.length) {
      scrollChatToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, messageBeenWritten])

  const handleUserScroll = () => {
    if (chatConversationRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatConversationRef.current
      if (scrollTop + clientHeight < (scrollHeight - 20)) {
        setAutoScrollEnabled(false)
      } else {
        setAutoScrollEnabled(true)
      }
    }
  }
  
  useEffect(() => {
    const chatContainer = chatConversationRef.current

    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleUserScroll)
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleUserScroll)
      }
    }
  }, [])

  async function handleSubmit(values: any) {
    onSubmit?.(values.question)
    form.reset()
  }
    
  return (
    <>
      <Box 
      width={'100%'} 
      display='flex' 
      justifyContent='center' 
      flexDirection='column'
      flexGrow={1} 
      alignItems={'center'} 
      gap={2}
      paddingBottom={'80px'}
      overflow={'auto'}
      >
        {chat.length ? 
        (
              <Box
                display={'flex'}
                justifyContent={'center'}
                ref={chatConversationRef}
                overflow={'auto'}
                width={'100%'}
                flex={3}
              >
                <Box
                display={'flex'}
                flexDirection={'column'}
                px={[2,4]}
                mt={4}
                width={'100%'}
                >
                  {chat.map(({ text, isUser, mdx }, index) => {
                    return (
                      <Box  display={'flex'} key={index}>
                        {isUser && <UserMessage text={String(text)} />}
                        {!isUser && mdx && (
                          <AIMessage
                            mdx={mdx}
                            assistant={assistant}
                          />
                        )}
                      </Box>
                    )
                  })}
                  {
                    isLoading && (
                    <Box display={'flex'}>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          width: "100%",
                          mt: 1,
                          gap: 2,
                          overflow: "auto",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
                          <assistant.icon width={'30px'} height={'30px'} />
                          <Box
                            sx={{
                              p: 1,
                              pt: 1,
                              mr: 2,
                              textAlign: "left",
                              wordBreak: "break-word",
                              flexGrow: 1,
                              position: "relative",
                            }}
                          >
                            {messageBeenWritten && <MDXComponent {...messageBeenWritten} />}
                            <Box
                              sx={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                width: "100%", 
                                height: '4rem',
                                background: `linear-gradient(
                                  to left, 
                                  rgba(255, 255, 255, 1) 0%, 
                                  rgba(255, 255, 255, 0.9) 20%, 
                                  rgba(255, 255, 255, 0.7) 40%, 
                                  rgba(255, 255, 255, 0.5) 60%, 
                                  rgba(255, 255, 255, 0.3) 80%, 
                                  rgba(255, 255, 255, 0) 100%
                                )`,
                                pointerEvents: "none",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    



                    )
                  }
                </Box>
              </Box>
            ) : <AssistantData assistant={assistant} / >}
        <Box position='fixed' bottom={['70px', 0]} bgcolor={'white'} width={'100%'}  padding={1}>
          <CForm form={form} onSubmit={form.handleSubmit(handleSubmit)} id='myForm'>
            <CTextAreaControlled 
              boxProps={{display: 'flex', justifyContent: 'center',  position:'relative', maxWidth:'1024px', margin: 'auto'}}
              onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    submitButtonRef?.current &&
                    !isLoading &&
                    questionValue.trim() !==  ''
                  ) {
                    event.preventDefault()
                    submitButtonRef.current?.click?.()
                  }
              }}
              sx={{borderRadius: '4px'}}
              rows={3} 
              name="question" 
              placeholder="Digite sua pergunta aqui">
              <Box position={'absolute'} right={isLoading ? 20 : 0} bottom={5} zIndex={2} sx={{cursor: `${questionValue !==  '' ? 'pointer' : 'defualt'}`}}>
                  {isLoading ? (
                    <CircularProgress size={'20px'} />
                  ) : (
                    // eslint-disable-next-line max-len
                    <Button type="submit" 
                    sx={{background: 'transparent !important', }}  
                    ref={submitButtonRef} 
                    disabled={questionValue === ''}>
                      <SendIcon sx={{color: `${questionValue.trim() !==  '' ? 'var(--mui-palette-grey-500)' : 'var(--mui-palette-grey-400)'}`, width: '20px'}} />
                    </Button>
                  )}
              </Box>
            </CTextAreaControlled>
          </CForm>
        </Box>
      </Box>
      </>
  )
}
