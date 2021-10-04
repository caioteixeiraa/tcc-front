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

    const getMentees = () => {
      axios.get(`https://abramov.herokuapp.com/mentees/getAllMentees`, {
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
      axios.get(`https://abramov.herokuapp.com/mentors/getAllMentors`, {
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

    return (
        <Box>Admin</Box>
    )
}

export default Admin