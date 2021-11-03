import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button} from '@chakra-ui/button'
import { 
    Heading, 
    Box, 
    Text
} from '@chakra-ui/react'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { useRouter } from 'next/router'
import axios from 'axios'
import Profile from '../../components/Profile/Profile'
import ReactLoading from 'react-loading'

export const Dashboard = () => {
    useProtectedPage()
    const router = useRouter()
    const [profile, setProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    const [loading, setLoading] =  useState(true)

    const checkIfHasProfile = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/getMentorById?userId=${router.query.userId}`, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        .then((res) => {
            if (res.data.length === 1) {
                setProfile(res.data[0])
                setHasProfile(true)
                setLoading(false)
            }
        })
        .catch((err) => {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentees/getMenteeById?userId=${router.query.userId}`, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then((res) => {
                    if (res.data[0]) {
                    setProfile(res.data[0])
                    setHasProfile(true)
                    setLoading(false)
                } else {
                    setHasProfile(false)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    useEffect(() => {
        checkIfHasProfile()
    }, [router])

    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Box>
            <Box d='flex' backgroundColor="#2B7DE9" h="60px" justifyContent="space-between" alignItems="center">
                <Heading as="h1" color="#FFFFFF" ml="32px" fontFamily='Bebas Neue, cursive'>Mentorada</Heading>
                <Link href='/'><Button variant='link' color='white' colorScheme='telegram' onClick={logout} mr="8px">Sair</Button></Link>
            </Box>
            {loading ?
                <Box d='flex' justifyContent='center' alignItems='center' mt='64px'>
                    <ReactLoading type='spin' color='#2B7DE9' height='72px' width='72px' />
                </Box>
            :
                <>
                    {hasProfile ? 
                        <Box>
                            <Heading as="h2" size="3xl" textAlign="center" m="24px 8px" fontFamily='Bebas Neue, cursive'>Seu perfil está completo! 🎉</Heading>
                            <Heading as="h3" size="md" textAlign="center" m="0px 8px 40px 8px" color="#555555">Agora é só ficar de olho no seu e-mail e esperar a conexão 👀</Heading>
                            <Box d="flex" justifyContent="center">
                                <Profile profile={profile} />
                            </Box>
                            <Link href={`/dashboard/editProfile?userId=${router.query.userId}`}><Button colorScheme="telegram" d="flex" m="16px auto">Editar perfil</Button></Link>
                        </Box>
                        :
                        <Box>
                            <Heading as="h2" size="2xl" textAlign="center" m="40px 8px 16px 8px">Quase lá! Crie seu perfil para se conectar!</Heading>
                            <Text textAlign="center" maxW="350px" mx="auto" mb="32px">Precisamos de algumas informações sobre você para garantirmos a melhor conexão.</Text>
                            <Link href='/dashboard/createProfile'><Button size="lg" colorScheme="telegram" d="flex" m="8px auto" maxW="300px" isFullWidth>Criar perfil</Button></Link>
                        </Box> 
                    }
                </>
            }
        </Box>
    )
}

export default Dashboard