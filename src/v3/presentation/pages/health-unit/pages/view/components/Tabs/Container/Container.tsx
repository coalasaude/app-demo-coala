import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'

import { Tab, Tabs } from './Tabs'
import { Wrapper } from './styles'

type TabProps = {
  label: string
}

type Props = {
  children: React.ReactElement<TabProps>[]
}

export const Container = ({ children }: Props) => {
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'tab' })

  const tabFromUrl = Number(queryParam) || 0

  const tabNames = children.map((child) => child.props.label)

  return (
    <>
      <Tabs
        variant='scrollable'
        allowScrollButtonsMobile
        value={tabFromUrl}
        onChange={(e, value) => setQueryParam(value)}
      >
        {tabNames.map((label, index) => (
          <Tab key={index} value={index} label={label} />
        ))}
      </Tabs>

      <Wrapper>{children[tabFromUrl]}</Wrapper>
    </>
  )
}
