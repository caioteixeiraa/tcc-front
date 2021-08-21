import React from 'react'
import Link from 'next/link'

export const Register = () => {
    return (
        <div>
            <h1>Cadastro</h1>
            <Link href='/dashboard'><button>Cadastrar</button></Link>
            <Link href='/home'><button>Voltar</button></Link>
        </div>
    )
}

export default Register