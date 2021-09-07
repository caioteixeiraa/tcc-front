import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Box,
    Flex, 
    Heading, 
    Input, 
    Stack, 
    InputGroup, 
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/button'
import connectionIcon from '../assets/images/connection.png'
import showIcon from '../assets/images/show.png'
import hideIcon from '../assets/images/hide.png'
import axios from 'axios'
import { useInput } from '../hooks/useInput'
import { useRouter } from 'next/router'

export const Login = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useInput('')
    const [password, setPassword] = useInput('')
    const router = useRouter()

    const login = () => {
        const body = {
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/users/login', body)
        .then((res) => {
            console.log("Logado!")
            localStorage.setItem('token', res.data.accessToken)
            router.push('dashboard')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Flex>
            <Box bg='#2B7DE9' w='50%' d='flex' alignItems='center' justifyContent='center'>
                <Image src={connectionIcon} width={300} height={300} alt='Imagem de conexões' />
            </Box>
            <Box w='50%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
                <Stack spacing={4} w='400px'>
                    <Heading>Entre em Lovelace</Heading>
                    <Stack>
                        <Input
                            placeholder="E-mail"
                            type='email'
                            value={email}
                            onChange={setEmail}
                        />
                        <InputGroup>
                            <Input
                                placeholder="Senha"
                                type={show ? 'text' : 'password'}
                                value={password}
                                onChange={setPassword}
                            />
                            <InputRightElement>
                                <Button p='10px' onClick={handleClick}>
                                    {show ?
                                        <Image src={hideIcon} width={40} height={40} /> :
                                        <Image src={showIcon} width={40} height={40} />
                                    }
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                    <ButtonGroup>
                        <Button colorScheme='telegram' onClick={login}>Entrar</Button>
                        <Link href='/'>
                            <Button colorScheme='telegram' variant='outline'>Voltar</Button>
                        </Link>
                    </ButtonGroup>
                </Stack>
            </Box>
        </Flex>
    )
}

export default Login