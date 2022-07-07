import { useRouter } from 'next/router';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { apiDictionary } from '../services/api';

interface DictionaryProviderProps {
  children: React.ReactNode;
}

type PhoneticInterface = {
  text: string;
  audio?: string;
}

type MeaningInterface = {
  partOfSpeech: string;
  definitions: {
    definition: string;
  }[];
}

interface WordInterface {
  word: string;
  phonetic?: PhoneticInterface;
  meanings?: MeaningInterface[];
}

interface DictionaryContextInterface {
  words: string[];
  setWords: Dispatch<SetStateAction<string[]>>;
  wordHistory: string[];
  wordFavorites: string[];
  word: WordInterface;
  indexWord: number;
  changeWordIndex: (index: number) => void;
  handleChangeWord: (word: string) => void;
  handleNextWord: () => void;
  handlePreviousWord: () => void;
  handleToggleFavoriteWord: (word: string) => void;
  handleTab: (tabName: 'words' | 'history' | 'favorites') => void;
  openTabName: 'words' | 'history' | 'favorites';
}

export const DictionaryContext = createContext<DictionaryContextInterface>({} as DictionaryContextInterface);

export function DictionaryProvider({ children }: DictionaryProviderProps) {
  const [words, setWords] = useState<string[]>([]);
  const [wordHistory, setWordHistory] = useState<string[]>([])
  const [wordFavorites, setWordFavorites] = useState<string[]>([])

  const [word, setWord] = useState({} as WordInterface);
  const [indexWord, setIndexWord] = useState(0);
  const [openTabName, setOpenTabName] = useState<'words' | 'history' | 'favorites'>('words');

  const router = useRouter();

  useEffect(() => {
    const storegedHistory = localStorage.getItem('@Dictionary/history');
    const storegedFavorites = localStorage.getItem('@Dictionary/favorites');

    if(storegedHistory) {
      setWordHistory(JSON.parse(storegedHistory));
    }

    if(storegedFavorites) {
      setWordFavorites(JSON.parse(storegedFavorites));
    }
  }, []);

  function addWordToHistory(newWord: string) {
    if(!wordHistory.includes(newWord)){
      const newHistory = [newWord, ...wordHistory]

      setWordHistory(newHistory);
      if(typeof window !== 'undefined'){
        localStorage.setItem('@Dictionary/history', JSON.stringify(newHistory));
      }
    }
  }

  function handleToggleFavoriteWord(newWord: string) {
    let newFavorites;

    if(!wordFavorites.includes(newWord)){
      newFavorites = [newWord, ...wordFavorites];
    }else {
      newFavorites = wordFavorites.filter(word => word !== newWord);
    }

    setWordFavorites(newFavorites);
    if(typeof window !== 'undefined'){
      localStorage.setItem('@Dictionary/favorites', JSON.stringify(newFavorites));
    }
  }

  function handleChangeWord(newWord: string){
    apiDictionary.get(newWord)
    .then(res => {
      const data = res.data[0];

      const newData: WordInterface = {
        word: data.word,
        meanings: data.meanings,
      }

      if(data.phonetics.lenght > 1){
        const phoneticsWithAudio = data.phonetics.filter((phonetic: PhoneticInterface) => phonetic.audio !== '');
        if(phoneticsWithAudio.length > 0){
          newData.phonetic = phoneticsWithAudio[0];
        }
      }else {
        newData.phonetic = data.phonetics[0];
      }

      setWord(newData);
    })
    .catch(err => {
      if(err.response.status === 404){
        setWord({word: `"${newWord}" not found`});
      }
    })
    .finally(() => {
      addWordToHistory(newWord);
      setIndexWord(words.indexOf(newWord));
      router.replace({
        query: {
          word: newWord,
        }
      })
    });
  }

  function changeWordIndex(index: number){
    setIndexWord(index);
  }

  function handleNextWord(){
    handleChangeWord(words[indexWord + 1]);
    changeWordIndex(indexWord + 1);
  }

  function handlePreviousWord(){
    handleChangeWord(words[indexWord - 1]);
    changeWordIndex(indexWord - 1);
  }

  function handleTab(tabName: 'words' | 'history' | 'favorites'){
    setOpenTabName(tabName);
  }

  return (
    <DictionaryContext.Provider value={{
      words,
      setWords,
      wordHistory,
      wordFavorites,
      word,
      openTabName,
      indexWord,
      changeWordIndex,
      handleChangeWord,
      handleNextWord,
      handlePreviousWord,
      handleTab,
      handleToggleFavoriteWord
    }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if(!context){
    throw new Error('useDictionary must be used within a DictionaryProvider');
}

  return context;
}