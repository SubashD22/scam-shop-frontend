import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import Head from 'next/head';

const MainLayout = ({ children }) => {
    return (
        <div className='latout'>
            <Head>
                <title>Scam Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout