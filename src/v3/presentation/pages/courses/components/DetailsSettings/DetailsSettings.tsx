import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import { CDivider } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import { useLayout } from '@/hooks/useLayout'

import { StyledCInput, StyledDeleteWrapper, StyledWrapperButtons } from '../GeneralSettings/style'
import { StyledOnlyDesktop } from '../../pages/quiz/style'

import { StyledAddText } from './style'

type Block = {
  title: string
  description: string
}

interface DetailsSettingsProps {
  onUpdate?: (data: any) => void
  descriptions?: Block[]
  isEdit?: boolean
}

export const DetailsSettings: React.FC<DetailsSettingsProps> = ({
  onUpdate,
  descriptions,
  isEdit,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([{ title: '', description: '' }])
  const { handleSubmit, control, formState, setValue, ...others } = useForm()
  const { showSnackBar } = useLayout()

  useEffect(() => {
    if (descriptions) {
      setBlocks(descriptions)
    }
    descriptions?.forEach((description, index) => {
      setValue(`blockTitle_${index}`, description.title)
      setValue(`blockDescription_${index}`, description.description)
    })
  }, [descriptions, setValue])

  const handleBlockChange = (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newBlocks: Block[] = []

    blocks.forEach((_, index) => {
      const title = formData.get(`blockTitle_${index}`) as string
      const description = formData.get(`blockDescription_${index}`) as string

      newBlocks.push({ title, description })
    })
    setBlocks(newBlocks)
  }

  const handleAddBlock = () => {
    setBlocks([...blocks, { title: '', description: '' }])
  }

  const handleDeleteBlock = (index: number) => {
    const newBlocks = [...blocks]
    newBlocks.splice(index, 1)
    setBlocks(newBlocks)
  }

  const onSubmit = () => {
    const descriptions = blocks.map((block) => ({
      title: block.title,
      description: block.description,
    }))
    onUpdate?.({ descriptions: JSON.stringify(descriptions) })
  }

  return (
    <>
      <Typography>
        Crie os textos que irão ser exibidos na página de detalhes do seu curso.
      </Typography>
      <CForm
        form={{ handleSubmit, control, formState, setValue, ...others }}
        onSubmit={onSubmit}
        onChange={handleBlockChange}
      >
        <GridWrapper container spacing={3} sx={{ marginTop: '8px', marginBottom: '16px' }}>
          {blocks.map((block, index) => (
            <>
              <GridItem item xs={12}>
                <StyledCInput
                  fullWidth
                  name={`blockTitle_${index}`}
                  placeholder='Titulo do bloco'
                  label='Titulo do bloco'
                  size='small'
                />
              </GridItem>
              <GridItem item xs={12}>
                <StyledCInput
                  fullWidth
                  name={`blockDescription_${index}`}
                  placeholder='Conteúdo do bloco'
                  label='Conteúdo do bloco'
                  rows={4}
                />
                {blocks.length > 1 && (
                  <StyledDeleteWrapper onClick={() => handleDeleteBlock(index)}>
                    <DeleteOutlineOutlinedIcon />
                    Excluir bloco
                  </StyledDeleteWrapper>
                )}
              </GridItem>
            </>
          ))}
        </GridWrapper>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: ' flex-end',
            marginBottom: '32px',
          }}
        >
          <StyledAddText onClick={handleAddBlock}>Adicionar</StyledAddText>
        </Box>
        <CDivider />
        <StyledOnlyDesktop>
          <StyledWrapperButtons style={{ justifyContent: 'flex-end', margin: '8px 0' }}>
            <Button variant='outlined' onClick={() => Router.back()}>
              Cancelar
            </Button>
            <Button
              variant='contained'
              type='submit'
              onClick={() => {
                if (!isEdit) {
                  showSnackBar({
                    type: 'success',
                    message: 'Curso Criado com sucesso',
                  })
                  Router.push(NEW_ROUTES.AUTHENTICATED.COURSE.path)
                } else {
                  showSnackBar({
                    type: 'success',
                    message: 'Alterações salvas com sucesso',
                  })
                  Router.push(NEW_ROUTES.AUTHENTICATED.COURSE.path)
                }
              }}
            >
              Salvar
            </Button>
          </StyledWrapperButtons>
        </StyledOnlyDesktop>
      </CForm>
    </>
  )
}
