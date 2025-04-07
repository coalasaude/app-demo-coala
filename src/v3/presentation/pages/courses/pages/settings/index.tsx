import Router from 'next/router'
import { useEffect, useState } from 'react'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useFetchCourse } from '@/v3/presentation/hooks/useFetchCourse'
import { CreateCoursePayload, useMutateCourse } from '@/v3/presentation/hooks/useMutateCourse'
import { PageHeader } from '@/v3/presentation/newComponents'
import CTabs from '@/v3/presentation/components/TabsContainer'

import { GeneralSettings } from '../../components/GeneralSettings'
import { DetailsSettings } from '../../components/DetailsSettings/DetailsSettings'

export const CourseSettings = () => {
  const { id } = Router.query
  const { data: course } = useFetchCourse(Number(id))
  const { updateCourse } = useMutateCourse()
  const [courseData, setCourseData] = useState<CreateCoursePayload>({
    csvCourse: undefined,
    csvQuestions: undefined,
    title: '',
    descriptions: '',
    isPublished: false,
    image: undefined,
    id: 0,
    certificateValidity: '',
    profiles: [],
  })

  const handleGeneralSettingsUpdate = (data: any) => {
    setCourseData((prevState) => ({ ...prevState, ...data }))
    updateCourse({ ...courseData, ...data }, Number(id))
  }

  useEffect(() => {
    if (course) {
      setCourseData({
        id: course.id,
        csvCourse: undefined,
        csvQuestions: undefined,
        title: course.title,
        descriptions: JSON.stringify(course.descriptions),
        isPublished: course.isPublished,
        image: undefined,
        certificateValidity: course.certificateValidity,
        profiles: course?.profiles?.map((profile) => profile.id) || [],
      })
    }
  }, [course])

  const tabsViews = [
    <GeneralSettings
      key='generalSettings'
      course={course}
      onUpdate={handleGeneralSettingsUpdate}
    />,
    <DetailsSettings
      key='DetailsSettings'
      descriptions={course?.descriptions}
      onUpdate={handleGeneralSettingsUpdate}
      isEdit
    />,
  ]
  const tabsName = ['Dados Gerais', 'Página de detalhes']

  return (
    <>
      {!id ? (
        <ViewSkeleton />
      ) : (
        <>
          <PageHeader title='Configuração do Curso' />
          <CTabs tabsNames={tabsName} tabsBody={tabsViews} />
        </>
      )}
    </>
  )
}
