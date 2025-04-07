import { Box, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { invert } from 'lodash'

import { CDivider } from '@/v3/presentation/newComponents'
import { CForm, CSelectControlled } from '@/components/Forms'
import { useFetchProfilesTypes } from '@/v3/presentation/hooks/api/profile/useFetchProfilesTypes'
import { useFetchListProfilesPermissions } from '@/v3/presentation/hooks/api/profile/useFetchListProfilesPermissions'
import { createProfilePayload } from '@/v3/infra/services/profiles/profiles'
import { ProfileTypeOptions } from '@/constants/profiles'
import { Profile } from '@/v3/domain/Profile'
import CBaseContainer from '@/v3/presentation/newComponents/layout/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents/layout/CContainerContent'
import { CButtonGroup } from '@/v3/presentation/newComponents/molecules/CButtonGroup'
import { CButton } from '@/v3/presentation/newComponents/atoms/CButton'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { FormSkeleton } from '../../../organizations/components/FormSkeleton'
import PermissionAccordionList from '../PermissionsAccordionsList'
import { Presets, TPresets } from '../../constants/presets'

import { IProfileFormFields, initialValuesProfile, schemaProfile } from './schema'

type FormProfileProps = {
  onSubmit: (body: createProfilePayload) => void
  data?: Profile
}

const permissionIndexMap = new Map<TPresets, number>([
  ['selectAll', 0],
  ['basic', 1],
  ['health', 2],
])

export const FormProfile = ({ onSubmit, data }: FormProfileProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const form = useForm<IProfileFormFields>({
    defaultValues: data
      ? {
          name: data.name,
          type: data.type,
          institutionTypeId: data.institutionTypeId,
        }
      : initialValuesProfile,
    resolver: yupResolver(schemaProfile as any),
  })

  const { data: dataProfileTypes, isLoading } = useFetchProfilesTypes()
  const { data: dataCategoryPermissionsList, isLoading: isLoadingCategories } =
    useFetchListProfilesPermissions()

  const permissionsMap = useMemo(() => {
    if (!dataCategoryPermissionsList) return

    const permissionsMap = new Map<string, number>()

    dataCategoryPermissionsList?.forEach(({ permissions }) => {
      permissions?.forEach(({ id, name }) => permissionsMap.set(name, id))
    })

    return permissionsMap
  }, [dataCategoryPermissionsList])

  const selectPreset = useCallback(
    (formPermissions?: Record<string, boolean>) => {
      if (!permissionsMap || !formPermissions) return
      const invertedPermissionsMap = invert(Object.fromEntries(permissionsMap))

      const preset = Object.entries(formPermissions)
        .map(([key, value]) => {
          if (!value) return

          const permissionName = invertedPermissionsMap[key]
          return permissionName
        })
        .filter(Boolean) as string[]

      const isEqual = (a: string[], b: Set<string>) => {
        return a.length === Array.from(b.values()).length && a.every((value) => b.has(value))
      }

      const isAllTruthy = (obj: Record<string, boolean>) => {
        return Object.values(obj).every(Boolean)
      }

      if (isAllTruthy(formPermissions)) {
        setSelectedIndex(permissionIndexMap.get('selectAll') ?? -1)
      } else if (isEqual(preset, Presets.basic)) {
        setSelectedIndex(permissionIndexMap.get('basic') ?? -1)
      } else if (isEqual(preset, Presets.health)) {
        setSelectedIndex(permissionIndexMap.get('health') ?? -1)
      }
    },
    [permissionsMap],
  )

  useEffect(() => {
    if (data && selectedIndex === null) {
      const allPermissions = dataCategoryPermissionsList
        ?.flatMap(({ permissions }) => permissions)
        .map(({ id }) => id)

      const allProfilePermissions = data?.getListAllPermissionsId()

      const permissions = allPermissions?.reduce(
        (result, id) => {
          return {
            ...result,
            [id]: allProfilePermissions?.includes(id),
          }
        },
        {} as Record<string, boolean>,
      )

      form.setValue('permissions', permissions)
      selectPreset(permissions)
    }
  }, [data, form, dataCategoryPermissionsList, selectedIndex, selectPreset])

  const handlePresets = (preset: TPresets) => {
    const selected = Presets[preset]

    if (selectedIndex === permissionIndexMap.get(preset)) {
      handleDeselect(selected)
      setSelectedIndex(-1)
      return
    }

    handleSelect(selected)
    setSelectedIndex(permissionIndexMap.get(preset) ?? -1)
  }

  const handleSelect = (selected: Set<string>) => {
    const permissions = form.getValues('permissions')

    permissions &&
      Object.keys(permissions).forEach((key) => {
        form.setValue(`permissions.${key}`, false)
      })

    selected.forEach((item) => {
      const permissionId = permissionsMap?.get(item)
      form.setValue(`permissions.${permissionId}`, true)
    })
  }

  const handleDeselect = (permissions: Set<string>) => {
    permissions.forEach((item) => {
      const permissionId = permissionsMap?.get(item)
      form.setValue(`permissions.${permissionId}`, false)
    })
  }

  if (!dataProfileTypes || isLoading || !dataCategoryPermissionsList || isLoadingCategories)
    return <FormSkeleton />

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <CBaseContainer
        buttonLabel='Salvar'
        mt={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box display='flex' flexDirection='column' gap={2}>
          <CContainerContent title='Dados do perfil'>
            <CDivider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CInputControlled
                  name='name'
                  label='Nome*'
                  fullWidth
                  placeholder='Digite o nome*'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CSelectControlled name='type' options={ProfileTypeOptions} label='Acesso*' />
              </Grid>
              <Grid item xs={12} md={4}>
                <CSelectControlled
                  name='institutionTypeId'
                  options={[
                    ...dataProfileTypes.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })),
                    { label: '-', value: null },
                  ]}
                  label='Tipo institucional'
                />
              </Grid>
            </Grid>
          </CContainerContent>
          <Box>
            <Typography variant='h2' py={2}>
              Permissões
            </Typography>
            <CDivider />
          </Box>
          <Box>
            <CButtonGroup variant='primary' selectedIndex={selectedIndex ?? undefined}>
              <CButton onClick={() => handlePresets('selectAll')}>Selecionar Todos</CButton>
              <CButton onClick={() => handlePresets('basic')}>Básico</CButton>
              <CButton onClick={() => handlePresets('health')}>Saúde</CButton>
            </CButtonGroup>
          </Box>
          <PermissionAccordionList categoryPermissionsList={dataCategoryPermissionsList} />
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
