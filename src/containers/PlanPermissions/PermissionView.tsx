import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useLazyFetch } from '@/hooks/useFetch'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { Plan } from '@/types/plan'
import { CForm } from '@/components/Forms'
import { Permissions } from '@/types/permissions'
import { useLayout } from '@/hooks/useLayout'
import { AUTHENTICATED_ROUTES, ROUTES } from '@/constants/routes'
import { PageHeader } from '@/v3/presentation/newComponents'

import PlanForm from './components/PlanForm'

export const PlanPermissionView = () => {
  const router = useRouter()
  const [apiRequest, { data }] = useLazyFetch<Plan>()
  const [permissionsRequest, { data: permissions }] = useLazyFetch<Permissions[]>()
  const [updatePlan] = useLazyFetch<Permissions[]>()
  const { showSnackBar } = useLayout()
  const form = useForm<{ permissions: Record<string, boolean> | undefined }>({
    defaultValues: {
      permissions: undefined,
    },
  })

  const getPlan = useCallback(async () => {
    if (!router.query.id) {
      return null
    }
    await apiRequest({
      path: 'plan/permissions/:id',
      method: 'GET',
      pathParams: {
        id: router.query.id,
      },
    })
  }, [apiRequest, router.query.id])

  const getPermissions = useCallback(async () => {
    if (!router.query.id) {
      return null
    }
    await permissionsRequest({
      path: 'plan/permissions',
      method: 'GET',
    })
  }, [permissionsRequest, router.query.id])

  const onSubmit = async (values: Record<string, any>) => {
    const { error } = await updatePlan({
      path: 'plan/permissions/:id',
      pathParams: {
        id: router.query.id,
      },
      method: 'PUT',
      body: values,
      useSpinner: true,
    })

    if (!error) {
      showSnackBar({
        type: 'success',
        message: 'Permissões do perfil editadas com sucesso',
      })
      router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.PLAN_PERMISSION}`)
    }
  }

  useEffect(() => {
    getPlan()
  }, [getPlan])

  useEffect(() => {
    getPermissions()
  }, [getPermissions])

  useEffect(() => {
    form.setValue(
      'permissions',
      permissions?.reduce((result, { id }) => {
        return {
          ...result,
          [id]: data?.PlanPermission?.some(({ permission_id }) => id === permission_id),
        }
      }, {})
    )
  }, [data, form, permissions])

  if (data === undefined) {
    return <ViewSkeleton />
  }

  return (
    <>
      <PageHeader
        title={data.product_name}
        actionButtonProps={{
          onClick: () => form.handleSubmit(onSubmit),
          children: 'Salvar',
          disabled: !Object.keys(form.getValues().permissions || {}).length,
        }}
      />
      <CForm form={form} onSubmit={onSubmit}>
        <PlanForm permissions={permissions} />
      </CForm>
    </>
  )
}

export default PlanPermissionView
