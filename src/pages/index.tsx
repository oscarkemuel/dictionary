import type { GetStaticProps, NextPage } from 'next'
import { Audio } from '../components/Audio'
import { Words } from '../components/Words'

import style from '../styles/home.module.scss';


const Home: NextPage = () => {
  return (
    <main className={style.main}>
      <Audio />

      <Words />
    </main>
  )
}

export default Home
