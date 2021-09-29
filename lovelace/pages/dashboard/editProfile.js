import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Button} from '@chakra-ui/button'
import { 
  Heading, 
  Stack,
  Box, 
  Input, 
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, 
  Select,
  Text
} from '@chakra-ui/react'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { useRouter } from 'next/router'
import { states } from '../../helpers/states'
import axios from 'axios'
import { useWindowProperties } from '../../helpers/useWindowProperties'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import link from 'next/link'

export const EditProfile = () => {
  useProtectedPage()
  const router = useRouter()
  const [profile, setProfile] = useState({})
  const [hasProfile, setHasProfile] = useState(false)
  const [userType, setUserType] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [state, setState] = useState("")
  const [age, setAge] = useState("")
  const [marketTime, setMarketTime] = useState("")
  const [company, setCompany] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState("")
  const [interest, setInterest] = useState("")
  const [interests, setInterests] = useState([])
  const { isMobile } = useWindowProperties()
    
    const checkIfHasProfile = async () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/getMentorById?userId=${router.query.userId}`, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        if (res.data.length === 1) {
          setProfile(res.data[0])
          setHasProfile(true)
          setUserType("mentor")
        }
      })
      .catch((err) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentees/getMenteeById?userId=${router.query.userId}`, {
          headers: {
            authorization: localStorage.getItem("token")
          }
        })
        .then((res) => {
          if (res.data[0]) {
            setProfile(res.data[0])
            setHasProfile(true)
            setUserType("mentee")
          } else {
            setHasProfile(false)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
    }
    
    useEffect(() => {
      checkIfHasProfile()
    }, [router])

    useEffect(() => {
      setName(profile.name)
      setEmail(profile.email)
      setAge(profile.age)
      setState(profile.state)
      setCompany(profile.company)
      setMarketTime(profile.marketTime)
      setLinkedin(profile.linkedin)
      setGithub(profile.github)
      setSkills(profile.skills)
      setInterests(profile.interests)
    }, [profile])

    const addInput = (inputName, value) => {
      if (inputName === "skills") {
          setSkills([value, ...skills])
      } else if (inputName === "interests") {
          setInterests([value, ...interests])
      }
      clearInput(inputName)
    }

    const removeInput = (inputName, value) => {
      if (inputName === "skills") {
          const index = skills.indexOf(value)
          const skillsCopy = [...skills]
          skillsCopy.splice(index, 1)
          setSkills(skillsCopy)
      } else if (inputName === "interests") {
          const index = interests.indexOf(value)
          const interestsCopy = [...interests]
          interestsCopy.splice(index, 1)
          setInterests(interestsCopy)
      }
      clearInput(inputName)
    }

    const clearInput = (inputName) => {
      if (inputName === "skills") {
        setSkill("")
      } else {
        setInterest("")
      }
    }

    const edit = (e) => {
      e.preventDefault()
      const body = {}
      body.name = name
      body.email = email
      body.state = state
      body.age = age
      body.linkedin = linkedin
      body.github = github
      body.skills = skills
      body.interests = interests
      if (userType === "mentor") {
        body.marketTime = marketTime
        body.company = company
      }
      
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/${userType}s/update?userId=${router.query.userId}`, body, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log(res)
        router.push({
          pathname: `/dashboard`,
          query: { userId: localStorage.getItem("userId") }
      })
      })
      .catch((err) => {
        console.log(err)
      }) 
    }

    return (
        <Box>
            <Box d='flex' backgroundColor="#0088CC" h="60px" justifyContent="space-between" alignItems="center">
                <Heading as="h1" color="#FFFFFF" ml="32px">Mentorada</Heading>
                <Link href='/'><Button colorScheme='telegram' onClick={() => router.back()} mr="8px">Voltar</Button></Link>
            </Box>
            <Heading as="h2" size="lg" textAlign="center" m="32px 16px">Edição de perfil</Heading>
            {userType !== "" &&
                <form onSubmit={edit}>
                    <Stack spacing={4} mt="32px" mx={isMobile ? '16px' : 'auto'} maxW="380px" d="flex">  
                      <FormControl isRequired={true}>
                        <FormLabel>Nome completo</FormLabel>
                          <Input 
                            name={"name"}
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder={"Nome completo"}
                            type="text"
                          />
                      </FormControl>
                      <FormControl isRequired={true}>
                        <FormLabel>E-mail para conexão</FormLabel>
                          <Input 
                            name={"email"}
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder={"E-mail para conexão"}
                            type="text"
                          />
                      </FormControl>
                      <FormControl isRequired={true}>
                        <FormLabel>Estado (UF)</FormLabel>
                        <Select value={state} name={"state"} onChange={(e) => setState(e.target.value)} placeholder={"Estado"}>
                          {states.map((state) => <option value={state} key={state}>{state}</option>)}
                        </Select>
                      </FormControl>
                      <FormControl isRequired={true}>
                        <FormLabel>Idade</FormLabel>
                          <Input 
                            name={"age"}
                            value={age} 
                            onChange={(e) => setAge(e.target.value)} 
                            placeholder={"Idade"}
                            type="text"
                          />
                      </FormControl>
                      {userType === "mentor" && 
                        <FormControl isRequired={true}>
                          <FormLabel>Tempo de mercado</FormLabel>
                            <Input 
                              name={"marketTime"}
                              value={marketTime} 
                              onChange={(e) => setMarketTime(e.target.value)} 
                              placeholder={"Tempo de mercado"}
                              type="text"
                            />
                        </FormControl>
                      }
                      {userType === "mentor" && 
                        <FormControl isRequired={false}>
                          <FormLabel>Empresa atual</FormLabel>
                            <Input 
                              name={"company"}
                              value={company} 
                              onChange={(e) => setCompany(e.target.value)} 
                              placeholder={"Empresa atual"}
                              type="text"
                            />
                        </FormControl>
                      }
                      <FormControl isRequired={true}>
                        <FormLabel>LinkedIn</FormLabel>
                          <Input 
                            name={"linkedin"}
                            value={linkedin} 
                            onChange={(e) => setLinkedin(e.target.value)} 
                            placeholder={"Link para o Linkedin"}
                            type="text"
                          />
                      </FormControl>
                      <FormControl isRequired={true}>
                        <FormLabel>Github</FormLabel>
                          <Input 
                            name={"github"}
                            value={github} 
                            onChange={(e) => setGithub(e.target.value)} 
                            placeholder={"Link para o Github"}
                            type="text"
                          />
                      </FormControl>
                      <FormControl isRequired={false}>
                        <FormLabel>Competências</FormLabel>
                        <Box d="flex" alignItems="center">
                            <Input 
                              name={"skills"}
                              value={skill} 
                              onChange={(e) => setSkill(e.target.value)} 
                              placeholder={"Ex: React, Node, Python"}
                              type={"text"}
                            />
                            <Button ml="8px" colorScheme="telegram" onClick={() => addInput("skills", skill)}>
                                <AddIcon w={4} h={4} />
                            </Button>
                        </Box>
                        <Box mt="4px">
                          {skills.map((value) => {
                              return (
                                  <Box key={value} d="flex" alignItems="center" >
                                      <Input
                                          mt="4px"
                                          value={value}
                                          isReadOnly
                                      />
                                      <Button ml="8px" variant="outlined" colorScheme="telegram" onClick={() => removeInput("skills", value)}>
                                          <DeleteIcon w={4} h={4} />
                                      </Button>
                                    </Box>
                              )
                          })}
                        </Box>
                      </FormControl>

                      <FormControl isRequired={false}>
                        <FormLabel>Interesses</FormLabel>
                        <Box d="flex" alignItems="center">
                            <Input 
                              name={"skills"}
                              value={interest} 
                              onChange={(e) => setInterest(e.target.value)} 
                              placeholder={"Ex: React, Node, Python"}
                              type={"text"}
                            />
                            <Button ml="8px" colorScheme="telegram" onClick={() => addInput("interests", interest)}>
                                <AddIcon w={4} h={4} />
                            </Button>
                        </Box>
                        <Box mt="4px">
                          {interests.map((value) => {
                              return (
                                  <Box key={value} d="flex" alignItems="center" >
                                      <Input
                                          mt="4px"
                                          value={value}
                                          isReadOnly
                                      />
                                      <Button ml="8px" variant="outlined" colorScheme="telegram" onClick={() => removeInput("interests", value)}>
                                          <DeleteIcon w={4} h={4} />
                                      </Button>
                                    </Box>
                              )
                          })}
                        </Box>
                      </FormControl>
                      <Button isFullWidth type="submit" colorScheme="telegram" mt="32px" mb="40px">Finalizar edição</Button>
                      <Box></Box>
                    </Stack>
                </form>
            }
        </Box>
    )
}

export default EditProfile