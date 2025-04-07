import { Box } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { useFetchBrowseInstitutionalPeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowseInstitutionalPeiPdi'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import PeiPdiAnalysisFilter from '../PeiPdiAnalysisFilter/PeiPdiAnalysisFilter'
import PeiPdiAnalysisList from '../PeiPdiAnalysisList/PeiPdiAnalysisList'
import InstitutionalEmptyPlans from '../../PeiPdiAnalysisEmptyPlans/PeiPdiAnalysisEmptyPlans'

const PeiPdiAnalysisBody = () => {
  const router = useRouter()
  const institutionId = Number(router.query.id)
  const { user } = useAuth()
  const userId = user?.id || 0
  const [searchName, setSearchName] = useState('')
  const [offset, setOffset] = useState(0)
  const [pageCounter, setPageCounter] = useState(1)
  const { data, pagination, isLoading } = useFetchBrowseInstitutionalPeiPdi({
    institutionId,
    userId,
    limit: 10,
    offset,
    name: searchName,
  })

  if (!data?.length && !isLoading && !searchName) return <InstitutionalEmptyPlans />

  return (
    <Box>
      <PeiPdiAnalysisFilter onSearch={setSearchName} defaultValue={searchName} />
      <PeiPdiAnalysisList
        plans={{ data, pagination }}
        setOffset={setOffset}
        pageCounter={pageCounter}
        setPageCounter={setPageCounter}
        isLoading={isLoading}
      />
    </Box>
  )
}

export default PeiPdiAnalysisBody
