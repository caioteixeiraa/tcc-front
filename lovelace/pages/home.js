import Link from 'next/link'
import React from 'react'

export const Home = () => {
  return (
    <div>
        <h1>Home!</h1>
        <Link href='/login'><button>Fazer login</button></Link>
        <Link href='/register'><button>Cadastre-se</button></Link>
    </div>
  )
}

export default Home