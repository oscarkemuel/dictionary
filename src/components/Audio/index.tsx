import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDictionary } from "../../hooks/useDictionary";
import { Player } from "../Player";

import style from "./style.module.scss";

export function Audio() {
  const {
    word,
    indexWord,
    handleNextWord,
    handlePreviousWord,
    openTabName,
    wordFavorites,
    handleToggleFavoriteWord,
  } = useDictionary();

  return (
    <div className={style.container}>
      <div className={style.display}>
        <div></div>
        <p>{word.word ? word.word : "Select a word!"}</p>
        <span>{word.phonetic?.text}</span>
      </div>

      <Player />

      {word.word && (
        <>
          <div className={style.meanings}>
            <div className={style.headerMeanings}>
              <h2>Meanings</h2>
              <button type="button" onClick={() => handleToggleFavoriteWord(word.word)}>
                {wordFavorites.includes(word.word) ? (
                  <MdFavorite color="var(--red)" />
                ) : (
                  <MdFavoriteBorder color="var(--white)" />
                )}
              </button>
            </div>

            <ul>
              {word.meanings?.map((meaning) => {
                return (
                  <li key={meaning.partOfSpeech}>
                    <p>
                      <b>{meaning.partOfSpeech}</b>
                    </p>

                    <ul>
                      {meaning.definitions.map((definition, index) => (
                        <li key={`${definition.definition}#${index}`}>
                          {"- " + definition.definition}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>

          {indexWord !== -1 && openTabName === "words" && (
            <div className={style.buttons}>
              <button type="button" onClick={() => handlePreviousWord()}>
                Voltar
              </button>
              <button type="button" onClick={handleNextWord}>
                Próximo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
