import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Router from 'next/router'
import { Box } from '@mui/material'

import { Class } from '@/v3/domain/Class'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { breakpoint } from '@/utils/breakpoints'

import ProgressBar from '../ProgressBar'

import {
  ModuleAccordionWrapper,
  StyledAccordionDetails,
  StyledAccordionItem,
  StyledAccordionItemTitle,
  StyledAccordionWrapper,
  StyledModuleAccordionTitle,
  StyledProgressBarWrapper,
} from './styles'

interface IModuleAccordionProps {
  title: string
  items: Class[] | { name: string; id: number; alreadyViewed: boolean }[]
  number: number
  haveQuiz?: boolean
  progress?: number
  onClick?: (id?: number) => void
  moduleId?: number
  isClickable?: boolean
}

export const ModuleAccordion: React.FC<IModuleAccordionProps> = ({
  title,
  items,
  number,
  haveQuiz,
  progress,
  onClick,
  moduleId,
  isClickable,
}) => {
  return (
    <ModuleAccordionWrapper>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          width='100%'
          sx={{
            [`@media (max-width: ${breakpoint('sm')})`]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            },
          }}
        >
          <StyledModuleAccordionTitle style={{ fontSize: '16px' }}>
            {number} - {title}
          </StyledModuleAccordionTitle>
          {progress !== undefined && (
            <StyledProgressBarWrapper hasMinWidth={true}>
              <ProgressBar value={progress} />
            </StyledProgressBarWrapper>
          )}
        </Box>
      </AccordionSummary>

      <StyledAccordionDetails>
        {items.map((item, index) => {
          return (
            <StyledAccordionWrapper
              key={`${item.name}${index}`}
              onClick={() => onClick?.(item?.id)}
              isClickable={isClickable}
            >
              <StyledAccordionItem>
                {item.alreadyViewed && (
                  <CheckCircleOutlineIcon style={{ color: 'var(--mui-palette-success-main)' }} />
                )}
                {!item.alreadyViewed && <DescriptionOutlinedIcon />}
                <StyledAccordionItemTitle style={{ fontSize: '14px' }}>
                  {item.name}
                </StyledAccordionItemTitle>
              </StyledAccordionItem>
              <StyledAccordionItemTitle style={{ fontSize: '12px' }}>
                {'duration' in item ? `${Math.round(item.duration / 60)}min` : ''}
              </StyledAccordionItemTitle>
            </StyledAccordionWrapper>
          )
        })}
        {haveQuiz && (
          <StyledAccordionWrapper
            isClickable={isClickable}
            onClick={() =>
              onClick &&
              Router.push(
                bindPathParams(NEW_ROUTES.AUTHENTICATED.COURSE.QUIZ.path, {
                  id: String(Router.query.id),
                  moduleId: String(moduleId),
                })
              )
            }
          >
            <StyledAccordionItem>
              <DescriptionOutlinedIcon />
              <StyledAccordionItemTitle>Quiz</StyledAccordionItemTitle>
            </StyledAccordionItem>
          </StyledAccordionWrapper>
        )}
      </StyledAccordionDetails>
    </ModuleAccordionWrapper>
  )
}
