import { PageSubtitleTypography } from './styled'

interface IPageSubtitle {
  children?: React.ReactNode
}
export const PageSubtitle: React.FC<IPageSubtitle> = ({ children }) => {
  return (
    <PageSubtitleTypography color='disabled' variant='subtitle1' mt={1}>
      {children}
    </PageSubtitleTypography>
  )
}

export default PageSubtitle
