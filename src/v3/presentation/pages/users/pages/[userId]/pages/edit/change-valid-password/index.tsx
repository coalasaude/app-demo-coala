import { useRouter } from 'next/router'

import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'
import { FormValidPassword } from '@/v3/presentation/pages/users/components/FormValidPassword'

export const ChangeValidPasswordPage = () => {
  const route = useRouter()
  const isEmailRoute = route.asPath.includes('email')
  const isTelefoneRoute = route.asPath.includes('telefone')
  const title =
    isEmailRoute || isTelefoneRoute ? 'Alterar dados de login' : 'Alterar informações pessoais'

  return (
    <>
      <PageHeader title={title} />

      <CBaseContainer>
        <CContainerContent>
          <FormValidPassword />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}
