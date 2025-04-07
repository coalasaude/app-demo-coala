import { Box, BoxProps, Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { Profile } from '@/v3/domain/Profile'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { EducationalStageSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/EducationalStageSelectInput/EducationalStageSelectInputForm'
import { SchoolGradeSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/SchoolGradeSelectInput/SchoolGradeSelectInputForm'
import { CompanyPositionSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/CompanyPositionSelectInput/CompanyPositionSelectInputForm'

export type FormProfileSelectProps = {
  profile?: Profile
  maxInputWidth?: BoxProps['maxWidth']
  disabledSchoolGradeInput?: boolean
  educationalStageId?: number
  onEducationalInputChange?: () => void
} & BoxProps

export const FormProfileData = ({
  profile,
  maxInputWidth,
  disabledSchoolGradeInput,
  educationalStageId,
  onEducationalInputChange,
  ...props
}: FormProfileSelectProps) => {
  if (!profile) return null

  const isMedical = Profile.getIsMedicalByProfileType(profile?.type)
  const isAdmin = Profile.getIsAdminByProfileName(profile?.name)
  const isStudent = Profile.getIsDependentByProfileName(profile?.name)
  const isManager = !!profile && !isMedical && !isAdmin && !isStudent

  if (isAdmin) return null

  return (
    <Box {...props}>
      <Typography variant='h4' noWrap>
        Dados do perfil
      </Typography>
      {isMedical && (
        <Box maxWidth={maxInputWidth} mt={2}>
          <CInputControlled
            name='registration'
            label='Número de Registro'
            placeholder='Digite o número de registro '
          />
        </Box>
      )}
      {isManager && (
        <Box maxWidth={maxInputWidth} mt={2}>
          <CompanyPositionSelectInputForm name='companyPositionId' />
        </Box>
      )}
      {isStudent && (
        <GridWrapper pt={2}>
          <GridItem xs={12} md={3}>
            <CInputControlled name='enrollment' label='Matrícula ' placeholder='Matrícula' />
          </GridItem>
          <GridItem xs={12} md={3}>
            <CInputControlled name='class' label='Turma  ' placeholder='Turma ' />
          </GridItem>
          <GridItem xs={12} md={3}>
            <EducationalStageSelectInputForm
              name='educationalStageId'
              placeholder='Segmento'
              onEducationalChange={onEducationalInputChange}
            />
          </GridItem>
          <GridItem xs={12} md={3}>
            <SchoolGradeSelectInputForm
              name='schoolGradeId'
              placeholder='Série'
              disabled={disabledSchoolGradeInput}
              educationalStageId={educationalStageId}
            />
          </GridItem>
        </GridWrapper>
      )}
    </Box>
  )
}
