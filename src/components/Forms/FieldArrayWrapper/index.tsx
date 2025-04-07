import { Box } from '@mui/material'
import { Delete } from '@mui/icons-material'

interface IFieldArray {
  children: React.ReactNode
  onRemove: (...keys: any) => any
  mt?: 0 | 1 | 2 | 3 | 4
}
export const FieldArrayWrapper = ({ children, onRemove }: IFieldArray) => {
  return (
    <Box display='flex' alignItems='center'>
      {children}
      <Box ml={2} sx={{ cursor: 'pointer' }}>
        <Delete
          className='icon-color'
          sx={(theme) => ({
            fill: theme.palette.grey[200],
            fontSize: 24,
          })}
          onClick={onRemove}
        />
      </Box>
    </Box>
  )
}

export default FieldArrayWrapper
