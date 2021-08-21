import React from 'react'
import Link from 'next/link'

export const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href='/home'><button>Sair</button></Link>
        </div>
    )
}

export default Dashboard