import React from 'react'
import Link from 'next/link'
import { Box, Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'

export const Register = () => {
    return (
        <Box>
            <Heading>Cadastro</Heading>
            <ButtonGroup>
                <Link href='/dashboard'>
                    <Button colorScheme='telegram'>Cadastrar</Button>
                </Link>
                <Link href='/'>
                    <Button colorScheme='telegram' variant='outline'>Voltar</Button>
                </Link>
            </ButtonGroup>
        </Box>
    )
}

export default Register