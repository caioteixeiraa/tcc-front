import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button} from '@chakra-ui/button'
import { 
    Heading, 
    Box,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ButtonGroup, 
} from '@chakra-ui/react'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { useRouter } from 'next/router'
import axios from 'axios'
import Profile from '../../components/Profile/Profile'
import ReactLoading from 'react-loading'
import { translateProfile } from '../../helpers/translate'
import { useWindowProperties } from '../../helpers/useWindowProperties'

export const Dashboard = () => {
    useProtectedPage()
    const router = useRouter()
    const [profile, setProfile] = useState({})
    const [hasProfile, setHasProfile] = useState(false)
    const [loading, setLoading] =  useState(true)
    const [profileType, setProfileType] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isMobile } = useWindowProperties()

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
                setProfileType('mentor')
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
                if (res.data.length === 1) {
                    setProfile(res.data[0])
                    setHasProfile(true)
                    setProfileType('mentee')
                    setLoading(false)
                } else {
                    setHasProfile(false)
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        })
    }

    const deleteProfile = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${profileType}s/delete?userId=${localStorage.getItem('userId')}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then((res) => {
            setHasProfile(false)
            setProfile({})
            setProfileType('')
            onClose()
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        checkIfHasProfile()
    }, [router])

    const logout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Box height="100vh" position="relative">
            <Box d='flex' backgroundColor="#2B7DE9" h="60px" justifyContent="space-between" alignItems="center">
                <Heading as="h1" color="#FFFFFF" ml="32px" fontFamily='Bebas Neue, sans-serif'>Mentorada</Heading>
                <Link href='/'><Button variant='link' color='white' colorScheme='telegram' onClick={logout} mr="8px">Sair</Button></Link>
            </Box>
            {loading ?
                <Box d='flex' justifyContent='center' alignItems='center'>
                    <Box position="absolute" bottom="50%">
                        <ReactLoading type='spin' color='#2B7DE9' height='72px' width='72px' />
                    </Box>    
                    <Box d='flex' position={`${isMobile ? 'inherit' : 'fixed'}`} bottom="0" width="100vw" backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
                        <Heading as="h1" size='sm' color="#FFFFFF">feito com ❤️ por caio teixeira</Heading>
                    </Box>
                </Box>
            :
                <>
                    {hasProfile ? 
                        <Box position="relative">
                            <Heading as="h2" size="3xl" textAlign="center" m="24px 8px" fontFamily='Bebas Neue, sans-serif'>Seu perfil está completo! 🎉</Heading>
                            <Heading as="h3" size="md" textAlign="center" m="0px 8px 40px 8px" color="#555555">Agora é só ficar de olho no seu e-mail e esperar a conexão 👀</Heading>
                            <Box d="flex" justifyContent="center">
                                <Profile profile={profile} profileType={translateProfile(profileType)} />
                            </Box>
                            <Link href={`/dashboard/editProfile?userId=${router.query.userId}`}><Button colorScheme="telegram" d="flex" m="16px auto">Editar perfil</Button></Link>
                            <Button colorScheme='red' variant='outline' d='block' m='0 auto' onClick={onOpen}>Deletar perfil</Button>
                            <Box d='flex' mt='40px' position={`${isMobile ? 'inherit' : 'fixed'}`} bottom="0" width="100vw" backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
                                <Heading as="h1" size='sm' color="#FFFFFF">feito com ❤️ por caio teixeira</Heading>
                            </Box>
                        </Box>
                        :
                        <Box>
                            <Heading as="h2" size="2xl" textAlign="center" m="40px 8px 16px 8px">Quase lá! Crie seu perfil para se conectar!</Heading>
                            <Text textAlign="center" maxW="350px" mx="auto" mb="32px">Precisamos de algumas informações sobre você para garantirmos a melhor conexão.</Text>
                            <Link href='/dashboard/createProfile'><Button size="lg" colorScheme="telegram" d="flex" m="8px auto" maxW="300px" isFullWidth>Criar perfil</Button></Link>
                            <Box d='flex' position={`${isMobile ? 'inherit' : 'fixed'}`} bottom="0" width="100vw" backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
                                <Heading as="h1" size='sm' color="#FFFFFF">feito com ❤️ por caio teixeira</Heading>
                            </Box>
                        </Box> 
                    }
                </>
                
            }
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} mx="16px">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deletar perfil</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <Text as='b'>Tem certeza que deseja deletar seu perfil?</Text>
                            <Text>Lembrando que você <b>continuará tendo seu cadastro</b>, mas não terá um perfil para ser conectado.</Text>
                            <ButtonGroup d='flex' justifyContent='center'>
                                <Button colorScheme='telegram' variant='outline' onClick={onClose}>Cancelar</Button>
                                <Button colorScheme='red' onClick={deleteProfile}>Deletar meu perfil</Button>
                            </ButtonGroup>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default Dashboard