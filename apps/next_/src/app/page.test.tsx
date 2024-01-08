import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
      push: (path: string) => {},
      replace: (path: string) => {},
    }),
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

test('renders', () => {
  render(<Page />);
  expect(screen.getByTestId('root-page')).toBeDefined();
});
