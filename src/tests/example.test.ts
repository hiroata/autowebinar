import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

test('LoadingSpinner renders correctly', () => {
  render(<LoadingSpinner />);
  const spinnerElement = screen.getByRole('status');
  expect(spinnerElement).toBeInTheDocument();
});