import Head from 'next/head'
import Link from 'next/link'
import GeoLocation from '../components/GeoLocation'


export default function Home() {
  return (
    <div className='max-w-xl mx-auto mt-10 flex items-center justify-center'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl">STAFF FACE RECOGNITION</h1>
        <Link href='/admin' ><a className='text-sm hover:cursor-pointer hover:text-green-500 font-bold'>ENTER ADMIN PANEL</a></Link>
        <GeoLocation/>
      </main>
    </div>
  )
}
