import Router, { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'
import { useFetchClass } from '@/v3/presentation/hooks/useFetchClass'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useFetchCourse } from '@/v3/presentation/hooks/useFetchCourse'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import YouTubeVideo from '@/v3/presentation/components/YoutubePlayer'
import { PageHeader } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'
import useMediaQuery from '@/hooks/useMediaQuery'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'

import { PlayerController } from '../../components/PlayerController'
import { extractYouTubeVideoId } from '../../../../../utils/extractYouTubeVideoId'

import {
  StyledClassContainer,
  StyledClassDescription,
  StyledClassDescriptionWrapper,
  StyledClassTitle,
  StyledClassWrapper,
  StyledClassWrapperUtils,
  StyledFileLink,
  StyledVideoWrapper,
} from './styles'

export const Class = () => {
  const router = useRouter()
  const { classId, id } = router.query
  const { data: currentClass, registerAttendance } = useFetchClass(Number(classId))
  const { data: course } = useFetchCourse(Number(id))
  const { prev, next } = currentClass?.findPrevAndNext() || { prev: null, next: null }
  const isMobileApp = useMediaQuery('sm') && WebViewManager.hasWebView()
  const AllowFulscreenVideo = useFeatureFlag({
    flag: FeatureFlag.ALLOW_APP_VIDEO_FULLSCREEN,
  })

  const onBack = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
        id: String(id),
      }),
    )
  }

  return (
    <>
      {currentClass && course ? (
        <StyledClassWrapper>
          <PageHeader title={course.title} onBack={onBack} />
          <StyledClassContainer>
            <StyledVideoWrapper>
              {AllowFulscreenVideo.isActive && isMobileApp && (
                <Box
                  onClick={(e) => {
                    e.stopPropagation()
                    if (currentClass?.video) {
                      WebViewManager.sendVideoUrl(currentClass?.video)
                      registerAttendance()
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    zIndex: 999,
                  }}
                />
              )}
              <YouTubeVideo
                videoId={extractYouTubeVideoId(currentClass.video) || ''}
                onPlay={registerAttendance}
              />
            </StyledVideoWrapper>
            <PlayerController
              style={{ margin: '8px 0' }}
              menuAction={() =>
                Router.push(
                  bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.MODULES.path, {
                    id: String(id),
                  }),
                )
              }
              prevAction={
                prev
                  ? () =>
                      Router.push(
                        bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.CLASS.path, {
                          id: String(id),
                          classId: String(prev),
                        }),
                      )
                  : null
              }
              nextAction={
                next
                  ? () =>
                      Router.push(
                        bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.CLASS.path, {
                          id: String(id),
                          classId: String(next),
                        }),
                      )
                  : null
              }
            />
          </StyledClassContainer>
          <StyledClassContainer>
            <StyledClassDescriptionWrapper>
              <StyledClassTitle>
                <Typography variant='h3'>Módulo - {currentClass?.module?.name}</Typography>
                <CDivider sx={{ my: 1 }} />
                <Typography variant='h2'>{currentClass.name}</Typography>
              </StyledClassTitle>
              <StyledClassDescription
                dangerouslySetInnerHTML={{ __html: currentClass.description }}
              />
            </StyledClassDescriptionWrapper>
            {currentClass.material && (
              <StyledClassWrapperUtils>
                <Typography variant='h3'>Arquivos</Typography>
                <StyledFileLink
                  href={currentClass.material}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {currentClass.material}
                </StyledFileLink>
              </StyledClassWrapperUtils>
            )}
          </StyledClassContainer>
        </StyledClassWrapper>
      ) : (
        <ViewSkeleton />
      )}
    </>
  )
}
