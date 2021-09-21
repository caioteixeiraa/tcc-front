import { useState } from 'react'

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value})
  }

  const clearInput = (inputName) => {
    setForm({...form, [inputName]: ""})
  }

  const clearAll = () => {
    for (let input in form) {
      form[input] = ""
    }
  }

  return [form, onChange, clearInput, clearAll]
}

export default useForm