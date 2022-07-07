import { fireEvent, render, screen } from "@testing-library/react";
import { Audio } from "../../components/Audio";
import { DictionaryContext } from "../../hooks/useDictionary";

const wordFavorites: string[] = [];

describe("Audio component", () => {
  it("renders display correctly with word", () => {
    const word = {
      word: "computer",
    };

    render(
      <DictionaryContext.Provider value={{ word, wordFavorites } as any}>
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(screen.getByText("Meanings")).toBeInTheDocument();
  });

  it("renders display correctly with word and phonetic", () => {
    const word = {
      word: "console",
      phonetic: {
        text: "/ˈkɒn.səʊl/",
      },
    };

    render(
      <DictionaryContext.Provider value={{ word, wordFavorites } as any}>
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("console")).toBeInTheDocument();
    expect(screen.getByText("/ˈkɒn.səʊl/")).toBeInTheDocument();
    expect(screen.getByText("Meanings")).toBeInTheDocument();
  });

  it("renders display correctly without word", () => {
    const word = {};

    render(
      <DictionaryContext.Provider value={{ word } as any}>
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("Select a word!")).toBeInTheDocument();
  });

  it("component handles favorite button click", () => {
    const word = {
      word: "computer",
    };
    const handleToggleFavoriteWord = jest.fn();

    const { container } = render(
      <DictionaryContext.Provider value={{ word, handleToggleFavoriteWord, wordFavorites } as any}>
        <Audio />
      </DictionaryContext.Provider>
    );

    fireEvent.click(container.querySelector('svg')!);
    expect(handleToggleFavoriteWord).toHaveBeenCalledWith("computer");
  });

  it("renders correctly with word and favorite word selected", () => {
    const word = {
      word: "computer",
    };

    const wordFavorites: string[] = ["computer"];

    const { container } = render(
      <DictionaryContext.Provider value={{ word, wordFavorites } as any}>
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(container.querySelector('[color="var(--red)"]')).toBeInTheDocument();
  });

  it("renders correctly the meanings", () => {
    const word = {
      word: "console",
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition: "A cabinet that controls, instruments, and displays are mounted upon.",
            },
          ]
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: "A storage tray or container mounted between the seats of an automobile.",
            },
          ]
        },
      ],
    };

    render(
      <DictionaryContext.Provider value={{ word, wordFavorites } as any}
      >
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("noun")).toBeInTheDocument();
    expect(screen.getByText("verb")).toBeInTheDocument();
    expect(screen.getByText("- A cabinet that controls, instruments, and displays are mounted upon.")).toBeInTheDocument();
    expect(screen.getByText("- A storage tray or container mounted between the seats of an automobile.")).toBeInTheDocument();
  })

  it('renders correctly back and next buttons', () => {
    const word = {
      word: 'computer',
    }

    const indexWord = 0;
    const openTabName = 'words';

    render(
      <DictionaryContext.Provider value={
        { word, wordFavorites, indexWord, openTabName } as any
      }>
        <Audio />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  })

  it('component handles back button click', () => {
    const word = {
      word: 'computer',
    }
    const indexWord = 1;
    const openTabName = 'words';
    const handlePreviousWord = jest.fn();

    render(
      <DictionaryContext.Provider value={
        { word, wordFavorites, indexWord, openTabName, handlePreviousWord } as any
      }>
        <Audio />
      </DictionaryContext.Provider>
    );

    fireEvent.click(screen.getByText('Back'));
    expect(handlePreviousWord).toHaveBeenCalled();
  })

  it('component handles next button click', () => {
    const word = {
      word: 'computer',
    }
    const indexWord = 1;
    const openTabName = 'words';
    const handleNextWord = jest.fn();

    render(
      <DictionaryContext.Provider value={
        { word, wordFavorites, indexWord, openTabName, handleNextWord } as any
      }>
        <Audio />
      </DictionaryContext.Provider>
    );

    fireEvent.click(screen.getByText('Next'));
    expect(handleNextWord).toHaveBeenCalled();
  })
});
