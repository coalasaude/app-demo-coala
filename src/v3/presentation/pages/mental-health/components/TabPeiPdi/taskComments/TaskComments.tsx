import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Fragment } from 'react'

import Paper from '@/v3/presentation/components/Paper'
import { CButton, CDivider, CInputControlled } from '@/v3/presentation/newComponents'
import { useMutateAddTaskComment } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddTaskComment'
import { CForm } from '@/components/Forms'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { BrowseComments } from '@/v3/domain/@v2/mental-health/learning/browse-comment'

import EmptyComments from './components/EmptyComments/EmptyComments'
import Comment from './components/Comment/Comment'

interface TaskCommentsProps {
  comments: BrowseComments[]
  taskId: number
  isInactivePlan?: boolean
}

interface AddCommentProps {
  comment: string
}

const commentSchema = yup.object().shape({
  comment: yup.string().optional(),
})

const TaskComments = ({ comments, taskId, isInactivePlan }: TaskCommentsProps) => {
  const { user } = useAuth()
  const userId = user?.id
  const { mutateAsync: mutateAddComment } = useMutateAddTaskComment()

  const form = useForm({
    resolver: yupResolver(commentSchema),
  })

  const handleSubmit = async (body: AddCommentProps) => {
    await mutateAddComment({ ...body, userId: userId || 0, taskId, content: body.comment })
    form.reset()
  }

  return (
    <>
      <Typography variant='h4' mb={1} mt={[2, 0]}>
        Comentários
      </Typography>
      {comments?.length > 0 ? (
        <Paper p={2} mb={6} width='100%' height={[220, 260]} sx={{ overflowY: 'auto' }}>
          {comments.map((comment, index) => (
            <Fragment key={index}>
              <Comment comment={comment} taskId={taskId} isInactivePlan={isInactivePlan} />
              {index !== comments.length - 1 && <CDivider sx={{ my: 2 }} />}
            </Fragment>
          ))}
        </Paper>
      ) : (
        <Box height={[240, 280]}>
          <EmptyComments />
        </Box>
      )}

      <CForm form={form} onSubmit={handleSubmit}>
        <Box sx={{ position: 'relative', alignSelf: 'flex-end' }}>
          <CInputControlled
            name='comment'
            placeholder='Escreva seu comentário'
            label=''
            InputProps={{
              sx: { pr: 7 },
            }}
            disabled={isInactivePlan}
          />
          <CButton
            variant='link'
            type='submit'
            sx={{ position: 'absolute', top: 2, right: 8 }}
            disabled={isInactivePlan}
          >
            Enviar
          </CButton>
        </Box>
      </CForm>
    </>
  )
}

export default TaskComments
