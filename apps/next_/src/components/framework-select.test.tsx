import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FrameworkSelect from './framework-select';
import { frameworks } from '@/libs';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useSearchParams: () => new URLSearchParams(),
  };
});

describe('FrameworkSelect', () => {
  test('renders', () => {
    render(<FrameworkSelect />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(frameworks.filter((f) => f.value !== 'next').length);

    for (const button of buttons) {
      const href = button.getAttribute('href');
      expect(href).toBeDefined();
      expect(href).toContain('?');
    }

    expect(buttons.map((b) => b.textContent)).toEqual(
      frameworks.filter((f) => f.value !== 'next').map((f) => f.label)
    );
  });
});
