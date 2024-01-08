import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UtilCard from './util-card';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
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

describe('UtilCard', () => {
  test('renders', () => {
    render(<UtilCard />);
    expect(screen.getByTestId('util-card')).toBeDefined();
  });
});
