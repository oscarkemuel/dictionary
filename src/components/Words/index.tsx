import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDictionary } from '../../hooks/useDictionary';
import { api } from '../../services/api';
import style from './styles.module.scss';

export function Words() {
  const { handleChangeWord, words, setWords } = useDictionary();
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function getData(){
      const {data} = await api.get<string[]>(`/words?_page=${currentPage}&_limit=100`);
  
      setWords((prev) => [...prev, ...data]);
    }

    if(currentPage !== 0){
      getData()
    }
  }, [currentPage])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinel')!);
    return () => intersectionObserver.disconnect();
  }, []);

  function handlePressWord(word: string){
    handleChangeWord(word)

    router.replace({
      query: {
        word
      }
    })
  }

  return (
    <div className={style.container}>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <button type='button' onClick={() => handlePressWord(word)}>
              {word}
            </button>
          </li>
        ))}
        <li id="sentinel"></li>
      </ul>
    </div>
  )
}