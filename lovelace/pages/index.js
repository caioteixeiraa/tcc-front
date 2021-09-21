import WelcomeCard from '../components/WelcomeCard'
import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import connectionIcon from '../assets/images/connection.png'
import { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
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
    <Flex>
      <Box bg='#2B7DE9' w='50%' d='flex' alignItems='center' justifyContent='center'>
        <Image src={connectionIcon} width={300} height={300} alt='Imagem de conexões'/>
      </Box>
      <Box w='50%' h='100vh' d='flex' alignItems='center' justifyContent='center'>
        <WelcomeCard />
      </Box>
    </Flex>
  )
}
