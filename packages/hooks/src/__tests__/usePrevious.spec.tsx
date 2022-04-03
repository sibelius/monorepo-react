import { useState } from  'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { usePrevious } from '../usePrevious';

it('should render previous value', () => {
  const App = () => {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
      <div>
        <p>{prevCount}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    );
  };

  render(<App />);

  const btnPlus = screen.getByText('+');

  fireEvent.click(btnPlus);
  fireEvent.click(btnPlus);

  expect(screen.getByText('1')).toBeInTheDocument();
});