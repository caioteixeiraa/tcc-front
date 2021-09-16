import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
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
import { useProtectedPage } from '../hooks/useProtectedPage'
import useForm from '../hooks/useForm'
import { states } from '../helpers/states'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

export const Dashboard = () => {
    useProtectedPage()
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])

    const menteeForm = [
        {   
            label: "Nome completo",
            name: "name",
            placeholder: "Nome completo",
            type: "text",
            required: true,
            inputType: "text"
        },
        {   
            label: "E-mail para conexão",
            name: "email",
            placeholder: "E-mail",
            type: "email",
            required: true,
            inputType: "text"
        },
        {   
            label: "Estado (UF)",
            name: "state",
            placeholder: "Estado",
            type: "text",
            required: true,
            inputType: "select"
        },
        {   
            label: "Idade",
            name: "age",
            placeholder: "Idade",
            type: "number",
            required: true,
            inputType: "text"
        },
        {   
            label: "LinkedIn",
            name: "linkedin",
            placeholder: "Linkedin",
            type: "text",
            required: true,
            inputType: "text"
        },
        {   
            label: "Github",
            name: "github",
            placeholder: "Github",
            type: "text",
            required: true,
            inputType: "text"
        },
        {   
            label: "Competências",
            name: "skills",
            placeholder: "Competências",
            type: "text",
            required: false,
            inputType: "multiple",
            values: skills,
            helperText: "Não se preocupe com a ordem ;)"
        },
        {   
            label: "Interesses",
            name: "interests",
            placeholder: "Interesses",
            type: "text",
            required: false,
            inputType: "multiple",
            values: interests,
            helperText: "Não se preocupe com a ordem ;)"
        },
    ]

    const initialForm = {}
    useEffect(() => {
        menteeForm.forEach((input) => {
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

    return (
        <Box>
            <Box d='flex'>
                <Heading>Dashboard</Heading>
                <Link href='/'><Button colorScheme='telegram' onClick={logout}>Sair</Button></Link>
            </Box>
            <form onSubmit={submit}>
                <Stack spacing={4}>
                    {menteeForm.map((input) => {
                        switch(input.inputType) {
                            case "text":
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
                            case "select":
                                return (
                                    <FormControl key={input.name} isRequired={input.required}>
                                        <FormLabel>{input.label}</FormLabel>
                                        <Select name={input.name} onChange={onChange} placeholder={input.placeholder}>
                                            {states.map((state) => <option value={state} key={state}>{state}</option>)}
                                        </Select>
                                        {input.helperText && <FormHelperText>{input.helperText}</FormHelperText>}
                                    </FormControl>
                                )
                            case "multiple":
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
                    })}
                </Stack>
                <Button type="submit" colorScheme="telegram">Criar</Button>
            </form>
        </Box>
    )
}

export default Dashboard