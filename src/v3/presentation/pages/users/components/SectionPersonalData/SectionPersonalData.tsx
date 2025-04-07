import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import {
  FirstFillingStepStatus,
  FirstFillingType,
  UserDataSections,
} from '@/v3/domain/UserFirstFills'
import { HealthHistorySteps } from '@/v3/domain/UserHealthHistoricFills'
import { UserPersonalDataFills } from '@/v3/domain/UserPersonalDataFills'
import { useFetchBrowseHealthInsurance } from '@/v3/presentation/hooks/api/@v2/users/health-insurance/useFetchBrowseHealthInsurance'
import { useMutateDeleteHealthInsurance } from '@/v3/presentation/hooks/api/@v2/users/health-insurance/useMutateDeleteHealthInsurance'
import { useFetchBrowseProfessionalReference } from '@/v3/presentation/hooks/api/@v2/users/professional-references/useFetchBrowseProfessionalReference'
import { useMutateDeleteProfessionalReference } from '@/v3/presentation/hooks/api/@v2/users/professional-references/useMutateDeleteProfessionalReference'
import { useFetchReadAddress } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadAddress'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useFetchPersonalDataFirsFilling } from '@/v3/presentation/hooks/api/first-filling/useFetchPersonalDataFirsFilling'
import { useMutateUserFirstFilling } from '@/v3/presentation/hooks/api/first-filling/useMutateFirstFilling'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import Paper from '@/v3/presentation/components/Paper'
import { UserStatus } from '@/types/user'
import { useModalContext } from '@/v3/presentation/components/Modal'

import { IntroBody } from '../../pages/[userId]/pages/first-access/components/IntroStep/IntroBody'
import {
  UserInfoAddress,
  UserInfoBasic,
  UserInfoHealthInsurance,
  UserInfoHealthProfessional,
} from '../UserInfoContainer'
import ModalEditUserMessage from '../UserInfoContainer/ModalEditUserMessage/ModalEditUserMessage'

export const SectionPersonalData = ({
  user,
  canUpdateUser,
}: {
  user: UserModel
  canUpdateUser: boolean
}) => {
  const router = useRouter()
  const { user: authUser } = useAuth()
  const userId = user.id

  const { professionalReferences } = useFetchBrowseProfessionalReference({ userId: userId })
  const { healthInsurances } = useFetchBrowseHealthInsurance({ userId: userId })
  const { address } = useFetchReadAddress({ userId: userId })
  const { user: newUser } = useFetchReadUser({ userId: userId })

  const { firstFillingMutate, isLoadingCreateFirstFills } = useMutateUserFirstFilling({})
  const { data, isLoadingFirstFills } = useFetchPersonalDataFirsFilling({
    userId: userId,
  })

  const actualStep = data?.actualStep
  const isPendingStepFirstFills = UserPersonalDataFills.getIsPendingStep(actualStep)
  const isPendingToStartFirstFills = UserPersonalDataFills.getIsPendingToStart(actualStep)
  const isSameUser = authUser?.id === userId
  const isResponsible = !!user.findResponsible(authUser?.id)
  const isSameOrResponsible = isSameUser || isResponsible
  const isLoading = isLoadingFirstFills || (isPendingStepFirstFills && isSameOrResponsible)

  const deleteHealthInsurance = useMutateDeleteHealthInsurance()
  const deleteProfessionalReference = useMutateDeleteProfessionalReference()

  const { handleModal } = useModalContext()

  const onInitFilling = async () => {
    if (user?.id) {
      await firstFillingMutate({
        step: HealthHistorySteps.INITIATE,
        status: FirstFillingStepStatus.INITIALIZED,
        userId: user.id,
        type: FirstFillingType.PERSONAL_DATA,
      })
    }
  }

  const handleEditMap = {
    [UserDataSections.PERSONAL_INFO]: () => handleEditBasicInfo(),
    [UserDataSections.LOGIN_DATA]: () => handleEditLoginInfo(),
    [UserDataSections.ADDRESS]: () => handleEditAddress(),
  }

  const handleEdit = (type: UserDataSections) => {
    if (!isSameUser && user.status === UserStatus.ACTIVE && !authUser?.isAdmin) {
      return handleModal(<ModalEditUserMessage onCloseModal={handleModal} />)
    }

    handleEditMap[type]()
  }

  const handleEditBasicInfo = () => {
    const path = isSameUser
      ? NEW_ROUTES.AUTHENTICATED.USERS.EDIT.PERSONAL_DATA.PASSWORD.path
      : NEW_ROUTES.AUTHENTICATED.USERS.EDIT.PERSONAL_DATA.path

    router.push(
      bindPathParams(path, {
        userId,
      }),
    )
  }

  const handleEditLoginInfo = () => {
    const canEditUser =
      user.status === UserStatus.FIRST_ACCESS || user.status === UserStatus.NO_ACCESS

    const path =
      canEditUser || !isSameUser
        ? NEW_ROUTES.AUTHENTICATED.USERS.EDIT.LOGIN_DATA.path
        : NEW_ROUTES.AUTHENTICATED.USERS.EDIT.LOGIN_DATA.PASSWORD.path

    router.push(
      bindPathParams(path, {
        userId: userId,
      }),
    )
  }

  const handleEditAddress = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.ADDRESS.path, {
        userId: userId,
      }),
    )
  }

  const handleAddHealthInsurance = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.ADD.HEALTH_INSURANCE.path, {
        userId: userId,
      }),
    )
  }

  const handleAddHealthProfessional = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.ADD.PROFESSIONAL.path, {
        userId: userId,
      }),
    )
  }

  const handleDeleteHealthInsurance = (id: number) => {
    if (userId) {
      deleteHealthInsurance.mutateAsync({ healthInsuranceId: id, userId: userId })
    }
  }

  const handleDeleteHealthProfessional = (id: number) => {
    if (userId) {
      deleteProfessionalReference.mutateAsync({ professionalReferenceId: id, userId: userId })
    }
  }

  useEffect(() => {
    if (isPendingStepFirstFills && isSameOrResponsible) {
      router.replace(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.FIRST_FILLS.path, {
          userId: userId,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.id, isPendingStepFirstFills, router, user, userId])

  if (isPendingToStartFirstFills && !isPendingStepFirstFills && isSameOrResponsible) {
    return (
      <IntroBody isLoading={isLoadingCreateFirstFills} student={user} onConfirm={onInitFilling} />
    )
  }

  if (isLoading) {
    return (
      <Paper sx={{ p: 2 }}>
        <ViewSkeleton />
      </Paper>
    )
  }

  return (
    <Paper noBorder sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <UserInfoBasic
        user={newUser}
        handleEditBasicInfo={
          canUpdateUser ? () => handleEdit(UserDataSections.PERSONAL_INFO) : undefined
        }
        handleEditLoginInfo={
          canUpdateUser ? () => handleEdit(UserDataSections.LOGIN_DATA) : undefined
        }
      />
      <UserInfoAddress
        address={address}
        onEdit={canUpdateUser ? () => handleEdit(UserDataSections.ADDRESS) : undefined}
      />
      <UserInfoHealthInsurance
        healthInsurances={healthInsurances?.data || []}
        onAdd={handleAddHealthInsurance}
        onDelete={handleDeleteHealthInsurance}
        isLoading={deleteHealthInsurance.isPending}
      />
      <UserInfoHealthProfessional
        professionalReference={professionalReferences?.data || []}
        onAdd={handleAddHealthProfessional}
        onDelete={handleDeleteHealthProfessional}
        isLoading={deleteProfessionalReference.isPending}
      />
    </Paper>
  )
}
