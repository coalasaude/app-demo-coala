import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { BloodType } from '@/constants/blood'
import { NEW_ROUTES } from '@/constants/routes'
import { Genre } from '@/types/genre'
import { bindPathParams } from '@/utils/bindParams'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { BloodTypeMapping } from '@/v3/presentation/enums/general-information.enum'
import { useFetchReadGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useFetchReadGeneralInformation'
import { useMutateAddGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useMutateAddGeneralInformation'
import { useMutateEditGeneralInformation } from '@/v3/presentation/hooks/api/@v2/health-history/general-information/useMutateEditGeneralInformation'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'
import {
  CreateBodyMassModal,
  FormGeneralData,
  HistoricUserInfoContainer,
  generalDataSchema,
} from '@/v3/presentation/pages/users/components/FormGeneralData'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'

export const GeneralDataEditPage = () => {
  const router = useRouter()
  const { handleModal } = useModalContext()
  const userId = Number(router.query.userId as string)

  const updateUser = useMutateEditUser()
  const { mutateAsync: addGeneralInformationMutate, isPending: isLoadingCreate } =
    useMutateAddGeneralInformation()
  const { user, isPending: isLoadingUser } = useFetchReadUser({ userId })
  const { generalInformation, isLoading: isLoadingGeneralInfo } = useFetchReadGeneralInformation({
    userId,
  })
  const { mutateAsync: editGeneralInformation, isPending: isLoadingUpdate } =
    useMutateEditGeneralInformation()

  const onSubmit = (data: { genre: Genre; bloodType: string; birthDate: Dayjs }) => {
    if (!userId) return
    let promiseGeneral = null
    if (!generalInformation) {
      promiseGeneral = addGeneralInformationMutate({
        bloodType: BloodTypeMapping[data.bloodType],
        userId: userId,
      })
    } else {
      promiseGeneral = editGeneralInformation({
        bloodType: BloodTypeMapping[data.bloodType],
        userId: userId,
      })
    }

    promiseGeneral.then(() => {
      const promiseUser = updateUser.mutateAsync({
        userId: userId,
        genre: data.genre,
        birthday: data.birthDate as unknown as Date,
      })

      promiseUser.then(() => {
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
            userId,
          }),
        )
      })
    })
  }

  const form = useForm({
    resolver: yupResolver(generalDataSchema),
    defaultValues: {
      birthDate: user?.birthday?.toString(),
      bloodType: generalInformation?.bloodType
        ? BloodType[generalInformation.bloodType]
        : undefined,
      genre: user?.genre,
    },
  })

  const onCreate = () => {
    handleModal(<CreateBodyMassModal />)
  }

  useEffect(() => {
    if (user && generalInformation) {
      form.reset({
        birthDate: user?.birthday?.toString(),
        bloodType: generalInformation?.bloodType
          ? BloodType[generalInformation.bloodType]
          : undefined,
        genre: user.genre,
      })
    }
  }, [user, generalInformation, form])

  return (
    <>
      <PageHeader title='Editar usuário' />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <Box>
          {isLoadingUser || isLoadingGeneralInfo ? (
            <ViewSkeleton />
          ) : (
            <>
              <CBaseContainer
                buttonLabel='Salvar'
                cancelLabel='Atualizar altura e peso'
                onCancel={() => onCreate()}
                isLoading={updateUser.isPending || isLoadingCreate || isLoadingUpdate}
                formButtonsProps={{ minWidthCancel: '200px' }}
              >
                <CContainerContent title='Editar dados gerais:'>
                  <FormGeneralData />
                  <HistoricUserInfoContainer selectedUserId={userId} />
                </CContainerContent>
              </CBaseContainer>
            </>
          )}
        </Box>
      </CForm>
    </>
  )
}
