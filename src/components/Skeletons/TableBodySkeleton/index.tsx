import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'

import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'

export const TableBodySkeleton = () => {
  const styles = {
    height: 30,
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <CTableRow>
            <TableCell>
              <Skeleton variant='text' width='50%' height={styles.height} />
            </TableCell>
            <TableCell>
              <Skeleton variant='text' width='50%' height={styles.height} />
            </TableCell>
            <TableCell>
              <Skeleton variant='text' width='30%' height={styles.height} />
            </TableCell>
            <TableCell>
              <Skeleton variant='text' width='30%' height={styles.height} />
            </TableCell>
            <TableCell>
              <Skeleton variant='text' width='50%' height={styles.height} />
            </TableCell>
            <TableCell>
              <Skeleton variant='text' width='50%' height={styles.height} />
            </TableCell>
          </CTableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 15 }).map((_, index) => (
            <CTableRow key={index}>
              <TableCell>
                <Skeleton variant='text' width='80%' height={styles.height} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='60%' height={styles.height} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='60%' height={styles.height} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='60%' height={styles.height} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='80%' height={styles.height} />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='40%' height={styles.height} />
              </TableCell>
            </CTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
