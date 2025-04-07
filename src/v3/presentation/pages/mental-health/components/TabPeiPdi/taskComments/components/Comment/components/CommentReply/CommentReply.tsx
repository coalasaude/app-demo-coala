import { Box, Collapse, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useState } from 'react'

import { useFetchBrowseTaskCommentReplies } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseTaskCommentReplies'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import CommentReplyBody from './CommentReplyBody/CommentReplyBody'

interface CommentReplyProps {
  commentId: number
  taskId: number
  parentCommentRepliesCount: number
  handleDelete: () => void
  isInactivePlan?: boolean
}

const collapseColor = 'var(--mui-palette-primary-main)'

const CommentReply = ({
  commentId,
  parentCommentRepliesCount,
  taskId,
  isInactivePlan,
  handleDelete,
}: CommentReplyProps) => {
  const [checked, setChecked] = useState(false)
  const { user } = useAuth()
  const { comments } = useFetchBrowseTaskCommentReplies({
    commentId: commentId,
    userId: user?.id || 0,
  })

  const repliesCountFormated = parentCommentRepliesCount > 1 ? 'respostas' : 'resposta'

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        onClick={() => setChecked(!checked)}
        sx={{ cursor: 'pointer', ml: 1 }}
      >
        <Typography variant='body2' fontWeight='500' color={collapseColor}>
          {parentCommentRepliesCount + ' ' + repliesCountFormated}
        </Typography>
        {checked ? (
          <KeyboardArrowUpIcon fontSize='small' sx={{ fill: collapseColor }} />
        ) : (
          <KeyboardArrowDownIcon fontSize='small' sx={{ fill: collapseColor }} />
        )}
      </Box>
      <Collapse in={checked} sx={{ mb: 2, pl: 5 }}>
        {comments.map((comment, index) => (
          <Box display='flex' key={index}>
            <CommentReplyBody
              comment={comment}
              handleDelete={handleDelete}
              taskId={taskId}
              isInactivePlan={isInactivePlan}
            />
          </Box>
        ))}
      </Collapse>
    </>
  )
}

export default CommentReply
