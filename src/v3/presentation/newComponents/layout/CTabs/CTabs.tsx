import { Box, BoxProps, TabProps, TabsProps } from '@mui/material'

import { spacing } from '@/utils/spacing'

import { useUrlQueryControl } from '../../../hooks/useUrlQueryControl'
import Paper from '../../../components/Paper'
import { Tab, Tabs } from '../../../components/Tabs'
import { TabSkeleton } from '../../../pages/health-history/components/Skeletons/TabSkeleton'

interface CTabsProps extends BoxProps {
  tabsNames: string[]
  queryName?: string
  defaultIndex?: number | string
  tabsWrapperProps?: TabsProps
  tabsProps?: TabProps[]
  tabsBody: React.ReactNode[]
  isLoading?: boolean
  containerProps?: BoxProps
  onChangeTab?: (index: number) => void
}

export const CTabs = ({
  tabsBody,
  tabsNames,
  queryName = 'tab',
  p = 0,
  isLoading,
  tabsProps,
  tabsWrapperProps,
  containerProps,
  onChangeTab,
  defaultIndex,
  ...props
}: CTabsProps) => {
  const { queryParam, setQueryParam } = useUrlQueryControl({
    queryName,
    defaultValue: defaultIndex,
  })

  const tabFromUrl =
    typeof queryParam === 'string'
      ? tabsBody.findIndex((tab: any) => tab?.key === queryParam)
      : Number(queryParam) || 0

  const activeTab = tabFromUrl >= 0 ? tabFromUrl : 0

  if (isLoading) {
    return (
      <Paper p={2} {...props} noBorder>
        <TabSkeleton repeat={4} />
      </Paper>
    )
  }

  return (
    <Box p={p} {...props}>
      <Tabs
        variant='scrollable'
        allowScrollButtonsMobile
        value={activeTab}
        onChange={(e, value) => {
          onChangeTab?.(value)
          setQueryParam((tabsBody[value] as any)?.key)
        }}
        {...tabsWrapperProps}
        sx={{
          ...tabsWrapperProps?.sx,
          '& .MuiButtonBase-root': {
            paddingBlock: '12px',
            fontSize: '14px',
            fontWeight: 500,
            padding: 0,
            pb: spacing(1.3),
            pt: spacing(2),
            minWidth: 'auto',
            px: spacing(2),
          },
        }}
      >
        {tabsNames.map((label, index) => (
          <Tab
            key={(tabsBody[index] as any)?.key || index}
            value={index}
            label={label}
            iconPosition='start'
            {...tabsProps?.[index]}
          />
        ))}
      </Tabs>
      <Box {...containerProps}>{tabsBody[activeTab]}</Box>
    </Box>
  )
}
