import WelcomeCard from '../components/WelcomeCard'
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
          <Box d='flex' backgroundColor="#0088CC" h="60px" justifyContent="center" alignItems="center">
            <Heading as="h1" color="#FFFFFF" >Mentorada</Heading>
          </Box>
          <Stack my='48px' mx="16px" spacing='24px'>
            <Stack spacing='8px'>
              <Heading as="h1" size="xl" textAlign="center">Bem-vinda(o) ao Mentorada!</Heading>
              <Text textAlign="center"><b>Conecte-se com pessoas do mercado de tecnologia!</b> Você pode criar conexões que vão te ajudar a conseguir seu primeiro emprego ou ajudar alguém com esse objetivo. <b>Vamos nessa?</b></Text>
            </Stack>
            <ButtonGroup d="flex" justifyContent="center">
              <Link href='/login'>
                <Button colorScheme='telegram' variant='outline'>Fazer Login</Button>
              </Link>
              <Link href='/register'>
                <Button colorScheme='telegram'>Cadastre-se</Button>
              </Link>
            </ButtonGroup>
          </Stack>
        </> :
        <Box d="flex">
          <Box bg='#2B7DE9' w='40%' d='flex' alignItems='center' justifyContent='center'>
            <Image src={connectionIcon} width={300} height={300} alt='Imagem de conexões'/>
          </Box>
          <Box w='60%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
            <WelcomeCard />
          </Box>
        </Box>
      }
    </>
  )
}
