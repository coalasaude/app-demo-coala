import { Add } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

import { spacing } from '@/utils/spacing'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { BoxButton } from './components/BoxButton'
import { StyledContainerHeader } from './style'
import { StackListFormContainerProps } from './types'

export function StackListFormContainer<T>({
  onEdit,
  onAdd,
  data,
  icon,
  getSubText,
  onHideItem = () => false,
  getText,
  emptyText = 'Nenhuma dado cadastrado',
  title = 'Adicione:',
  addButtonText = 'Novo item',
}: StackListFormContainerProps<T>) {
  let indexTrack = 0

  return (
    <>
      <StyledContainerHeader>
        <Typography variant='body1' mr={spacing(2)}>
          {title}
        </Typography>
        <Button
          sx={{ minWidth: 'fit-content' }}
          variant='outlined'
          onClick={onAdd}
          startIcon={<Add />}
        >
          {addButtonText}
        </Button>
      </StyledContainerHeader>

      <Stack spacing={spacing(1)}>
        {data.filter((item, index) => !onHideItem?.(item, index)).length > 0 ? (
          data.map((item, index) => {
            if (onHideItem?.(item, index)) return null

            const indexValue = indexTrack
            indexTrack++

            return (
              <BoxButton
                key={index}
                text={getText(item, indexValue)}
                icon={icon}
                subText={getSubText(item, index)}
                onClick={() => onEdit?.(item, index)}
              />
            )
          })
        ) : (
          <NotFound text={emptyText} />
        )}
      </Stack>
    </>
  )
}
