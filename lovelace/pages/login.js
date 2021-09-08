import React, { useState } from 'react'
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const [newPassword, setNewPassword] = useInput('')
    const [confirmNewPassword, setConfirmNewPassword] = useInput('')
    const [emailToken, setEmailToken] = useInput('')

    const login = () => {
        const body = {
            email: email,
            password: password
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, body)
        .then((res) => {
            console.log("Logado!")
            window.localStorage.setItem('token', res.data.accessToken)
            router.push('dashboard')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const forgotPassword = () => {
        const body = {
            email: email
        }

        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/forgot`, body)
        .then((res) => {
            console.log("E-mail enviado")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const resetPassword = () => {
        const body = {
            token: emailToken,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword
        }

        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/reset`, body)
        .then((res) => {
            onClose()
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
                        <Button 
                        colorScheme='telegram' 
                        variant='text' 
                        onClick={() => {
                            onOpen(),
                            forgotPassword()
                        }}
                        >Esqueci minha senha</Button>
                    </ButtonGroup>
                </Stack>
            </Box>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Trocar senha</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Text>Foi enviado um código de 6 dígitos para o e-mail <Text as='b' d='span'>{email}</Text>, preencha-o abaixo e escolha sua nova senha.</Text>
                                <Text fontSize='xs' as='i'>*Não esqueça de checar o spam e abas de promoções ;)</Text>
                            </Stack>
                            <Input 
                                placeholder="Código de confirmação" 
                                maxLength={6}
                                value={emailToken}
                                onChange={setEmailToken} 
                            />
                            <InputGroup>
                            <Input
                                placeholder="Nova senha"
                                type={show ? 'text' : 'password'}
                                value={newPassword}
                                onChange={setNewPassword}
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
                            <Input 
                                placeholder="Confirme a nova senha" 
                                type="password"
                                value={confirmNewPassword}
                                onChange={setConfirmNewPassword}
                            />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={resetPassword}>
                            Confirmar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Login