import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Audio } from '../components/Audio'
import { Words } from '../components/Words'
import { useDictionary } from '../hooks/useDictionary';

import style from '../styles/home.module.scss';

interface Props {
  word?: string
}


const Home: NextPage<Props> = () => {
  const { word: wordSelected, handleChangeWord } = useDictionary();
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

      <Words />
    </main>
  )
}

export default Home
