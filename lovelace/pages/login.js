import React from 'react'
import Link from 'next/link'
import { Box, Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'

export const Login = () => {
  return (
      <Box>
          <Heading>Login</Heading>
          <ButtonGroup>
              <Link href='/dashboard'>
                  <Button colorScheme='telegram'>Entrar</Button>
              </Link>
              <Link href='/'>
                  <Button colorScheme='telegram' variant='outline'>Voltar</Button>
              </Link>
              <Link href='/register'>
                  <Button colorScheme='telegram' variant='link'>Cadastre-se</Button>
              </Link>
          </ButtonGroup>
      </Box>
  )
}

export default Login