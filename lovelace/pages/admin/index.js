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

export const Admin = () => {
    useProtectedPage()
    const router = useRouter()
    const [mentees, setMentees] = useState([])
    const [mentors, setMentors] = useState([])
    const [selectedMentee, setSelectedMentee] = useState({})
    const [selectedMentor, setSelectedMentor] = useState({})

    const getMentees = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentees/getAllMentees`, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        console.log(res)
        setMentees(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const getMentors = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/getAllMentors`, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        console.log(res)
        setMentors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      getMentees()
      getMentors()
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
    }

    const connect = () => {
      console.log(mentee, mentor)
    }

    return (
      <>
        <Box d='flex' backgroundColor="#0088CC" h="60px" justifyContent="space-between" alignItems="center">
          <Heading as="h1" color="#FFFFFF" ml="32px">Mentorada</Heading>
          <Link href='/'><Button colorScheme='telegram' onClick={logout} mr="8px">Sair</Button></Link>
        </Box>
        <Box mt="32px" d="flex" justifyContent="space-evenly">
          <Box>
            {mentees.map((mentee) => {
              return (
                <Box mt="32px" textAlign="center">
                  <Profile mt="32px" profile={mentee}/>
                  <Button mt="16px" onClick={() => setSelectedMentee(mentee)}>Selecionar</Button>
                </Box>
              )
            })}
          </Box>
          <Box>
            {mentors.map((mentor) => {
              return (
                <Box mt="16px" textAlign="center">
                  <Profile mt="32px" profile={mentor}/>
                  <Button mt="16px" onClick={() => setSelectedMentor(mentor)}>Selecionar</Button>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box textAlign="center">
          <Button size="lg" colorScheme="telegram" onClick={connect}>Conectar</Button>
        </Box>
      </>
    )
}

export default Admin