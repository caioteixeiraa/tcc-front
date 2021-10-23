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
    const [mentees, setMentees] = useState([])
    const [mentors, setMentors] = useState([])
    const [selectedMentee, setSelectedMentee] = useState({})
    const [selectedMentor, setSelectedMentor] = useState({})

    const getMentees = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentees/getAllMentees?userId=${localStorage.getItem("userId")}`, {
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
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/getAllMentors?userId=${localStorage.getItem("userId")}`, {
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
      console.log(selectedMentee, selectedMentor)
      const body = {
        emailMentee: selectedMentee.email,
        emailMentor: selectedMentor.email,
      }

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/connections/connect?userId=${localStorage.getItem('userId')}`, body, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
    }

    return (
      <>
        <Box d='flex' backgroundColor="#0088CC" h="60px" justifyContent="space-between" alignItems="center">
          <Heading as="h1" color="#FFFFFF" ml="32px">Mentorada</Heading>
          <Link href='/'><Button colorScheme='telegram' onClick={logout} mr="8px">Sair</Button></Link>
        </Box>
        <Box mt="32px" d="flex" justifyContent="space-evenly">
          <Box>
            <Heading as="h2" size="lg" d="flex" justifyContent="center" alignItems="center" backgroundColor="#0088CC" color="#FFFFFF" height="48px">Mentoradas(os)</Heading>
            {mentees.map((mentee) => {
              return (
                <Box mt="32px" textAlign="center" id={mentee.userId}>
                  <Profile mt="32px" profile={mentee}/>
                  <Button mt="16px" variant='outline' colorScheme="telegram" isActive={selectedMentee.userId === mentee.userId} onClick={() => setSelectedMentee(mentee)}>
                    {selectedMentee.userId === mentee.userId ? 'Selecionado' : 'Selecionar'}
                  </Button>
                </Box>
              )
            })}
          </Box>
          <Box>
            <Heading as="h2" size="lg" d="flex" justifyContent="center" alignItems="center" backgroundColor="#0088CC" color="#FFFFFF" height="48px">Mentoras(es)</Heading>
            {mentors.map((mentor) => {
              return (
                <Box mt="16px" textAlign="center" id={mentor.userId}>
                  <Profile mt="32px" profile={mentor}/>
                  <Button mt="16px" variant='outline' colorScheme="telegram" isActive={selectedMentor.userId === mentor.userId} onClick={() => setSelectedMentor(mentor)}>
                    {selectedMentor.userId === mentor.userId ? 'Selecionado' : 'Selecionar'}
                  </Button>
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