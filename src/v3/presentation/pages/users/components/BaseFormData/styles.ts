import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

export const CBaseFormButtonStyled = styled(Box)<{ canAction: boolean }>`
  border: 1px solid;

  padding: 7px 14px;
  border-radius: 8px;
  ${({ canAction }) => `
  border-color: ${canAction ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-grey-400)'};
  cursor: ${canAction ? 'pointer' : 'default'};
  `}
`

export const EditOutlinedIconStyled = styled(EditOutlinedIcon)<{ canAction: boolean }>`
  ${({ canAction }) => `
  fill: ${canAction ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-grey-400)'};
  height: 20px;
  width: 20px;
`}
`
