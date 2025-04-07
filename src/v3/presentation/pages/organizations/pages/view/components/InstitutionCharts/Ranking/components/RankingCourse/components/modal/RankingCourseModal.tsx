import { Dialog, DialogContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Close } from '@mui/icons-material'
import { useMemo, useState } from 'react'

import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { EXPERIMENTAL_SearchInput } from '@/v3/presentation/components/EXPERIMENTAL_SearchInput'

import PersonCourse from '../../../PersonCourse'
import { PersonCourseType } from '../../../PersonCourse/type'

interface IModal {
  open?: boolean
  onClose: (isSuccess: boolean) => void
  person: PersonCourseType
}

const limit = 6
export const RankingCourseModal = ({ open, onClose, person }: IModal) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!searchTerm) return person
    return person.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [person, searchTerm])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * limit
    const end = start + limit
    return filteredData.slice(start, end)
  }, [filteredData, currentPage])

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <Dialog
      open={!!open}
      onClose={() => onClose(false)}
      aria-labelledby='change-status-dialog'
      aria-describedby='change-status-description'
    >
      <DialogContent>
        <Box p={2}>
          <Box display='flex' justifyContent='space-between'>
            <Box>
              <Typography variant='h3' fontWeight={600} mb={1}>
                Lei Lucas
              </Typography>
              <Typography variant='h5' fontWeight={400} mb={1}>
                Confira como está o andamento do curso da Lei Lucas dos seus colaboradores:
              </Typography>
              <EXPERIMENTAL_SearchInput
                name='search_input_person'
                fullWidth
                onSearch={handleSearch}
                placeholder='Nome do colaborador'
                data-testid='searchInputName'
              />
            </Box>
            <Close
              fontSize='small'
              onClick={() => onClose(false)}
              sx={{ color: 'var(--mui-palette-grey-600)', cursor: 'pointer' }}
            />
          </Box>
          <Box mt={1}>
            <PersonCourse person={paginatedData} />
          </Box>
        </Box>
        <CPagination
          count={Math.ceil(filteredData.length / limit)}
          totalCount={filteredData.length}
          page={currentPage}
          onChange={handlePageChange}
        />
      </DialogContent>
    </Dialog>
  )
}

export default RankingCourseModal
