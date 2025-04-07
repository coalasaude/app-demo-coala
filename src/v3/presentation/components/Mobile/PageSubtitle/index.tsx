import { PageSubtitleTypography } from './styles'

interface IPageSubtitle {
  children?: React.ReactNode
}
export const PageSubtitle: React.FC<IPageSubtitle> = ({ children }) => {
  return (
    <PageSubtitleTypography color='disabled' variant='subtitle2'>
      {children}
    </PageSubtitleTypography>
  )
}

export default PageSubtitle
