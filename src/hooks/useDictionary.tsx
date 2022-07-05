import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
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
  word: WordInterface;
  handleChangeWord: (word: string) => void;
  indexWord: number;
  changeWordIndex: (index: number) => void;
  handleNextWord: () => void;
  handlePreviousWord: () => void;
}

const DictionaryContext = createContext<DictionaryContextInterface>({} as DictionaryContextInterface);

export function DictionaryProvider({ children }: DictionaryProviderProps) {
  const [words, setWords] = useState<string[]>([]);
  const [word, setWord] = useState({} as WordInterface);
  const [indexWord, setIndexWord] = useState(0);

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
    .finally(() => setIndexWord(words.indexOf(newWord)));
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

  return (
    <DictionaryContext.Provider value={{
      words,
      setWords,
      word,
      handleChangeWord,
      indexWord,
      changeWordIndex,
      handleNextWord,
      handlePreviousWord,
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