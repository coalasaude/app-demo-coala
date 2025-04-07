import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormLoginData } from '@/v3/presentation/pages/users/components/FormLoginData'

export const LoginDataEditPage = () => {
  return (
    <>
      <PageHeader title='Editar dados de login' />

      <CBaseContainer>
        <CContainerContent title='Login' withDivider>
          <FormLoginData />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
