import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, ButtonGroup } from '@chakra-ui/button'
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
import useForm from '../../hooks/useForm'
import { states } from '../../helpers/states'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import axios from 'axios'
import router from 'next/router'
import { useWindowProperties } from '../../helpers/useWindowProperties'

export const CreateProfile = () => {
    useProtectedPage()
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])
    const [userType, setUserType] = useState("")
    const { isMobile } = useWindowProperties()

    const defaultForm = [
        {   
            label: "Nome completo",
            name: "name",
            placeholder: "Nome completo",
            type: "text",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "E-mail para conexão",
            name: "email",
            placeholder: "E-mail",
            type: "email",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Estado (UF)",
            name: "state",
            placeholder: "Estado",
            type: "text",
            required: true,
            inputType: "select",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Idade",
            name: "age",
            placeholder: "Idade",
            type: "number",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {
            label: "Tempo de mercado",
            name: "marketTime",
            placeholder: "Tempo de mercado",
            type: "text",
            required: true,
            users: ["mentor"],
            inputType: "text"
        },
        {
            label: "Empresa atual",
            name: "company",
            placeholder: "Empresa atual",
            type: "text",
            required: false,
            users: ["mentor"],
            inputType: "text",
            helperText: "Se não houver, pode deixar em branco"
        },
        {   
            label: "LinkedIn",
            name: "linkedin",
            placeholder: "Link para o seu Linkedin",
            type: "text",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Github",
            name: "github",
            placeholder: "Link para o seu Github",
            type: "text",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Competências",
            name: "skills",
            placeholder: "Ex: React, Node, Python",
            type: "text",
            required: false,
            inputType: "multiple",
            values: skills,
            helperText: "Não se preocupe com a ordem ;)",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Interesses",
            name: "interests",
            placeholder: "Ex: React, Node, Python",
            type: "text",
            required: false,
            inputType: "multiple",
            values: interests,
            helperText: "Aqui você coloca o que deseja desenvolver na sua carreira",
            users: ["mentee", "mentor"]
        },
    ]

    const initialForm = {}
    useEffect(() => {
        defaultForm.forEach((input) => {
            if (input.users.includes(userType)) {
                initialForm[input.name] = ""
            }
        })
        console.log(initialForm)
    }, [userType])

    
    const [form, onChange, clearInput, clearAll] = useForm(initialForm)

    const logout = () => {
        localStorage.removeItem('token')
    }

    const submit = (event) => {
        event.preventDefault()
        window.localStorage.setItem("userType", userType)
        const body = {
            ...form,
            skills: skills,
            interests: interests,
            userId: window.localStorage.getItem("userId")
        }
        console.log(body)

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${userType}s/create`, body, {
            headers: {
                Authorization: window.localStorage.getItem("token")
            }
        })
        .then((res) => {
            console.log(res)
            clearAll()
            router.push({
                pathname: `/dashboard`,
                query: { userId: localStorage.getItem("userId") }
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

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

    const selectUserType = (userType) => {
        setUserType(userType)
    }

    return (
        <Box>
            <Box d='flex' backgroundColor="#0088CC" h="60px" justifyContent="space-between" alignItems="center">
                <Heading as="h1" color="#FFFFFF" ml="32px" >Mentorada</Heading>
                <Button colorScheme='telegram' onClick={() => router.back()} mr="8px">Voltar</Button>
            </Box>

            <Heading as="h2" size="lg" mt="32px" mx={isMobile ? '32px' : 'auto'} textAlign="center">Quer ser mentorado(a) ou quer mentorar alguém? 🤔</Heading>
            
            <ButtonGroup mt="32px" mx="8px" d="flex" justifyContent="center" flexWrap="wrap">
                <Button variant="outline" mb="8px" onClick={() => selectUserType("mentee")} isActive={userType !== "mentor" && userType !== ""} colorScheme="telegram">Quero ser mentorada(o)</Button>
                <Button variant="outline" onClick={() => selectUserType("mentor")} isActive={userType !== "mentee" && userType !== ""} colorScheme="telegram">Quero mentorar</Button>
            </ButtonGroup>

            {userType !== "" &&
                <form onSubmit={submit}>
                    <Stack spacing={4} mt="32px" mx={isMobile ? '16px' : 'auto'} maxW="380px" d="flex">
                        {defaultForm.map((input) => {
                            switch(input.inputType) {
                                case "text":
                                    if (input.users.includes(userType)) {
                                        return (
                                            <FormControl key={input.name} isRequired={input.required}>
                                                <FormLabel>{input.label}</FormLabel>
                                                <Input 
                                                    name={input.name}
                                                    value={form[input.name]} 
                                                    onChange={onChange} 
                                                    placeholder={input.placeholder}
                                                    type={input.type}
                                                />
                                                {input.helperText && <FormHelperText>{input.helperText}</FormHelperText>}
                                            </FormControl>
                                        )
                                    }
                                case "select":
                                    if (input.users.includes(userType)) {
                                        return (
                                            <FormControl key={input.name} isRequired={input.required}>
                                                <FormLabel>{input.label}</FormLabel>
                                                <Select name={input.name} onChange={onChange} placeholder={input.placeholder}>
                                                    {states.map((state) => <option value={state} key={state}>{state}</option>)}
                                                </Select>
                                                {input.helperText && <FormHelperText>{input.helperText}</FormHelperText>}
                                            </FormControl>
                                        )
                                    }
                                case "multiple":
                                    if (input.users.includes(userType)) {
                                        return (
                                            <FormControl key={input.name} isRequired={input.required}>
                                                <FormLabel>{input.label}</FormLabel>
                                                <Box d="flex" alignItems="center">
                                                    <Input 
                                                        name={input.name}
                                                        value={form[input.name]} 
                                                        onChange={onChange} 
                                                        placeholder={input.placeholder}
                                                        type={input.type}
                                                    />
                                                    <Button ml="8px" colorScheme="telegram" onClick={() => addInput(input.name, form[input.name])}>
                                                        <AddIcon w={4} h={4} />
                                                    </Button>
                                                </Box>
                                                {input.helperText && <FormHelperText>{input.helperText}</FormHelperText>}
                                                <Box mt="4px">
                                                    {input.values.map((value) => {
                                                        return (
                                                            <Box key={value} d="flex" alignItems="center" >
                                                                <Input
                                                                    mt="4px"
                                                                    value={value}
                                                                    isReadOnly
                                                                />
                                                                <Button ml="8px" variant="outlined" colorScheme="telegram" onClick={() => removeInput(input.name, value)}>
                                                                    <DeleteIcon w={4} h={4} />
                                                                </Button>
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            </FormControl>
                                        )
                                    }
                            }
                        })}
                    <Button isFullWidth type="submit" colorScheme="telegram" mb="32px">Criar perfil</Button>
                    </Stack>
                </form>
            }
        </Box>
    )
}

export default CreateProfile