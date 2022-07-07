import { fireEvent, render, screen } from "@testing-library/react";
import { Tabs } from "../../components/Tabs";
import { DictionaryContext } from "../../hooks/useDictionary";

describe("Tabs component", () => {
  it("renders correctly", () => {
    render(<Tabs />);

    expect(screen.getByText("Words")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  it("component handles button click", () => {
    const handleTab = jest.fn();
    render(
      <DictionaryContext.Provider value={{ handleTab } as any}>
        <Tabs />
      </DictionaryContext.Provider>
    );

    fireEvent.click(screen.getByText("Words"));
    expect(handleTab).toHaveBeenCalledWith("words");
  });

  it("renders correctly with active tab Words", () => {
    const openTabName = "words";

    render(
      <DictionaryContext.Provider value={{ openTabName } as any}>
        <Tabs />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("Words")).toHaveClass("active");
  });

  it("renders correctly with active tab History", () => {
    const openTabName = "history";

    render(
      <DictionaryContext.Provider value={{ openTabName } as any}>
        <Tabs />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("History")).toHaveClass("active");
  });

  it("renders correctly with active tab Favorites", () => {
    const openTabName = "favorites";

    render(
      <DictionaryContext.Provider value={{ openTabName } as any}>
        <Tabs />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText("Favorites")).toHaveClass("active");
  });
});
