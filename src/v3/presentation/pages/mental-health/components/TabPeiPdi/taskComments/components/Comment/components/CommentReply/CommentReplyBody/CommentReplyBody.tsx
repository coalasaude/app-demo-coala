import { Box } from '@mui/material'
import { useState } from 'react'

import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { BrowseComments } from '@/v3/domain/@v2/mental-health/learning/browse-comment'
import { formatDate } from '@/utils/formatDate'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import CommentHeader from '../../CommentHeader/CommentHeader'
import CommentBody from '../../CommentBody/CommentBody'
import CommentOptions from '../../CommentOptions/CommentOptions'

interface CommentReplyBodyProps {
  comment: BrowseComments
  taskId: number
  handleDelete: () => void
  isInactivePlan?: boolean
}

const CommentReplyBody = ({
  comment,
  taskId,
  isInactivePlan,
  handleDelete,
}: CommentReplyBodyProps) => {
  const { user } = useAuth()
  const loggedUserId = user?.id || 0
  const [replyEditComment, setReplyEditComment] = useState(false)
  const handleEditComment = () => {
    setReplyEditComment(!replyEditComment)
  }
  const isSameUser = comment.user.id === loggedUserId

  return (
    <>
      <AvatarInfo
        imageUrl={comment.user.avatar}
        title={comment.user.name}
        hideText
        containerProps={{ mt: 1 }}
      />
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        my={1}
        position='relative'
        pr={2}
        pl={1}
      >
        <CommentHeader name={comment.user.name} createdAt={formatDate(comment.createdAt)} />

        <CommentBody
          comment={comment}
          taskId={taskId}
          isEditComment={replyEditComment}
          setIsEditComment={setReplyEditComment}
          isInactivePlan={isInactivePlan}
        />
        {isSameUser && !isInactivePlan && (
          <Box position='absolute' right={2} top={0}>
            <CommentOptions handleDelete={handleDelete} handleEdit={handleEditComment} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default CommentReplyBody
