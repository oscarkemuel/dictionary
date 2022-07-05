import dynamic from 'next/dynamic';
import { useDictionary } from '../../hooks/useDictionary';
import styled from './style.module.scss'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function Player(){
  const {word} = useDictionary();

  return (
    <div className={styled.container}>
      {word.phonetic?.audio ? (
        <ReactPlayer 
        width={'100%'}
        height={'50px'}
        controls
        url={word.phonetic.audio}
      />
      ) : (
        word.word ? <p>AUDIO NOT FOUND</p> : ''
      )}
      
    </div>
  )
}