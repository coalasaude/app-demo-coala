import { createContext, useContext, useMemo } from 'react'
import { Step } from 'react-joyride'
import { useSetState } from 'react-use'

const appState = {
  run: false,
  stepIndex: 0,
  steps: [],
  tourActive: false,
  guideTourType: '',
}

export interface AppState {
  run: boolean
  stepIndex: number
  steps: Step[]
  tourActive: boolean
  guideTourType: string
}

export const AppContext = createContext({
  state: appState,
  setState: () => undefined,
})
AppContext.displayName = 'AppContext'

export function JoyrideProvider(props: any) {
  const [state, setState] = useSetState(appState)

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [setState, state],
  )

  return <AppContext.Provider value={value} {...props} />
}

export function useJoyrideContext(): {
  setState: (patch: Partial<AppState> | ((previousState: AppState) => Partial<AppState>)) => void
  state: AppState
} {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useJoyrideContext must be used within a AppProvider')
  }

  return context
}
