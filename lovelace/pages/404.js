import React from 'react'
import Link from 'next/link'
import { Box, Heading } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'

export const ErrorPage = () => {
    return (
        <Box>
            <Heading>Página não encontrada :(</Heading>
            <Link href='/'><Button colorScheme='telegram'>Voltar para a home</Button></Link>
        </Box>
    )
}

export default ErrorPage