import styled from 'styled-components'
import { Box } from '@mui/material'

import Paper from '@/v3/presentation/components/Paper'
import { spacing } from '@/v3/presentation/utils/spacing'

export const Container = styled(Paper)`
  border-radius: 4px;
  width: fit-content;
  min-width: 300px;
  padding: ${spacing(1)};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const CardHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${spacing(1)} ${spacing(0)} 0 ${spacing(2)};
`

export const CardBody = styled(Box)`
  padding: ${spacing(2)};
  margin-top: ${spacing(0)};
`
export const CardActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing(1)};
  margin-top: ${spacing(2)};
`
