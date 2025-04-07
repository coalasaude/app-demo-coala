import { useEffect, useMemo, useState } from 'react'

import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { RecordEvent } from '@/v3/domain/@v2/appointment/record-event.model'

export const useRecordSelection = (records: RecordEvent[], isResumeVideoLog: boolean) => {
  const [viewOverlay, setViewOverlay] = useState(false)
  const isMobile = useBreakpoint('sm')

  const { queryParam: recordId, replaceManyQueryParam } = useUrlQueryControl({
    queryName: 'recordId',
  })
  const { queryParam: type } = useUrlQueryControl({
    queryName: 'type',
  })

  const record = useMemo(() => {
    const data = records.find(
      (record) => record?.id === Number(recordId) && record?.recordType === type,
    )
    return data
  }, [records, recordId, type])

  const handleSelectRecord = (recordId: number, recordType?: string) => {
    replaceManyQueryParam({
      recordId: recordId?.toString(),
      type: recordType || null,
    })

    if (isResumeVideoLog) setViewOverlay(true)
  }

  const handleDeselectRecord = () => {
    replaceManyQueryParam({ recordId: null })
    if (isResumeVideoLog) setViewOverlay(false)
  }

  useEffect(() => {
    const canInitRecord = (!recordId || !type) && records.length && !isMobile && !isResumeVideoLog

    if (canInitRecord) {
      const lastItem = records[0]

      if (lastItem) {
        replaceManyQueryParam({
          recordId: lastItem?.id?.toString(),
          type: lastItem?.recordType || null,
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, isMobile, isResumeVideoLog])

  return {
    record,
    handleSelectRecord,
    handleDeselectRecord,
    viewOverlay,
    recordId,
    type,
  }
}
