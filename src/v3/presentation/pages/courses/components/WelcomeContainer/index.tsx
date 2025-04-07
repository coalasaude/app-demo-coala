import dayjs from 'dayjs'

import {
  WelcomeContainerDescription,
  WelcomeContainerTitle,
  WelcomeContainerWrapper,
} from './styles'

export const WelcomeContainer = ({ name, description }: { name: string; description?: string }) => {
  function greetings(): string {
    const currentTime = dayjs().hour()

    if (currentTime >= 5 && currentTime < 13) {
      return 'Bom dia'
    } else if (currentTime >= 12 && currentTime < 19) {
      return 'Boa tarde'
    } else {
      return 'Boa noite'
    }
  }

  return (
    <WelcomeContainerWrapper>
      <WelcomeContainerTitle>
        {greetings()}, {name}!
      </WelcomeContainerTitle>
      {description && <WelcomeContainerDescription>{description}</WelcomeContainerDescription>}
    </WelcomeContainerWrapper>
  )
}
