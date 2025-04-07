import Image from 'next/legacy/image'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'

import CourseDefaultCover from '/public/assets/images/Course/CourseDefaultCover.svg'

import ProgressBar from '../ProgressBar'
import { StyledProgressBarWrapper } from '../ModuleAccordion/styles'

import {
  StyledCourseCardImageWrapper,
  StyledCourseCardInfoLink,
  StyledCourseCardTitle,
  StyledCourseCardWrapper,
} from './styles'

export type CourseCardType = 'info' | 'progress' | 'certificate' | 'admin'

interface CourseCardProps {
  img?: string
  progress?: number
  title: string
  type: CourseCardType
  onClick?: () => void
  hasBenefits?: boolean
}
export const CourseCard: React.FC<CourseCardProps> = ({
  img,
  title,
  type,
  onClick,
  progress,
  hasBenefits,
}) => {
  return (
    <StyledCourseCardWrapper onClick={onClick} isInteractive>
      <StyledCourseCardImageWrapper>
        {img ? (
          <Image src={img} alt={title} layout='fill' objectFit='cover' priority={true} />
        ) : (
          <CourseDefaultCover width='100%' height='100%' />
        )}
      </StyledCourseCardImageWrapper>
      <StyledCourseCardTitle>{title}</StyledCourseCardTitle>
      {type === 'info' && (
        <StyledCourseCardInfoLink>
          <span>Saiba Mais</span>
          <KeyboardArrowRightIcon />
        </StyledCourseCardInfoLink>
      )}
      {type === 'progress' && progress !== undefined && (
        <StyledProgressBarWrapper>
          <ProgressBar value={progress * 100} />
        </StyledProgressBarWrapper>
      )}
      {type === 'certificate' && hasBenefits && (
        <StyledCourseCardInfoLink>
          <SchoolOutlinedIcon sx={{ width: '18px', height: '18px' }} />
          <span>Ver certificado</span>
        </StyledCourseCardInfoLink>
      )}
    </StyledCourseCardWrapper>
  )
}
