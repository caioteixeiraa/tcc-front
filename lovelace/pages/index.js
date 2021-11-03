import { Box, Text, Stack, Link, Heading } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/button'
import Image from 'next/image'
import connectionIcon from '../assets/images/connection.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useWindowProperties } from '../helpers/useWindowProperties'

export default function Home() {
  const { isMobile } = useWindowProperties()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ping`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      {isMobile ? 
        <>
          <Box d='flex' backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
            <Heading as="h1" size='2xl' color="#FFFFFF" fontFamily='Bebas Neue, cursive'>Mentorada</Heading>
          </Box>
          <Stack my='48px' mx="16px" spacing='24px'>
            <Stack spacing='8px'>
              <Heading as="h1" size="3xl" textAlign="center" fontFamily='Bebas Neue, cursive'>Bem-vinda(o) ao <u>Mentorada</u>!</Heading>
              <Text textAlign="center"><b>Conecte-se com pessoas do mercado de tecnologia!</b> Você pode criar conexões que vão te ajudar a conseguir seu primeiro emprego ou ajudar alguém com esse objetivo. <b>Vamos nessa?</b></Text>
            </Stack>
            <ButtonGroup d="flex" justifyContent="center">
              <Link href='/login'>
                <Button colorScheme='telegram' variant='outline' >Fazer Login</Button>
              </Link>
              <Link href='/register'>
                <Button colorScheme='telegram'>Cadastre-se</Button>
              </Link>
            </ButtonGroup>
          </Stack>
          <Box bg='#2B7DE9' w='100vw' py='16px'>
              <Heading as="h2" size="2xl" m="24px" color='white' fontFamily='Bebas Neue, cursive' textAlign='center'>Como funciona:</Heading>
              <Box d='flex' flexDir='column' justifyContent='center' alignItems='center' textAlign='center'>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px'>
                  <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>1</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Cadastre-se</Text>
                  <Text>Você cria um <b>cadastro na plataforma</b>. Essa etapa é simples, basta um e-mail e senha e mandaremos um <b>código de confirmação</b> para seu e-mail.</Text>
                </Box>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px' mt='16px'>
                  <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>2</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Crie um perfil</Text>
                  <Text>Agora é a hora de criar um <b>perfil com suas competências</b> para ser conectada(o). Você pode escolher entre mentorar ou ser mentorada(o) por uma pessoa :D</Text>
                </Box>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px' mt='16px'>
                  <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>3</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Pronto!</Text>
                  <Text>Depois de criado o perfil, você pode editá-lo quantas vezes quiser e <b>esperar receber um e-mail com a pessoa que foi conectada com você!</b></Text>
                </Box>
              </Box>
            </Box>
          <Box d='flex' backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
            <Heading as="h1" size='sm' color="#FFFFFF">feito com ❤️ por caio teixeira</Heading>
          </Box>
        </> :
        <Box>
          <Box bg='#2B7DE9' d='flex' flexDir='column' justifyContent='center' alignItems='center' p="40px">
            <Image src={connectionIcon} width={200} height={200} alt='Imagem de conexões'/>
            <Heading as="h1" size="4xl" mt="24px" color='white' fontFamily='Bebas Neue, cursive'>Bem-vinda(o) ao <u>Mentorada</u>!</Heading>
          </Box>
          <Box d='flex' flexDir='column' alignItems='center' textAlign='center'>
            <Stack m='72px' spacing='24px' maxW='500px'>
              <Stack spacing='8px'>
                <Text fontSize='lg'><b>Conecte-se com pessoas do mercado de tecnologia!</b> Você pode criar conexões que vão te ajudar a conseguir seu primeiro emprego ou ajudar alguém com esse objetivo. <b>Vamos nessa?</b></Text>
              </Stack>
              <ButtonGroup onGroup d='block' m='0 auto 48px'>
                <Link href='/login'>
                  <Button colorScheme='telegram' variant='outline' size='lg'>Entrar</Button>
                </Link>
                <Link href='/register'>
                  <Button colorScheme='telegram' size='lg'>Cadastre-se</Button>
                </Link>
              </ButtonGroup>
            </Stack>
            <Box bg='#2B7DE9' w='100vw'>
              <Heading as="h2" size="2xl" m="24px" color='white' fontFamily='Bebas Neue, cursive'>Como funciona:</Heading>
              <Box d='flex' flexDir='row' mx='4%' my="16px" justifyContent='space-evenly'>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px'>
                  <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>1</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Cadastre-se</Text>
                  <Text>Você cria um <b>cadastro na plataforma</b>. Essa etapa é simples, basta um e-mail e senha e mandaremos um <b>código de confirmação</b> para seu e-mail.</Text>
                </Box>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px'>
                  <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>2</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Crie um perfil</Text>
                  <Text>Agora é a hora de criar um <b>perfil com suas competências</b> para ser conectada(o). Você pode escolher entre mentorar ou ser mentorada(o) por uma pessoa :D</Text>
                </Box>
                <Box maxW='300px' bg='white' border='2px solid #000000' p='24px' borderRadius='8px'>
                <Text fontSize='6xl' fontFamily='Bebas Neue, cursive'>3</Text>
                  <Text fontSize='2xl' as='u' fontFamily='Bebas Neue, cursive'>Pronto!</Text>
                  <Text>Depois de criado o perfil, você pode editá-lo quantas vezes quiser e <b>esperar receber um e-mail com a pessoa que foi conectada com você!</b></Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box d='flex' backgroundColor="#2B7DE9" h="60px" justifyContent="center" alignItems="center">
            <Heading as="h1" size='sm' color="#FFFFFF">feito com ❤️ por caio teixeira</Heading>
          </Box>
        </Box>
      }
    </>
  )
}
