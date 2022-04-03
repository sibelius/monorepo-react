import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

it('should render button', () => {
  render(<Button />);

  expect(screen.getByText('Click me')).toBeInTheDocument();
});