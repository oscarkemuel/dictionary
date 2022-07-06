import { useEffect, useState } from 'react';
import { useDictionary } from '../../hooks/useDictionary';
import { api } from '../../services/api';
import style from './styles.module.scss';

export function Words() {
  const { handleChangeWord, words, setWords, wordHistory, wordFavorites, openTabName } = useDictionary();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function getData(){
      const {data} = await api.get<string[]>(`/words?_page=${currentPage}&_limit=100`);
  
      setWords((prev) => [...prev, ...data]);
    }

    if(currentPage !== 0 && openTabName === 'words'){
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

  function getWordsToShow() {
    if(openTabName === 'words'){
      return words;
    } else if(openTabName === 'history'){
      return wordHistory;
    } else {
      return wordFavorites;
    }
  }

  const wordsToShow = getWordsToShow();

  return (
    <div className={style.container}>
      <ul>
        {wordsToShow.map((word, index) => (
          <li key={index}>
            <button type='button' onClick={() => handleChangeWord(word)}>
              {word}
            </button>
          </li>
        ))}
        <li id="sentinel"></li>
      </ul>
    </div>
  )
}