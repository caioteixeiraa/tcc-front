import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Box,
    Flex, 
    Heading, 
    Input, 
    Stack, 
    HStack,
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
    const [enableInputs, setEnableInputs] = useState(true)

    const login = () => {
        const body = {
            email: email,
            password: password
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, body)
        .then((res) => {
            window.localStorage.setItem('token', res.data.accessToken)
            window.localStorage.setItem('userId', res.data.id)
            router.push({
                pathname: '/dashboard',
                query:{ userId: res.data.id }
            })
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
            <Box bg='#2B7DE9' w='40%' d='flex' alignItems='center' justifyContent='center'>
                <Image src={connectionIcon} width={300} height={300} alt='Imagem de conexões' />
            </Box>
            <Box w='60%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
                <Stack spacing={4} w='400px'>
                    <Stack spacing={2}>
                        <Heading>Entre no Mentorada!</Heading>
                        <Text>Faça login com seu e-mail e senha.</Text>
                    </Stack>
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
                        variant='link' 
                        onClick={onOpen}
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
                                <Text>Preencha seu e-mail. Você receberá um e-mail com o código para mudar sua senha.</Text>
                                <Text fontSize='xs' as='i'>*Não esqueça de checar o spam e abas de promoções ;)</Text>
                            </Stack>
                            <HStack>
                                <Input 
                                    placeholder="E-mail" 
                                    value={email}
                                    onChange={setEmail} 
                                />
                                <Button 
                                    colorScheme='telegram' 
                                    onClick={() => {
                                        forgotPassword(),
                                        setEnableInputs(false)
                                    }}>
                                    Enviar
                                </Button>
                            </HStack>
                            <Input 
                                placeholder="Código de confirmação" 
                                maxLength={6}
                                value={emailToken}
                                onChange={setEmailToken} 
                                isDisabled={enableInputs}
                            />
                            <InputGroup>
                            <Input
                                placeholder="Nova senha"
                                type={show ? 'text' : 'password'}
                                value={newPassword}
                                onChange={setNewPassword}
                                isDisabled={enableInputs}
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
                                isDisabled={enableInputs}
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