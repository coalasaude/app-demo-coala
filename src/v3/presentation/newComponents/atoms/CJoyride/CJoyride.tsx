import Joyride, { ACTIONS, type CallBackProps, EVENTS, STATUS } from 'react-joyride'
import { useRouter } from 'next/router'
import { useMount } from 'react-use'
import { usePostHog } from 'posthog-js/react'

import { NEW_ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/useParams'
import useMediaQuery from '@/hooks/useMediaQuery'

import { useJoyrideContext } from './useJoyrideContext'
import { buttonStyle } from './styles'
import { Steps } from './constants'

type StepData = {
  openModal?: boolean
  isTheEnd?: boolean
  openSidebar?: boolean
  previous?: string
  next?: string
  isNavBar?: boolean
  timeout?: number
}

export const CJoyride = () => {
  const router = useRouter()
  const posthog = usePostHog()
  const isSmallDevice = useMediaQuery('sm')
  const { setParams } = useParams()
  const {
    setState,
    state: { run, stepIndex, guideTourType },
  } = useJoyrideContext()
  const steps = Steps(guideTourType)

  useMount(() => {
    setState({ steps })
  })

  const handleCallback = (data: CallBackProps) => {
    const {
      action,
      index,
      status,
      step: { data: stepData },
      type,
    } = data
    const { next, previous, openModal, openSidebar, isTheEnd, isNavBar, timeout } =
      (stepData as StepData) || {}
    const isPreviousAction = action === ACTIONS.PREV
    const isNextAction = action === ACTIONS.NEXT
    const isStopAction = action === ACTIONS.STOP
    const isNavBarAction = isNavBar && isSmallDevice
    posthog.capture('guide_tour', { action, index, status, type, isNextAction, isStopAction })

    const scrollSideBar = () => {
      setTimeout(() => {
        const element = document.getElementById('sidebar-content')
        element?.scrollTo(0, 0)
      }, 3000)
    }

    if (type === EVENTS.STEP_AFTER) {
      const openSideBar = isNavBarAction ? false : !!openSidebar

      setParams({ openSidebar: !!openSideBar })

      if (!!openModal && isNextAction) {
        router.push(`${NEW_ROUTES.AUTHENTICATED.HELLO.path}?modalFinished=true`)
      } else if (isTheEnd) {
        setState({ run: false, tourActive: false })
      } else if (next && isNextAction) {
        setTimeout(() => {
          setState({ run: false, stepIndex: index + 1 })
        }, timeout || 0)

        scrollSideBar()
        router.push(next)
      } else if (previous && isPreviousAction) {
        setState({ run: true, stepIndex: index - 1 })

        scrollSideBar()
        router.push(previous)
      } else if (isPreviousAction) {
        setState({ run: true, stepIndex: index - 1 })

        scrollSideBar()
      } else {
        setTimeout(() => {
          setState({ run: true, stepIndex: index + 1 })
        }, timeout || 0)

        scrollSideBar()
      }
    }

    if (type === EVENTS.TOUR_STATUS && status === STATUS.PAUSED) {
      if (isStopAction) {
        return setState({ run: false, tourActive: false })
      }

      setTimeout(() => {
        setState({ run: true, stepIndex: index })
      }, 2000)
    }
  }

  return (
    <Joyride
      callback={handleCallback}
      continuous
      run={run}
      stepIndex={stepIndex}
      steps={steps}
      showSkipButton
      styles={{
        options: {
          zIndex: 9999,
        },
        tooltip: {
          zIndex: 1000,
        },
        tooltipTitle: { textAlign: 'left', marginLeft: '9px', marginTop: '16px' },
        tooltipContent: { textAlign: 'left' },
        buttonNext: {
          ...buttonStyle,
          backgroundColor: 'var(--mui-palette-primary-main)',
          color: '#FFFFFF',
        },
        buttonBack: {
          ...buttonStyle,
          color: 'var(--mui-palette-primary-main)',
        },
        buttonClose: {
          color: 'black',
        },
        buttonSkip: {
          color: 'var(--mui-palette-grey-500)',
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: 500,
        },
      }}
    />
  )
}
