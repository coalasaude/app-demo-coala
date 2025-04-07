import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { PaperButton } from '../PaperButton'

import { PaperLinkButtonProps } from './types'

export const PaperLinkButton = ({ isActive, text, icon: Icon, href }: PaperLinkButtonProps) => {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<any>) => {
    if (!event.ctrlKey) {
      const queryParams = router.asPath.split('?')[1]
      event.preventDefault()
      event.stopPropagation()
      router.replace(href + (queryParams ? `?${queryParams}` : ''), undefined, { shallow: true })
    }
  }

  return (
    <NextLink href={href} target='_self' style={{ flex: 1, minWidth: '115px', maxWidth: '180px' }}>
      <PaperButton onClick={handleClick} icon={Icon} text={text} isActive={isActive} />
    </NextLink>
  )
}
