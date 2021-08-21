import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Lovelace</title>
        <meta name="description" content="Connecting people and opportunities" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello lovelace!</h1>
      <Link href='/login'><button>Fazer login</button></Link>
      <Link href='/register'><button>Cadastre-se</button></Link>
    </div>
  )
}
