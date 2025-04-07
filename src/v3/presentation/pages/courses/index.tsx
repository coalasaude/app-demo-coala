import { useMemo, useState } from 'react'
import { debounce } from 'lodash'
import Router from 'next/router'
import { Box } from '@mui/material'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { CDivider } from '@/v3/presentation/newComponents'

import { useFetchCourseList } from '../../hooks/useFetchCourseList'
import { useFetchMyCourseList } from '../../hooks/useFetchMyCourseList'
import { useFetchMeCourseList } from '../../hooks/useFetchMeCourseList'
import { PageHeader } from '../../newComponents'
import CTabs from '../../components/TabsContainer'

import { CourseCardList } from './components/CourseCardList'
import { WelcomeContainer } from './components/WelcomeContainer'
import { StyledSearchBoxWrapper } from './components/CourseCardList/styles'
import { SearchBox } from './components/SearchBox'

export interface Course {
  title: string
  done: boolean
  progress: number
  img?: string
  id: number
  isSubscribed: boolean
}

export const Courses = () => {
  const { auth } = useAuth()
  const {
    data: allCourseList,
    isLoading: loadingAll,
    setFilter,
  } = useFetchCourseList(auth?.user?.id || 0)
  const { data: myCoursesList, isLoading: loadingMyCourses } = useFetchMyCourseList()
  const { data: meCourseList, isLoading: loadingMeCourses } = useFetchMeCourseList()
  const [filter, setFilters] = useState('')

  const hasPermission = useHasPermission([Permissions.MANAGE_COURSE])[0]

  const tabsViews = hasPermission
    ? [
        <>
          <Box px={2} pb={2}>
            <StyledSearchBoxWrapper>
              <SearchBox
                value={filter}
                onChange={(e) => {
                  setFilters(e)
                  debouncedSearch(e)
                }}
              />
              <CDivider />
            </StyledSearchBoxWrapper>
            <CourseCardList key='CursosList' courses={allCourseList} type='info' />
          </Box>
        </>,
        <>
          <Box px={2} pb={2}>
            <StyledSearchBoxWrapper>
              <SearchBox
                value={filter}
                onChange={(e) => {
                  setFilters(e)
                  debouncedSearch(e)
                }}
              />
              <CDivider />
            </StyledSearchBoxWrapper>
            <CourseCardList key='GerenciarCursosList' courses={meCourseList} type='admin' />
          </Box>
        </>,
        <CourseCardList key='MeusCursosList' courses={myCoursesList} type='progress' />,
        <CourseCardList
          key='CertificadosList'
          courses={myCoursesList.filter((course) => course.isApproved)}
          type='certificate'
        />,
      ]
    : [
        <>
          <StyledSearchBoxWrapper>
            <SearchBox
              value={filter}
              onChange={(e) => {
                setFilters(e)
                debouncedSearch(e)
              }}
            />
            <CDivider />
          </StyledSearchBoxWrapper>
          <CourseCardList key='CursosList' courses={allCourseList} type='info' />
        </>,
        <CourseCardList key='MeusCursosList' courses={myCoursesList} type='progress' />,
        <CourseCardList
          key='CertificadosList'
          courses={myCoursesList.filter((course) => course.isApproved)}
          type='certificate'
        />,
      ]
  const tabsName = hasPermission
    ? ['Cursos', 'Gerenciar Cursos', 'Meus Cursos', 'Certificados']
    : ['Cursos', 'Meus Cursos', 'Certificados']

  const debouncedSearch = useMemo(() => {
    return debounce((value) => {
      setFilter({ title: value })
    }, 1000)
  }, [setFilter])

  return (
    <>
      {loadingAll || loadingMyCourses || loadingMeCourses ? (
        <ViewSkeleton />
      ) : (
        <>
          <PageHeader
            title='Área de ensino'
            onBack={() => Router.push(`${ROUTES.MODULES.APP}${AUTHENTICATED_ROUTES.HELLO}`)}
            actionButtonProps={
              hasPermission
                ? {
                    children: 'Novo',
                    onClick: () => Router.push(NEW_ROUTES.AUTHENTICATED.COURSE.CREATE.path),
                  }
                : undefined
            }
          />
          <WelcomeContainer
            name={auth.user?.name || 'Usuário'}
            description='Aqui você pode explorar os cursos oferecidos pela Coala, acompanhar a sua evolução nos cursos e gerenciar os seus certificados da Coala.'
          />
          <CTabs tabsNames={tabsName} tabsBody={tabsViews} />
        </>
      )}
    </>
  )
}
