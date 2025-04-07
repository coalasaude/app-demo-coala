import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormValidPhoneToken } from '@/v3/presentation/pages/users/components/FormValidPhoneToken'

export const ChangePhoneTokenPage = () => {
  return (
    <>
      <PageHeader title='Alterar telefone' />

      <CBaseContainer>
        <CContainerContent>
          <FormValidPhoneToken />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
