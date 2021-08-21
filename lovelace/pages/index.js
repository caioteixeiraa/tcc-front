import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../assets/design-system/Button'

export default function Home() {
  return (
    <div>
      <h1>Hello lovelace!</h1>
      <Link href='/login'><Button>Fazer login</Button></Link>
      <Link href='/register'><button>Cadastre-se</button></Link>
    </div>
  )
}
