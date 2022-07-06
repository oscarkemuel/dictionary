import { useDictionary } from "../../hooks/useDictionary";
import style from "./style.module.scss";

export function Tabs() {
  const { handleTab, openTabName } = useDictionary();

  return (
    <div className={style.container}>
      <button
        type="button"
        onClick={() => handleTab("words")}
        className={openTabName === "words" ? style.active : ""}
      >
        Words
      </button>

      <button 
        type="button" 
        onClick={() => handleTab("history")}
        className={openTabName === "history" ? style.active : ""}
      >
        History
      </button>

      <button
        type="button"
        onClick={() => handleTab("favorites")}
        className={openTabName === "favorites" ? style.active : ""}
      >
        Favorites
      </button>
    </div>
  );
}
