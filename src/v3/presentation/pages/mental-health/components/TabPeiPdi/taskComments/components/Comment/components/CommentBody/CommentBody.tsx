import { Box, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { useMutateHandleLikeComment } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateHandleLikeComment'
import { BrowseComments } from '@/v3/domain/@v2/mental-health/learning/browse-comment'
import { useMutateAddTaskComment } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddTaskComment'
import { useMutateUpdateTaskComment } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateUpdateTaskComment'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import CommentInputControlled from './ReplyCommentInput/ReplyCommentInput'

interface CommentBodyProps {
  comment: BrowseComments
  taskId: number
  hasReply?: boolean
  isEditComment?: boolean
  setIsEditComment?: (value: boolean) => void
  isInactivePlan?: boolean
}

export interface AddCommentProps {
  replyComment: string
}

const CommentBody = ({
  comment,
  hasReply,
  taskId,
  isEditComment,
  isInactivePlan,
  setIsEditComment,
}: CommentBodyProps) => {
  const [replyComment, setReplyComment] = useState(false)
  const { mutateAsync: addLike } = useMutateHandleLikeComment()
  const { mutateAsync: addComment } = useMutateAddTaskComment()
  const { mutateAsync: updateComment } = useMutateUpdateTaskComment()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const form = useForm({
    defaultValues: {
      replyComment: '',
      editComment: comment.content,
    },
  })
  const likeColor = comment.userAlreadyLiked
    ? 'var(--mui-palette-primary-main)'
    : 'var(--mui-palette-grey-500)'

  const handleSubmit = async () => {
    const content = form.getValues().replyComment
    await addComment({
      userId: comment.user.id,
      parentId: comment.id,
      content,
      taskId,
    })
    if (comment.id) {
      posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.COMMENT, POSTHOG_ACTIONS.REPLIED), {
        time_on_page: getCount(),
      })
    } else {
      posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.COMMENT, POSTHOG_ACTIONS.CREATED), {
        time_on_page: getCount(),
      })
    }

    form.reset()

    setReplyComment(false)
  }

  const handleEditComment = async () => {
    const content = form.getValues().editComment
    await updateComment({
      userId: comment.user.id,
      commentId: comment.id,
      content,
    })

    setIsEditComment?.(false)
  }

  const handleLike = async () => {
    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.COMMENT, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    await addLike({
      userId: comment.user.id,
      commentId: comment.id,
    })
  }

  return (
    <CForm form={form} onSubmit={handleSubmit}>
      {isEditComment ? (
        <CommentInputControlled
          name='editComment'
          onCancel={() => setIsEditComment?.(false)}
          onConfirm={handleEditComment}
        />
      ) : (
        <>
          <Typography variant='body2' mb={1.5}>
            {comment.content}
          </Typography>
          <Box display='flex' alignItems='center' gap={1} ml={1} mb={2}>
            <Box
              onClick={!isInactivePlan ? handleLike : undefined}
              sx={{ cursor: 'pointer' }}
              display='flex'
              alignItems='center'
              gap={1}
            >
              <ThumbUpIcon sx={{ fill: likeColor, width: 14, height: 14 }} />
              <Typography variant='body2' color={likeColor}>
                Gostei {!!comment.likeCount && `(${comment.likeCount})`}
              </Typography>
            </Box>

            {hasReply && !isInactivePlan && (
              <Box
                onClick={() => !isInactivePlan && setReplyComment(!replyComment)}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <ChatBubbleIcon
                  sx={{
                    fill: 'var(--mui-palette-grey-500)',
                    width: 14,
                    height: 14,
                    ml: 1,
                  }}
                />
                <Typography variant='body2' color={'var(--mui-palette-grey-500)'}>
                  Responder
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
      {replyComment && (
        <CommentInputControlled
          name='replyComment'
          onCancel={() => setReplyComment(!replyComment)}
          onConfirm={handleSubmit}
        />
      )}
    </CForm>
  )
}

export default CommentBody
