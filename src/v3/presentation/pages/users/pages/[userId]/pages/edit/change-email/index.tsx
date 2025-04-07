import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormChangeEmail } from '@/v3/presentation/pages/users/components/FormChangeEmail'

export const ChangeEmailEditPage = () => {
  return (
    <>
      <PageHeader title='Alterar e-mail' />

      <CBaseContainer>
        <CContainerContent>
          <FormChangeEmail />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
