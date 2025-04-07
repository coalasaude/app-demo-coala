import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import Router from 'next/router'
import { useEffect } from 'react'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'
import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { Course } from '@/v3/domain/Course'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useMutateCourse } from '@/v3/presentation/hooks/useMutateCourse'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'

import { CourseCard, CourseCardType } from '../CourseCard'

interface CourseCardListProps {
  courses: Course[]
  type: CourseCardType
}

export const CourseCardList: React.FC<CourseCardListProps> = ({ courses, type }) => {
  const { createCertificate, certificateUrl } = useMutateCourse()

  useEffect(() => {
    if (certificateUrl) {
      downloadByProxy({ url: certificateUrl })
    }
  }, [certificateUrl])

  if (courses.length === 0 && type !== 'admin')
    return (
      <Box p={1}>
        <NotFound mt={2} text='Nenhum curso foi encontrado' />
      </Box>
    )

  if (type === 'admin' && courses.length === 0)
    return (
      <Box p={1}>
        <NotFound text='Você ainda não adicionou cursos' />
      </Box>
    )
  return (
    <>
      <GridWrapper
        py={type === 'admin' ? 0 : 2}
        px={2}
        style={{
          width: type === 'admin' ? '100%' : undefined,
          marginLeft: type === 'admin' ? '0' : undefined,
        }}
      >
        {type !== 'admin' &&
          courses?.map((course, index) => (
            <GridItem key={`${course.title}${index}`} xs={6} md={3}>
              <CourseCard
                title={course.title}
                type={type}
                img={course.imageUrl}
                progress={course?.progress}
                hasBenefits={!!course?.benefits}
                onClick={() => {
                  if (type === 'progress') {
                    Router.push(
                      bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
                        id: String(course.id),
                      }),
                    )
                  }
                  if (type === 'info') {
                    Router.push(
                      bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.VIEW.path, {
                        id: String(course.id),
                      }),
                    )
                  }
                  if (type === 'certificate') {
                    createCertificate(course.id)
                  }
                }}
              />
            </GridItem>
          ))}
        {type === 'admin' && courses.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: '#F3F5F7' }}>
                <CTableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </CTableRow>
              </TableHead>
              <TableBody>
                {courses.map(({ id, title, status }) => {
                  return (
                    <CTableRow
                      key={id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#EEE9F7',
                          cursor: 'pointer',
                        },
                      }}
                      onClick={() =>
                        Router.push(
                          bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.SETTINGS.path, {
                            id: String(id),
                          }),
                        )
                      }
                    >
                      <TableCell style={{ fontWeight: 'bold' }}>{title}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CircleIcon
                            sx={{ color: status === 'ACTIVE' ? 'green' : 'red', width: '10px' }}
                          />
                          {status === 'ACTIVE' ? 'Ativo' : 'Desativado'}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <ChevronRightOutlinedIcon sx={{ float: 'right' }} />
                      </TableCell>
                    </CTableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </GridWrapper>
    </>
  )
}
