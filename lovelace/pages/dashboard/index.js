import React from 'react'
import Link from 'next/link'
import { Button} from '@chakra-ui/button'
import { 
    Heading, 
    Box, 
    Text
} from '@chakra-ui/react'
import { useProtectedPage } from '../../hooks/useProtectedPage'

export const Dashboard = () => {
    useProtectedPage()

    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Box>
            <Box d='flex'>
                <Heading>Dashboard</Heading>
                <Link href='/'><Button colorScheme='telegram' onClick={logout}>Sair</Button></Link>
            </Box>
            <Text>Crie o seu perfil para se conectar!</Text>
            <Link href='/dashboard/createProfile'><Button colorScheme="telegram">Criar perfil</Button></Link>
        </Box>
    )
}

export default Dashboard