import { TabContext, TabListProps } from '@mui/lab'
import { Tab, TabProps } from '@mui/material'

import { TabsWrapper } from '@/components/Template/AuthTemplate/TabsWrapper'

import { StyledTabList } from './styles'

type Props = {
  tabsValue: {
    id: any
    name: string
  }[]
  value: any
  onChange: (id: any) => void
  tabListProps?: TabListProps
  tabProps?: TabProps
}

export const Tabs = ({ value, tabsValue, onChange, tabListProps, tabProps }: Props) => {
  return (
    <TabsWrapper>
      <TabContext value={value}>
        <StyledTabList
          value={value}
          variant='scrollable'
          scrollButtons='auto'
          sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}
          {...(tabListProps || {})}
        >
          {tabsValue.map(({ name, id }) => (
            <Tab
              key={id}
              label={name}
              value={id}
              sx={{ textTransform: 'none' }}
              onClick={() => onChange(id)}
              {...(tabProps || {})}
            />
          ))}
        </StyledTabList>
      </TabContext>
    </TabsWrapper>
  )
}

export default Tabs
