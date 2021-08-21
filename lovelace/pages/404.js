import React from 'react'
import Link from 'next/link'

export const ErrorPage = () => {
    return (
        <>
            <h1>Página não encontrada, retornar para a home</h1>
            <Link href='/'><a>Voltar para a home</a></Link>
        </>
    )
}

export default ErrorPage