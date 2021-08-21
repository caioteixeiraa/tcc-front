import React from 'react'
import Link from 'next/link'

export const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <Link href='/dashboard'><button>Entrar</button></Link>
            <Link href='/home'><button>Voltar</button></Link>
            <Link href='/register'><button>Cadastre-se</button></Link>
        </div>
    )
}

export default Login