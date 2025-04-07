import { Stack } from '@mui/material'
import { useMemo } from 'react'

import { CBaseContainer } from '@/v3/presentation/newComponents'
import { RecordsType } from '@/types/records'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useBreakpoint } from '@/hooks/useBreakpoints'

import { AddRecordsList } from './components/AddRecordsList'
import { AddRecordContent } from './components/AddRecordContent/AddRecordContent'
import { contentMap, titleMap } from './constants'
import { MenuRecordsIcon } from './components/MenuRecordsIcon'

type AddRegisterProps = {
  isResumeVideoLog?: boolean
}

export const AddRegister = ({ isResumeVideoLog }: AddRegisterProps) => {
  const isDesktop = useBreakpoint('md', 'up')
  const isSmallDevice = useBreakpoint('sm')
  const { queryParam: recordType, setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
    defaultValue: isDesktop ? (RecordsType.MEDICAL_RECORDS as string) : null,
  })

  const handleSelectRecord = (recordType: string) => {
    setQueryParam(recordType?.toString())
  }

  const handleDeselectRecord = () => {
    setQueryParam(null)
  }

  const content = useMemo(() => {
    const title = recordType ? titleMap[recordType] : null
    const Component = recordType ? contentMap[recordType] : null

    return { title, Component }
  }, [recordType])

  return (
    <CBaseContainer
      withContentPadding={false}
      boxShadow='none'
      sx={{ position: 'relative', pt: 2, border: 'none' }}
    >
      <Stack
        direction={isResumeVideoLog ? 'column' : 'row'}
        gap={4}
        width='100%'
        height={{ xs: '100%' }}
        sx={(theme) => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
      >
        <AddRecordsList
          direction={isSmallDevice ? 'column' : isResumeVideoLog ? 'row' : 'column'}
          menuRecords={MenuRecordsIcon}
          onSelect={(record) => handleSelectRecord(record)}
          selected={recordType}
        />

        {recordType && (
          <AddRecordContent
            title={content.title}
            registerType={recordType}
            onDeselect={handleDeselectRecord}
          >
            {content.Component && <content.Component />}
          </AddRecordContent>
        )}
      </Stack>
    </CBaseContainer>
  )
}

export default AddRegister
