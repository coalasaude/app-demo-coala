import { Box } from '@mui/material'
import { useState } from 'react'

import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { useMutateDeleteTaskComment } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateDeleteTaskComment'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { BrowseComments } from '@/v3/domain/@v2/mental-health/learning/browse-comment'
import { formatDate } from '@/utils/formatDate'

import CommentBody from './components/CommentBody/CommentBody'
import CommentHeader from './components/CommentHeader/CommentHeader'
import CommentOptions from './components/CommentOptions/CommentOptions'
import CommentReply from './components/CommentReply/CommentReply'

interface CommentProps {
  comment: BrowseComments
  taskId: number
  isInactivePlan?: boolean
}

const Comment = ({ comment, taskId, isInactivePlan }: CommentProps) => {
  const { user } = useAuth()
  const loggedUserId = user?.id || 0
  const [editComment, setEditComment] = useState(false)
  const { mutateAsync: mutateDeleteTaskComment } = useMutateDeleteTaskComment()

  const isSameUser = comment.user.id === loggedUserId
  const userNameComment = comment.user.name
  const userImageUrl = comment.user.avatar

  const handleDeleteComment = async () => {
    await mutateDeleteTaskComment({
      userId: loggedUserId,
      commentId: comment.id,
    })
  }

  const handleEditComment = async () => {
    setEditComment(!editComment)
  }

  return (
    <>
      <Box display='flex' alignItems='center' width='100%' mb={1} position='relative'>
        <AvatarInfo imageUrl={userImageUrl} title={userNameComment} hideText />
        <CommentHeader name={userNameComment} createdAt={formatDate(comment.createdAt)} />
        {isSameUser && !isInactivePlan && (
          <Box position='absolute' right={0} top={12}>
            <CommentOptions handleDelete={handleDeleteComment} handleEdit={handleEditComment} />
          </Box>
        )}
      </Box>

      <CommentBody
        comment={comment}
        taskId={taskId}
        hasReply
        isEditComment={editComment}
        setIsEditComment={setEditComment}
        isInactivePlan={isInactivePlan}
      />

      {comment.repliesCount > 0 && (
        <CommentReply
          commentId={comment.id}
          parentCommentRepliesCount={comment.repliesCount}
          taskId={taskId}
          handleDelete={handleDeleteComment}
          isInactivePlan={isInactivePlan}
        />
      )}
    </>
  )
}

export default Comment
