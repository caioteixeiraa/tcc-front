import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Heading, Input, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'
import connectionIcon from '../assets/images/connection.png'
import showIcon from '../assets/images/show.png'
import hideIcon from '../assets/images/hide.png'

export const Register = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Flex>
      <Box bg='#2B7DE9' w='50%' d='flex' alignItems='center' justifyContent='center'>
        <Image src={connectionIcon} width={300} height={300} alt='Imagem de conexões'/>
      </Box>
      <Box w='50%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
        <Stack spacing={4} w='300px'>
            <Heading>Cadastro</Heading>
            <Stack>
                <Input placeholder="E-mail" />
                <InputGroup>
                    <Input placeholder="Senha" type={show ? 'text' : 'password'} />
                    <InputRightElement>
                            <Button p='10px' onClick={handleClick}>
                                {show ?
                                    <Image src={hideIcon} width={40} height={40} /> :
                                    <Image src={showIcon} width={40} height={40} />
                                }
                            </Button>
                        </InputRightElement>
                </InputGroup>
                <Input placeholder="Confirme sua senha" />    
            </Stack>
            <ButtonGroup>
                <Button colorScheme='telegram'>Cadastrar</Button>
            </ButtonGroup>
        </Stack>
      </Box>
    </Flex>
  )
}

export default Register