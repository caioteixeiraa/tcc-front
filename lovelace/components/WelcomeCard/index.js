import React from 'react'
import Link from 'next/link'
import { Text, Heading, Stack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'

export const WelcomeCard = () => {
  return (
    <Stack m='48px' spacing='24px'>
      <Stack spacing='8px'>
        <Heading as="h1" size="3xl">Bem-vinda(o) ao Mentorada!</Heading>
        <Text><b>Conecte-se com pessoas do mercado de tecnologia!</b> Você pode criar conexões que vão te ajudar a conseguir seu primeiro emprego ou ajudar alguém com esse objetivo. <b>Vamos nessa?</b></Text>
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