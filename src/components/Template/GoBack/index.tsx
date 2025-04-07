import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { ArrowBackIos } from '@mui/icons-material'

interface IGoBack {
  route?: string
  onClick?: any
  color?: any
}
export const GoBack = ({ route, onClick: onClickProps, color }: IGoBack) => {
  const router = useRouter()
  const onClick = () => {
    if (route) {
      router.push(route)
      return
    }
    router.back()
  }
  return (
    <Box display='flex' alignItems='center' mb={2} style={{ borderRadius: '4px' }}>
      <ArrowBackIos
        onClick={onClickProps || onClick}
        className='cursor-pointer'
        sx={{ color: color }}
      />
    </Box>
  )
}
