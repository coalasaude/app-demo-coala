import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { usePostHog } from 'posthog-js/react'

import { CAutoComplete } from '@/components/Forms'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { GridItem, GridWrapper } from '@/components/Grid'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CSelectControlled } from '@/components/Forms'
import CInputLabel from '@/v3/presentation/newComponents/atoms/CInputLabel/CInputLabel'
import { useFetchBrowseSubCategory } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseSubCategory'
import { useFetchBrowseCategory } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseCategory'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

interface FormIdentificationStepProps {
  nextStep: () => void
  isEditCategoryId?: number
}

const FormIdentificationStep = ({ nextStep, isEditCategoryId }: FormIdentificationStepProps) => {
  const { handleModal } = useModalContext()
  const router = useRouter()
  const patientId = Number(router.query.userId)
  const { setSearchCategory, categoryOptions } = useFetchBrowseCategory()
  const [categoryId, setCategoryId] = useState<number>(1)
  const { setSearchSubCategory, subCategoryOptions } = useFetchBrowseSubCategory()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const {
    formState: { errors },
    trigger,
  } = useFormContext()

  const onConfirm = async () => {
    const isValid = await trigger(['categoryId', 'subCategoryId'])
    if (!isValid) return

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.TASK, POSTHOG_ACTIONS.COMPLETED_STEP_1), {
      time_on_page: getCount(),
    })
    nextStep()
  }

  const handleSearchCategory = (value: string) => {
    setSearchCategory({ name: value, patientId })
  }

  const handleSearchSubCategory = (name: string, categoryId?: number) => {
    setSearchSubCategory({ name, categoryId, patientId })
  }

  if (isEditCategoryId) {
    setSearchSubCategory({ name: '', categoryId: isEditCategoryId, patientId })
  }

  return (
    <>
      <GridWrapper mt={2}>
        <GridItem xs={12}>
          <CInputLabel title='Categoria' error={!!get(errors, 'categoryId')} />
          <CSelectControlled
            name='categoryId'
            label=''
            placeholder='Selecione a categoria'
            fullWidth
            disabledNullOption
            onChange={(value) => {
              const categoryId = Number(value.target.value)

              handleSearchCategory(String(value))
              setCategoryId(categoryId)
              handleSearchSubCategory('', categoryId)
            }}
            error={!!get(errors, 'categoryId')}
            options={categoryOptions}
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Subcategoria' error={!!get(errors, 'subCategoryId')} />
          <CAutoComplete
            name='subCategoryId'
            label='Subcategoria'
            placeholder='Selecione ou digite a subcategoria'
            onInputChange={(e, value, reason) => {
              if (reason === 'input') handleSearchSubCategory(value)
              if (reason === 'input' && !value) handleSearchSubCategory('')
            }}
            fullWidth
            freeSolo
            disabled={!categoryId}
            options={subCategoryOptions}
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Objetivos' error={!!get(errors, 'goal')} />
          <CTextAreaControlled
            name='objective'
            label=''
            placeholder='Digite o objetivo'
            fullWidth
            error={!!get(errors, 'goal')}
          />
        </GridItem>
      </GridWrapper>
      <FormButtons
        mt={3}
        isLoading={false}
        justifyContent='flex-end'
        minWidth='120px'
        confirmLabel='Próximo'
        cancelLabel='Cancelar'
        cancelVariant='outlined'
        onConfirm={onConfirm}
        onCancel={() => handleModal()}
        buttonFlex
      />
    </>
  )
}

export default FormIdentificationStep
