import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { Heading, Box } from '@chakra-ui/react'
import { useProtectedPage } from '../hooks/useProtectedPage'

export const Dashboard = () => {
    useProtectedPage()
    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Box>
            <Heading>Dashboard</Heading>
            <Link href='/'><Button colorScheme='telegram' onClick={logout}>Sair</Button></Link>
        </Box>
    )
}

export default Dashboard