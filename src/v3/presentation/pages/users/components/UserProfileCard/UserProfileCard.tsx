import {
  FaceOutlined,
  HealthAndSafetyOutlined,
  MedicalInformationOutlined,
  PersonOutlined,
  SentimentSatisfiedAltOutlined,
  InsightsOutlined,
} from '@mui/icons-material'
import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'

import { BloodType } from '@/constants/blood'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useHasPermission } from '@/hooks/useHasPermission'
import { ProfileType } from '@/types/profile'
import { bindPathParams } from '@/utils/bindParams'
import { BodyMassModel } from '@/v3/domain/@v2/health-history/body-mass/body-mass.model'
import { GeneralInformationModel } from '@/v3/domain/@v2/health-history/general-information/general-information.model'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { UserInfoCard } from '@/v3/presentation/components/UserCard'
import { useFetchBrowseAppointments } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseAppointments'
import { useHealthHistoryAccess } from '@/v3/presentation/hooks/useHealthHistoryAccess'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import HorizontalScrollList from '../../../../components/HorizontalList'
import { PaperLinkButton } from '../../../../components/HorizontalList/PaperLinkButton'
import { useAvailableMentalHealthTabs } from '../hook/useAvailableMentalHealthTabs'

export const getActiveByPath = (path: string) => {
  return path.split('/').at(-1)
}

export const UserProfileCard = ({
  user,
  onEdit,
  userGeneralInformation,
  userBodyMass,
}: {
  user?: UserModel
  onEdit?: () => void
  userGeneralInformation?: GeneralInformationModel | null
  userBodyMass?: BodyMassModel
}) => {
  const router = useRouter()
  const { auth } = useAuth()
  const { canViewLearning } = useAvailableMentalHealthTabs()
  const [canListAppointment] = useHasPermission([Permissions.VIEW_APPOINTMENT])
  const userId = Number(user?.id)
  const canUseHealthHistory = useHealthHistoryAccess({ userId })
  const { appointments } = useFetchBrowseAppointments({ patientId: userId, limit: 1 })
  const hasAppointments = !!appointments?.data?.length
  const isResponsible = user?.isResponsible && !user.roles?.length
  const canSeeAppointments = (canListAppointment && !isResponsible) || hasAppointments

  if (!user) return <Skeleton variant='rectangular' height={250} />

  const isSameUser = auth.userId === userId

  const birthdayText = user?.getFormattedBirthday() || ''
  const bloodTypeText = userGeneralInformation?.bloodType
    ? BloodType[userGeneralInformation.bloodType]
    : ''
  const sizeAndWeightText = [
    userBodyMass?.getFormattedHeightWithUnit(),
    userBodyMass?.getFormattedWeight(),
  ]
    .filter(Boolean)
    .join(' | ')

  const userBasicInfo = {
    name: user?.getFullName() || '',
    infoText: user?.getFormattedGenderAndAge() || '',
    imageUrl: user?.image?.url || '',
    onEdit: onEdit,
  }

  const userBodyItems = [
    { label: 'Nascimento', value: birthdayText || '-' },
    { label: 'Tipo sanguíneo', value: bloodTypeText || '-' },
    { label: 'Altura e peso', value: sizeAndWeightText || '-' },
  ]

  const userLinkItems = [
    {
      label: 'Dados cadastrais',
      icon: PersonOutlined,
      href: NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath,
    },
    ...((canUseHealthHistory && !isResponsible) || (isSameUser && auth.user?.hasFilledHealthHistory)
      ? [
          {
            label: 'Ficha de saúde',
            icon: MedicalInformationOutlined,
            href: NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path,
          },
        ]
      : []),
    {
      label: 'Perfil',
      icon: SentimentSatisfiedAltOutlined,
      href: NEW_ROUTES.AUTHENTICATED.USERS.PROFILE.path,
    },
    ...(canSeeAppointments
      ? [
          {
            label: 'Atendimentos',
            icon: HealthAndSafetyOutlined,
            href: NEW_ROUTES.AUTHENTICATED.USERS.APPOINTMENT.path,
          },
        ]
      : []),
  ]

  if (
    (!user?.hasProfileType(ProfileType.FACULTATIVE_ACCESS) && !user?.hasResponsible()) ||
    user.children.length > 0
  ) {
    userLinkItems.push({
      label: 'Dependentes',
      icon: FaceOutlined,
      href: NEW_ROUTES.AUTHENTICATED.USERS.DEPENDENT.path,
    })
  }
  if (user?.hasProfileType(ProfileType.FACULTATIVE_ACCESS) || user?.hasResponsible()) {
    userLinkItems.push({
      label: 'Responsáveis',
      icon: FaceOutlined,
      href: NEW_ROUTES.AUTHENTICATED.USERS.RESPONSIBLE.path,
    })
  }
  if (user.isChild && user.isFacultativeAccess() && canViewLearning) {
    userLinkItems.push({
      label: 'Aprendizagem',
      icon: InsightsOutlined,
      href: NEW_ROUTES.AUTHENTICATED.USERS.LEARNING.path,
    })
  }

  const section = router.query.section?.[0]

  return (
    <>
      <UserInfoCard basicInfo={{ ...userBasicInfo, userId: user.id }} bodyItems={userBodyItems} />
      <HorizontalScrollList
        options={userLinkItems}
        renderItem={({ label, href, icon }, index) => {
          const path = bindPathParams(href, { userId: user?.id })
          const isInit = section == undefined && index == 0
          return (
            <PaperLinkButton
              icon={icon}
              text={label}
              href={path}
              isActive={section == getActiveByPath(href) || isInit}
            />
          )
        }}
      />
    </>
  )
}
