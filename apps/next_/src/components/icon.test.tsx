import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Icon from './icon';
import { NextIcon } from '@repo/ui/ReactIcons';

describe('Icon', () => {
  test('renders', () => {
    const { container } = render(<Icon icon={NextIcon} />);
    expect(container.firstChild).toBeDefined();
  });
});
