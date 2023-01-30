import Head from 'next/head'
import AuthForm from "../auth";

export default function Home() {

  return (
    <>
      <Head>
        <title>Trading BOT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
          <AuthForm/>
      </main>
    </>
  )
}