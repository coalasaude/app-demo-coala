import dayjs from 'dayjs'

import { AddPeiPdi } from '@/v3/domain/@v2/mental-health/learning/add-pei-pdi.model'
import { useMutateAddTask } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddTask'
import { useMutateGeneratePeiPdiAI } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateGeneratePeiPdiAI'
import { useFetchBrowseCategory } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseCategory'
import { useMutateReadSubCategory } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateReadSubCategory'

type AddPeiPdiConstructor = AddPeiPdi & {
  planId: number
}

export function useGenerateTaskIAControl() {
  const { mutateAsync: addTask, isPending } = useMutateAddTask()
  const { mutateAsync: generatePeiAI, isPending: isPendingGeneratePeiPdiAI } =
    useMutateGeneratePeiPdiAI()
  const { categoryOptions } = useFetchBrowseCategory()
  const { mutateAsync: fetchSubCategory } = useMutateReadSubCategory()

  const findCategoryId = (category: string) =>
    categoryOptions?.find(({ label }) => label === category)?.value || 1

  const addTaskIa = async (body: AddPeiPdiConstructor) => {
    const response = await generatePeiAI({
      frequency: body.frequency,
      days: body.day,
      ageYears: body.patientAge,
      ageMonths: dayjs().diff(dayjs(body.patientBirthday), 'month'),
      duration: body.duration,
      specialCondition: body.conditionSuspicions,
      difficulties: body.difficulties,
      objective: body.generalObjectives,
    })

    if (!response?.length) return

    for (const item of response) {
      const categoryId = findCategoryId(item.category)
      if (!categoryId) continue

      for (const task of item.tasks) {
        const subCategory = await fetchSubCategory({
          categoryId,
          name: task.subcategory,
          userId: body.patientId,
        }).catch(() => null)

        await addTask({
          planId: body.planId,
          categoryId,
          patientId: body.patientId,
          subCategoryId: subCategory?.id || 1,
          supportTechnologies: task.assistiveTechnologies,
          activities: task.proposedActivities,
          adaptations: task.curricularAdaptations,
          assessment: '',
          objective: task.goal,
        })
      }
    }
  }

  return { addTaskIa, isPending: isPendingGeneratePeiPdiAI || isPending }
}
