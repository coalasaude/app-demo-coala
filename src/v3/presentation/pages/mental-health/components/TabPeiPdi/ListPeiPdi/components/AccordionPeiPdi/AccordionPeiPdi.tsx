import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface AccordionPeiPdiProps {
  title: JSX.Element | string
  onClick?: () => void
  subtitle?: JSX.Element | string
  children?: React.ReactNode
  expanded?: AccordionProps['expanded']
  defaultExpanded?: AccordionProps['defaultExpanded']
  sx?: AccordionProps['sx']
}

const AccordionPeiPdi = ({ title, subtitle, children, onClick, ...rest }: AccordionPeiPdiProps) => {
  return (
    <Accordion {...rest} onClick={onClick}>
      <Box>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {typeof title === 'string' ? <Typography variant='h5'>{title}</Typography> : title}
        </AccordionSummary>
        {typeof subtitle === 'string' ? (
          <Typography variant='body2' color='var(--mui-palette-grey-600)'>
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </Box>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </Accordion>
  )
}

export default AccordionPeiPdi
