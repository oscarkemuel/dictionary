import { Player } from '../Player';
import style from './style.module.scss';

export function Audio() {
  return (
    <div className={style.container}>
      <div className={style.display}>
        <div></div>
        <p>hello</p>
        <span>teste</span>
      </div>

      <Player />

      <div className={style.meanings}>
        <h2>Meanings</h2>
        
        <ul>
          <li>
            <p>Verb: {'"Hello"'} or an equivalent greeting</p>
          </li>
          <li>
            <p>Verb: {'"Hello"'} or an equivalent greeting</p>
          </li>
        </ul>
      </div>

      <div className={style.buttons}>
        <button type='button'>Voltar</button>
        <button type='button'>Próximo</button>
      </div>
    </div>
  )
}