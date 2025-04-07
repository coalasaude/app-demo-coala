import { Grid } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { CContainerContent, CDisplayRecord } from '@/v3/presentation/newComponents'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { UserInfoSection } from '../UserInfoSection'

import { UserInfoHealthProfessionalProps } from './types'

export const UserInfoHealthProfessional = ({
  professionalReference,
  onAdd,
  onDelete,
  isLoading,
}: UserInfoHealthProfessionalProps) => {
  const { handleModal } = useModalContext()

  const handleDelete = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => onDelete(id)}
        title='Excluir Profissional de Saúde'
        description='Tem certeza que deseja excluir esse profissional de saúde?'
      />,
    )
  }

  return (
    <UserInfoSection title='Contato de profissional de saúde' onEdit={onAdd} variant='text'>
      <Grid container spacing={2}>
        {professionalReference?.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <CContainerContent
              key={item.id}
              onClickIcon={() => handleDelete(item.id)}
              title={item.name}
              subtitle={item.getProfessionalType()}
              isLoading={isLoading}
              icon={<DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />}
            >
              <Grid container spacing={2} pt={1}>
                <Grid item xs={12} sm={6}>
                  <CDisplayRecord label='E-mail' value={item.email} withDivider={false} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CDisplayRecord
                    label='Telefone'
                    value={item.getFormattedPhone()}
                    withDivider={false}
                  />
                </Grid>
              </Grid>
            </CContainerContent>
          </Grid>
        ))}
      </Grid>
      {professionalReference.length === 0 && (
        <NotFound text='Não existem profissionais cadastrados' mt={3} mb={2} />
      )}
    </UserInfoSection>
  )
}
