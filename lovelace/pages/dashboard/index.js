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

export const Dashboard = () => {
    // useProtectedPage()
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])
    const [userType, setUserType] = useState("")

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
            placeholder: "Linkedin",
            type: "text",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Github",
            name: "github",
            placeholder: "Github",
            type: "text",
            required: true,
            inputType: "text",
            users: ["mentee", "mentor"]
        },
        {   
            label: "Competências",
            name: "skills",
            placeholder: "Competências",
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
            placeholder: "Interesses",
            type: "text",
            required: false,
            inputType: "multiple",
            values: interests,
            helperText: "Não se preocupe com a ordem ;)",
            users: ["mentee", "mentor"]
        },
    ]

    const initialForm = {}
    useEffect(() => {
        defaultForm.forEach((input) => {
            initialForm[input.name] = ""
        })
    }, [])

    
    const [form, onChange, clearInput, clearAll] = useForm(initialForm)

    const logout = () => {
        localStorage.removeItem('token')
    }

    const submit = (event) => {
        event.preventDefault()
        const body = {
            ...form,
            skills: skills,
            interests: interests
        }
        console.log(body)
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
            <Box d='flex'>
                <Heading>Dashboard</Heading>
                <Link href='/'><Button colorScheme='telegram' onClick={logout}>Sair</Button></Link>
            </Box>
            <Text>Crie o seu perfil para se conectar!</Text>
            <Link href='/dashboard/createProfile'><Button colorScheme="telegram">Criar perfil</Button></Link>
        </Box>
    )
}

export default Dashboard