import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeSwitcher from './theme-switcher';

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

describe('ThemeSwitcher', () => {
  test('renders', () => {
    render(<ThemeSwitcher />);
    const button = screen.getByTestId('theme-switcher');
    expect(button).toBeDefined();
  });
});
