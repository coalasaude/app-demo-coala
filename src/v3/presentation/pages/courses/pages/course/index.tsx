import Router from 'next/router'
import Image from 'next/legacy/image'
import { useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'

import CourseDefaultCover from '/public/assets/images/Course/CourseDefaultCover.svg'
import CourseDefaultCoverDesk from '/public/assets/images/Course/CourseDefaultCoverDesk.svg'

import { breakpoint } from '@/utils/breakpoints'
import { useFetchCourse } from '@/v3/presentation/hooks/useFetchCourse'
import { useFetchModuleList } from '@/v3/presentation/hooks/useFetchModuleList'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'

import { ModuleContainer } from '../../components/ModuleContainer'
import { formatDescriptions } from '../../utils/formatDescriptions'

import {
  StyledCourseBannerContainer,
  StyledCourseContainer,
  StyledCourseContainerContent,
  StyledDescriptionTitle,
  StyledCourseWrapper,
} from './styles'

export const Course = () => {
  const { id } = Router.query
  const { data: course, postRegisterInCourse, couldRegister } = useFetchCourse(Number(id))
  const { data: modules, refetch } = useFetchModuleList(Number(id))
  const isLargeDevice = useMediaQuery(`(min-width: ${breakpoint('md')})`)
  const [haveCourse, setHaveCourse] = useState(false)
  useEffect(() => {
    if (course && course.isEnrolled) setHaveCourse(course.isEnrolled)
  }, [course])

  useEffect(() => {
    setHaveCourse(couldRegister)
  }, [couldRegister])

  useEffect(() => {
    if (haveCourse) {
      refetch
    }
  }, [haveCourse, refetch])

  return (
    <>
      {course && modules ? (
        <StyledCourseWrapper>
          <PageHeader
            title={course?.title || ''}
            onBack={() => Router.push(NEW_ROUTES.AUTHENTICATED.COURSE.path)}
            actionButtonProps={
              haveCourse
                ? undefined
                : {
                    children: 'Matricule-se',
                    onClick: async () => {
                      postRegisterInCourse(Number(id))
                    },
                  }
            }
          />
          <StyledCourseBannerContainer>
            {course?.imageUrl ? (
              <Image
                src={course.imageUrl}
                alt={`${course?.title}-banner`}
                layout='fill'
                objectFit='cover'
              />
            ) : isLargeDevice ? (
              <CourseDefaultCoverDesk width='100%' height='100%' preserveAspectRatio='none' />
            ) : (
              <CourseDefaultCover width='100%' height='100%' preserveAspectRatio='none' />
            )}
          </StyledCourseBannerContainer>
          {course?.descriptions.map((description) => (
            <StyledCourseContainer key={description.id}>
              <StyledDescriptionTitle>{description.title}</StyledDescriptionTitle>
              <StyledCourseContainerContent>
                {formatDescriptions(description.description)}
              </StyledCourseContainerContent>
            </StyledCourseContainer>
          ))}
          <ModuleContainer
            showProgress={haveCourse}
            showIcon={haveCourse}
            modules={modules}
            isClickable={haveCourse}
          />
        </StyledCourseWrapper>
      ) : (
        <ViewSkeleton />
      )}
    </>
  )
}
