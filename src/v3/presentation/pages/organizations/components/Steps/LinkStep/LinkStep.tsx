import { OrganizationType } from '../../../constants/organizationType'

import { Institution } from './Institution'
import { Brand } from './Brand'
import { Network } from './Network'

interface LinkStepProps {
  organizationType: OrganizationType
}

export const LinkStep = ({ organizationType }: LinkStepProps) => {
  const views = {
    [OrganizationType.INSTITUTION]: <Institution />,
    [OrganizationType.BRAND]: <Brand />,
    [OrganizationType.NETWORK]: <Network />,
  }

  return views[organizationType]
}
