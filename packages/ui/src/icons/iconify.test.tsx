import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { QwikIcon, LoadingIcon } from './iconify';

describe('IconifyIcons', () => {
  test('QwikIcon', () => {
    const { getByTestId, rerender } = render(<QwikIcon />);
    expect(getByTestId('qwik-icon')).toBeDefined();
  });

  test('LoadingIcon', () => {
    const { getByTestId } = render(<LoadingIcon />);
    expect(getByTestId('loading-icon')).toBeDefined();
  });
});
