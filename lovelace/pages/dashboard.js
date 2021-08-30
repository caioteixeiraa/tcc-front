import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { Heading, Box } from '@chakra-ui/react'

export const Dashboard = () => {
    return (
        <Box>
            <Heading>Dashboard</Heading>
            <Link href='/'><Button colorScheme='telegram'>Sair</Button></Link>
        </Box>
    )
}

export default Dashboard