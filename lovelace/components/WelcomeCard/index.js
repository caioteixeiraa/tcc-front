import React from 'react'
import Link from 'next/link'
import { Text, Heading, Stack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'

export const WelcomeCard = () => {
  return (
    <Stack m='48px' spacing='24px'>
      <Stack spacing='8px'>
        <Heading>Hello lovelace!</Heading>
        <Text>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</Text>
      </Stack>
      <ButtonGroup>
      <Link href='/login'>
        <Button colorScheme='telegram' variant='outline'>Fazer Login</Button>
        </Link>
      <Link href='/register'>
        <Button colorScheme='telegram'>Cadastre-se</Button>
      </Link>
      </ButtonGroup>
    </Stack>
  )
}

export default WelcomeCard