import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CalcCard from './calc-card';

describe('CalcCard', () => {
  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useSearchParams: () => new URLSearchParams(),
      useRouter: () => {},
    };
  });
  const { rerender } = render(<CalcCard />);

  test('renders with empty search params', () => {
    expect(screen.getByTestId('calc-main')).toBeDefined();
    expect(screen.getByTestId('calc-history')).toBeDefined();
  });

  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useSearchParams: () => new URLSearchParams('f=1p1'),
      useRouter: () => {},
    };
  });
  rerender(<CalcCard />);

  test('renders with incomplete formula', () => {
    expect(screen.getByTestId('calc-main')).toBeDefined();
    expect(screen.getByTestId('calc-history')).toBeDefined();
  });

  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useSearchParams: () => new URLSearchParams('f=1p1e1'),
      useRouter: () => {},
    };
  });
  rerender(<CalcCard />);

  test('renders with complete formula', () => {
    expect(screen.getByTestId('calc-main')).toBeDefined();
    expect(screen.getByTestId('calc-history')).toBeDefined();
  });
});
