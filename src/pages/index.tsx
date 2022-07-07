import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Audio } from '../components/Audio'
import { Tabs } from '../components/Tabs';
import { Words } from '../components/Words'
import { useDictionary } from '../hooks/useDictionary';

import style from '../styles/home.module.scss';

interface Props {
  word?: string
}


const Home: NextPage<Props> = () => {
  const { handleChangeWord } = useDictionary();
  const router = useRouter();
  const { word } = router.query;

  useEffect(() => {
    if(word !== undefined){
      handleChangeWord(word as string);
    }
  }, [word])

  return (
    <main className={style.main}>
      <Audio />

      <div>
        <Tabs />
        <Words />
      </div>
    </main>
  )
}

export default Home
