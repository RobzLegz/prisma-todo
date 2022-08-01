import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Prisma todo app</title>
        <meta name="description" content="Full stack prisma & next js app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-4xl'>setup</h1>
    </div>
  )
}

export default Home
