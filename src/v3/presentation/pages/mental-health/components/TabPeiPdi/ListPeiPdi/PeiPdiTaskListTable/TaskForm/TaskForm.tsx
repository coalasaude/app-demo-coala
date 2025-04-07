import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import CStepper from '@/v3/presentation/newComponents/layout/CStepper'
import {
  CreateTaskPeiPdiSteps,
  useCreateTaskPeiPdiControl,
} from '@/v3/presentation/pages/mental-health/hooks/useCreateTaskPeiPdiControl'
import { BrowseTask } from '@/v3/domain/@v2/mental-health/learning'
import { useMutateUpdateTask } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateUpdateTask'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useModalContext } from '@/v3/presentation/components/Modal'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import FormIdentificationStep from './FormIdentificationStep/FormIdentificationStep'
import FormActivitiesStep from './FormActivitiesStep/FormActivitiesStep'
import { taskSchema } from './types/schema'

interface TaskFormProps {
  planId: number
  task?: BrowseTask
  categoryId?: number
  isEdit?: boolean
}

const TaskForm = ({ planId, task, isEdit, categoryId }: TaskFormProps) => {
  const router = useRouter()
  const patientId = Number(router.query.userId)
  const { mutateAsync: updateTask } = useMutateUpdateTask()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const { handleModal } = useModalContext()
  const defaultCategory = typeof categoryId === 'number' ? categoryId : undefined

  const { stepperRef, step, onNextStep, onGoBack, onEndStep, createSubCategory, isLoadingAddTask } =
    useCreateTaskPeiPdiControl()
  const { handleSubmit, control, getValues, formState, reset, setValue, watch, ...others } =
    useForm({
      resolver: yupResolver(taskSchema),
      defaultValues: {
        ...task,
        categoryId: defaultCategory,
        subCategoryId: task?.subCategoryId,
      },
    })

  const subCategoryId = watch('subCategoryId')

  const onSubmit = async () => {
    const body = getValues()

    if (typeof subCategoryId === 'string') {
      posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.TASK, POSTHOG_ACTIONS.CREATED), {
        time_on_page: getCount(),
      })

      return createSubCategory({
        ...body,
        patientId,
        planId,
        name: body.subCategoryId.toString(),
        subCategoryId: 0,
      })
    }

    if (task?.categoryId && isEdit) {
      posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.TASK, POSTHOG_ACTIONS.UPDATED), {
        time_on_page: getCount(),
      })

      await updateTask({
        ...body,
        patientId,
        taskId: task?.id || 0,
        subCategoryId: Number(body.subCategoryId),
      })

      return handleModal()
    }

    await onEndStep({ ...body, patientId, planId, subCategoryId: Number(body.subCategoryId) })
  }

  return (
    <CForm
      id='myForm'
      form={{ handleSubmit, getValues, setValue, control, formState, reset, watch, ...others }}
      onSubmit={onSubmit}
    >
      <Typography variant='h1'>Criação de tarefa de desenvolvimento</Typography>

      <CStepper
        ref={stepperRef}
        activeStep={step}
        steps={['Identificação', 'Atividades']}
        connectorProps={{ maxWidth: 200 }}
      >
        <FormIdentificationStep
          key={CreateTaskPeiPdiSteps.IDENTIFICATION}
          nextStep={onNextStep}
          isEditCategoryId={task?.categoryId}
        />
        <FormActivitiesStep
          key={CreateTaskPeiPdiSteps.ACTIVITIES}
          onBackStep={onGoBack}
          isEdit={!!task?.categoryId}
          isLoading={isLoadingAddTask}
        />
      </CStepper>
    </CForm>
  )
}

export default TaskForm
