import React, { useEffect, useState } from 'react'
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

export const Register = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = useInput('')
    const [password, setPassword] = useInput('')
    const [confirmPassword, setConfirmPassword] = useInput('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [emailToken, setEmailToken] = useInput('')

    const router = useRouter()

    const register = () => {
        const body = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        axios.post('http://localhost:5000/users/signup', body)
        .then((res) => {
            console.log("Usuário cadastrado!", body, res)
            onOpen()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const activate = () => {
        const body = {
            email: email,
            code: emailToken
        }

        axios.patch('http://localhost:5000/users/activate', body)
        .then((res) => {
            console.log("Usuário ativado!", body)
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
                    <Heading>Cadastro</Heading>
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
                        <Input
                            placeholder="Confirme sua senha"
                            type='password'
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />
                    </Stack>
                    <ButtonGroup>
                        <Button colorScheme='telegram' onClick={register}>Cadastrar</Button>
                    </ButtonGroup>
                </Stack>
            </Box>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirme seu e-mail :)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Stack spacing={4}>
                            <Stack spacing={2}>
                                <Text>Foi enviado um código de 6 dígitos para o e-mail <Text as='b' d='span'>{email}</Text>, preencha-o abaixo.</Text>
                                <Text fontSize='xs' as='i'>*Não esqueça de checar o spam e abas de promoções ;)</Text>
                            </Stack>
                            <Input placeholder="Código de confirmação" value={emailToken} onChange={setEmailToken} maxLength={6} />
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
        </Flex>
    )
}

export default Register