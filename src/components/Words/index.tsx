import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import style from './styles.module.scss';

export function Words() {
  const [words, setWords] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getData(){
      const {data} = await api.get<string[]>(`/words?_page=${currentPage}&_limit=20`);

      setWords((prev) => [...prev, ...data]);
    }

    getData();
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

  return (
    <div className={style.container}>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <button>
              {word}
            </button>
          </li>
        ))}
        <li id="sentinel"></li>
      </ul>
    </div>
  )
}