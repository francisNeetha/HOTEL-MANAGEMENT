import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello World text', () => {
  render(<App />);
  const helloWorldElement = screen.getByText(/hello world/i);
  expect(helloWorldElement).toBeInTheDocument();
});


