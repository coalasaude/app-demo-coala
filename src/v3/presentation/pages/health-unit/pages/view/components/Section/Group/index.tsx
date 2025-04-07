import React from 'react'

import { Container } from './styles'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export const Group = ({ children }: Props) => {
  return <Container>{[children]}</Container>
}
