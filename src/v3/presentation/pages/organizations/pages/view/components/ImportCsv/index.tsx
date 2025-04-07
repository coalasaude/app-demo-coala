import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Router from 'next/router'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { CAutoComplete, CForm } from '@/components/Forms'
import { useLazyFetch } from '@/hooks/useFetch'
import { GridItem, GridWrapper } from '@/components/Grid'
import { Institution } from '@/types/institution'
import { Profile } from '@/types/profile'
import { IListResponse } from '@/types/request'
import Paper from '@/v3/presentation/components/Paper'
import { PageHeader } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import { useMutateImportCsv } from '@/v3/presentation/hooks/api/@v2/import/useMutateImportCsv'
import { NEW_ROUTES } from '@/constants/routes'
import { formatURL } from '@/v3/utils/formatURL'

const schema = yup.object({
  file: yup
    .mixed<File>()
    .required()
    .test('file', 'É necessário selecionar um arquivo', (file) => {
      return file !== null
    }),
  profile_id: yup.number().required(),
})

export const ImportUserByCSV = ({}) => {
  const router = useRouter()
  const [institutions, { data: institutionsData }] = useLazyFetch<Institution>()
  const [profiles, { data: profileData, loading: loadingProfiles }] =
    useLazyFetch<IListResponse<Profile>>()
  const { watch, handleSubmit, reset, ...form } = useForm({
    defaultValues: { file: undefined, profile_id: 0 },
    resolver: yupResolver(schema),
  })
  const { mutateAsync, isPending } = useMutateImportCsv()

  const profileId = watch('profile_id')
  const institutionTypeId = institutionsData?.institution_type_id
  const onSubmit = async (body: { file: File }) => {
    await mutateAsync({
      file: body.file,
      institutionId: Number(Router.query.id),
      profileId: profileId,
    })
    reset({
      file: undefined,
      profile_id: 0,
    })

    const path = NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.IMPORT_TAB.path
    const route = formatURL(path, { pathParams: { id: Router.query.id } })

    router.push(route)
  }

  useEffect(() => {
    const getInstitutions = async () => {
      await institutions({
        path: 'institution/:id',
        method: 'GET',
        pathParams: {
          id: Router.query.id,
        },
      })
    }

    if (institutionsData === undefined) {
      getInstitutions()
    }
  }, [institutions, institutionsData])

  useEffect(() => {
    const getProfiles = async () => {
      if (institutionTypeId) {
        await profiles({
          path: 'profiles/institution-type/:id',
          method: 'GET',
          pathParams: {
            id: institutionTypeId,
          },
        })
      }
    }

    if (profileData === undefined) {
      getProfiles()
    }
  }, [institutionTypeId, profileData, profiles])

  return (
    <>
      <PageHeader
        title='Importação em massa de usuários'
        actionButtonProps={{
          children: 'Importar',
          onClick: handleSubmit(onSubmit),
          disabled: isPending,
        }}
      />
      <CForm form={{ watch, handleSubmit, reset, ...form }} onSubmit={onSubmit}>
        <Paper p={2}>
          <Typography variant='h4' mb={2}>
            Selecione o CSV a ser importado
          </Typography>
          <GridWrapper>
            <GridItem xs={12} md={6}>
              <CAutoComplete
                name='profile_id'
                options={
                  profileData?.results?.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  })) || []
                }
                label='Selecione o perfil que deseja importar'
                isLoading={loadingProfiles}
              />
            </GridItem>
          </GridWrapper>
          <CFileInputControlled accept='.csv' name='file' label='Selecione o documento' />
        </Paper>
      </CForm>
    </>
  )
}

export default ImportUserByCSV
