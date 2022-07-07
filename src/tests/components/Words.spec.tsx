import { fireEvent, render, screen } from "@testing-library/react";
import { Words } from "../../components/Words";
import { DictionaryContext } from "../../hooks/useDictionary";

describe("Words component", () => {
  it("renders correctly word list with tab word", () => {
    const words = ["computer", "console"];

    const openTabName = "words";

    render(
      <DictionaryContext.Provider
        value={{ words, openTabName } as any}
      >
        <div>
          <Words />
        </div>
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(screen.getByText("console")).toBeInTheDocument();
  });

  it("renders correctly word list with tab history", () => {
    const wordHistory = ["computer", "console"];

    const openTabName = "history";

    render(
      <DictionaryContext.Provider
        value={{ wordHistory, openTabName } as any}
      >
        <div>
          <Words />
        </div>
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(screen.getByText("console")).toBeInTheDocument();
  });

  it("renders correctly word list with tab favorites", () => {
    const wordFavorites = ["computer", "console"];

    const openTabName = "favorites";

    render(
      <DictionaryContext.Provider
        value={{ wordFavorites, openTabName } as any}
      >
        <div>
          <Words />
        </div>
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("computer")).toBeInTheDocument();
    expect(screen.getByText("console")).toBeInTheDocument();
  });

  it("component handles word button click", () => {
    const words = ["oscar"];
    const openTabName = "words";
    const handleChangeWord = jest.fn();

    render(
      <DictionaryContext.Provider
        value={{ words, openTabName, handleChangeWord } as any}
      >
        <Words />
      </DictionaryContext.Provider>
    );

    fireEvent.click(screen.getByText("oscar"));
    expect(handleChangeWord).toHaveBeenCalledWith("oscar");
  })
});
