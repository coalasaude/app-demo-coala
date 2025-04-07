import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormValidEmailToken } from '@/v3/presentation/pages/users/components/FormValidEmailToken'

export const ChangeEmailTokenPage = () => {
  return (
    <>
      <PageHeader title='Alterar e-mail' />

      <CBaseContainer>
        <CContainerContent>
          <FormValidEmailToken />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
