import React from 'react'
import Link from 'next/link'
import { PrimaryButton, SecondaryButton } from '../../assets/design-system/buttons'
import { CardContainer, Title, Text } from './styles'

export const WelcomeCard = () => {
  return (
    <CardContainer>
      <Title>Hello lovelace!</Title>
      <Text>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Text>
      <Link href='/login'><PrimaryButton>Fazer Login</PrimaryButton></Link>
      <Link href='/register'><SecondaryButton>Cadastre-se</SecondaryButton></Link>
    </CardContainer>
  )
}

export default WelcomeCard