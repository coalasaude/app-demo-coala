import React, { useEffect } from 'react'

import { Tab, Tabs } from '@/v3/presentation/components/Tabs'

import { StyledCourseTabsWrapper } from './styles'

interface ICourseTabsProps {
  tabsNames: string[]
  tabsView: React.ReactNode[]
  changeTab?: boolean
  onChange?: (param: any) => void
}

export const CourseTabs = ({ tabsNames, tabsView, changeTab, onChange }: ICourseTabsProps) => {
  const [currentView, setCurrentView] = React.useState(0)
  useEffect(() => {
    if (changeTab) {
      setCurrentView(1)
    }
  }, [changeTab])
  return (
    <StyledCourseTabsWrapper>
      <Tabs
        value={currentView}
        onChange={(e, value) => {
          if (onChange) {
            onChange(() => setCurrentView(value))
            return
          }
          setCurrentView(value)
        }}
      >
        {tabsNames.map((name, index) => (
          <Tab value={index} label={name} key={`${name}${index}`} />
        ))}
      </Tabs>
      {tabsView[currentView]}
    </StyledCourseTabsWrapper>
  )
}
