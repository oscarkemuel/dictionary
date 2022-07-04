import dynamic from 'next/dynamic';
import styled from './style.module.scss'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function Player(){
  return (
    <div className={styled.container}>
      <ReactPlayer 
        width={'100%'}
        height={'50px'}
        controls
        url='https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3' 
      />
    </div>
  )
}