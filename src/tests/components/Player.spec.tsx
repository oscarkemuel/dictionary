import { render, screen } from '@testing-library/react';
import { Player } from '../../components/Player';
import { DictionaryContext } from '../../hooks/useDictionary';

describe('Player component', () => {
  it('renders correctly without audio', () => {
    const word = {
      word: 'word',
      phonetic: {
        text: 'phonetic',
      }
    }

    render(
      <DictionaryContext.Provider value={{ word } as any}>
        <Player />
      </DictionaryContext.Provider>
    );

    expect(screen.getByText('AUDIO NOT FOUND')).toBeInTheDocument();
  })
})