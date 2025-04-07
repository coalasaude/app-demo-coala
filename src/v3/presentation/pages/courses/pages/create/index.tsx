import { useCallback, useEffect, useState } from 'react'
import React from 'react'

import { useMutateCourse } from '@/v3/presentation/hooks/useMutateCourse'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { PageHeader } from '@/v3/presentation/newComponents'

import { CourseTabs } from '../../components/CourseTabs'
import { GeneralSettings } from '../../components/GeneralSettings'
import { DetailsSettings } from '../../components/DetailsSettings/DetailsSettings'
import ConfirmationModal from '../../components/ConfirmationModal'

const initialStateCourseData = {
  csvCourse: undefined,
  csvQuestions: undefined,
  title: '',
  descriptions: '',
  isPublished: false,
  image: undefined,
  certificateValidity: '0',
  benefits: '',
  profiles: [],
}

export const CreateCourse = () => {
  const { createCourse } = useMutateCourse()
  const { handleModal } = useModalContext()
  const [hasSaved, setHasSaved] = useState(false)
  const [changeTab, setChangeTab] = useState(false)

  const [courseData, setCourseData] = useState(initialStateCourseData)

  const handleGeneralSettingsUpdate = (data: any) => {
    setCourseData((prevState) => ({ ...prevState, ...data }))
    setHasSaved(true)
  }

  useEffect(() => {
    if (courseData.csvCourse && courseData.descriptions) {
      createCourse({ ...courseData })
    }
  }, [courseData, createCourse])

  const handleLostData = (onConfirm: () => void) => {
    handleModal(
      <ConfirmationModal
        text='Você não salvou as alterações, tem certeza que deseja sair? As alterações serão perdidas'
        onConfirm={onConfirm}
      />
    )
  }
  const changeTabOnSave = useCallback(() => {
    setChangeTab(true)
  }, [])

  const tabsViews = [
    <GeneralSettings
      haveCertificatePreview
      key='generalSettings'
      onUpdate={handleGeneralSettingsUpdate}
      course={courseData}
      changeTabOnSave={changeTabOnSave}
    />,
    <DetailsSettings key='DetailsSettings' onUpdate={handleGeneralSettingsUpdate} />,
  ]
  const tabsName = ['Dados gerais', 'Página de detalhes']
  return (
    <>
      <PageHeader title='Configurações Cursos' />
      <CourseTabs
        tabsNames={tabsName}
        tabsView={tabsViews}
        onChange={hasSaved ? undefined : handleLostData}
        changeTab={changeTab}
      />
    </>
  )
}
