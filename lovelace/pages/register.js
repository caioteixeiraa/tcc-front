import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Box,
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
import { isMobile } from 'react-device-detect'
import { useWindowProperties } from '../helpers/useWindowProperties'

export const Register = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useInput('')
    const [password, setPassword] = useInput('')
    const [confirmPassword, setConfirmPassword] = useInput('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [emailToken, setEmailToken] = useInput('')
    const [conflictEmail, setConflictEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [isSignupError, setIsSignupError] = useState(false)

    const { isMobile } = useWindowProperties()

    const router = useRouter()

    const register = () => {
        const body = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        console.log(body)

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, body)
        .then(() => {
            onOpen()
        })
        .catch((err) => {
            console.log(err)
            console.log(err.response.data.message)
            if (err.response.data.message === 'Email is already in use') {
                setConflictEmail(true)
            } else {
                setIsSignupError(true)   
            }
        })
    }

    const activate = () => {
        const body = {
            email: email,
            code: emailToken
        }

        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/activate`, body)
        .then(() => {
            router.push('login')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const checkPassword = () => {
        if (password.length < 6) {
            setIsValidPassword(false)
        } else {
            setIsValidPassword(true)
        }
    }

    useEffect(() => {
        setIsSignupError(false)
        checkPassword()
    }, [email, password])

    return (
        <>
        {!isMobile ?
            <Box d="flex">
                <Box bg='#2B7DE9' w='40%' d='flex' alignItems='center' justifyContent='center'>
                    <Image src={connectionIcon} width={300} height={300} alt='Imagem de conex??es' />
                </Box>
                <Box w='60%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
                    <Stack spacing={4} w='400px'>
                        <Heading size='2xl' fontFamily='Bebas Neue, sans-serif'>Cadastro</Heading>
                        <Stack>
                            <Box>
                                <Input
                                    placeholder="E-mail"
                                    type='email'
                                    value={email}
                                    onChange={(value) => {
                                        setEmail(value)
                                        setConflictEmail(false)
                                    }}
                                />
                                {conflictEmail && <Text as='i' color='crimson' fontSize='xs'>Esse e-mail j?? est?? sendo utilizado.</Text>}
                            </Box>
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
                            {!isValidPassword && <Text as='i' color='crimson' fontSize='xs'>A senha deve ter no m??nimo 6 caracteres.</Text>}
                            <Input
                                placeholder="Confirme sua senha"
                                type='password'
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                            />
                        </Stack>
                        {isSignupError && <Text as='i' color='crimson' fontSize='xs'>Algo deu errado, tente novamente :(</Text>}
                        <ButtonGroup>
                            <Button colorScheme='telegram' onClick={register}>Cadastrar</Button>
                            <Button colorScheme='telegram' variant='outline' onClick={() => router.back()}>Voltar</Button>
                        </ButtonGroup>
                    </Stack>
                </Box> 
            </Box> :
            <>
                <Heading as="h1" color="#FFFFFF" backgroundColor="#2B7DE9" size='2xl' h="60px" d="flex" justifyContent="center"alignItems="center" fontFamily='Bebas Neue, sans-serif'>Mentorada</Heading>
                <Box d='flex' alignItems='center' justifyContent='center' textAlign="center" mt="32px">
                    <Stack spacing={4}>
                        <Stack spacing={2} mx="16px">
                            <Heading size='2xl' fontFamily='Bebas Neue, sans-serif'>Cadastro</Heading>
                            <Text>Bastam um e-mail e senha e voc?? receber?? um c??digo por e-mail para confirmar o cadastro.</Text>
                        </Stack>
                        <Stack>
                            <Box>
                                <Input
                                    placeholder="E-mail"
                                    type='email'
                                    value={email}
                                    maxWidth="300px"
                                    onChange={(value) => {
                                        setEmail(value)
                                        setConflictEmail(false)
                                    }}
                                />
                                {conflictEmail && <Text as='i' color='crimson' fontSize='xs'>Esse e-mail j?? est?? sendo utilizado.</Text>}
                            </Box>
                            <Box d="flex" justifyContent="center">
                                <InputGroup maxWidth='300px'>
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

                            </Box>
                            {!isValidPassword && <Text as='i' color='crimson' fontSize='xs'>A senha deve ter no m??nimo 6 caracteres.</Text>}
                            <Box d="flex" justifyContent="center">
                                <Input
                                    placeholder="Confirme sua senha"
                                    type='password'
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                    maxWidth="300px"
                                />
                            </Box>
                        </Stack>
                        {isSignupError && <Text as='i' color='crimson' fontSize='xs'>Algo deu errado, tente novamente :(</Text>}
                        <Box d="flex" flexDir="column" alignItems="center" >
                            <Button colorScheme='telegram' onClick={register} isFullWidth maxWidth="300px" mb="8px">Cadastrar</Button>
                            <Button colorScheme='telegram' variant='outline' onClick={() => router.back()} isFullWidth maxWidth="300px">Voltar</Button>
                        </Box>
                    </Stack>
                </Box>
            </>
        }
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirme seu e-mail :)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Text>Foi enviado um c??digo de 6 d??gitos para o e-mail <Text as='b' d='span'>{email}</Text>, preencha-o abaixo.</Text>
                                <Text fontSize='xs' as='i'>*N??o esque??a de checar o spam e abas de promo????es ;)</Text>
                            </Stack>
                            <Input placeholder="C??digo de confirma????o" value={emailToken} onChange={setEmailToken} maxLength={6} />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={activate}>
                            Confirmar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Register