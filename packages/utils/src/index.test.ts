import { createUrl, parseUrl, isNumber, isOperator, toKey, KEYS, KEY } from './index';

describe('Utils', () => {
  test('toKey', () => {
    expect(toKey('c')).toEqual(KEYS[KEY.CLEAR]);
    expect(toKey('p')).toEqual(KEYS[KEY.ADD]);
    expect(toKey('m')).toEqual(KEYS[KEY.SUBTRACT]);
    expect(toKey('t')).toEqual(KEYS[KEY.MULTIPLY]);
    expect(toKey('d')).toEqual(KEYS[KEY.DIVIDE]);
    expect(toKey('e')).toEqual(KEYS[KEY.EQUAL]);
    expect(toKey('.')).toEqual(KEYS[KEY.DECIMAL]);
    expect(toKey('0')).toEqual({ label: '0', value: 0, escapedValue: '0', row: 0, col: 0 });
    expect(toKey('1')).toEqual({ label: '1', value: 1, escapedValue: '1', row: 0, col: 0 });
    expect(toKey('100')).toEqual({ label: '100', value: 100, escapedValue: '100', row: 0, col: 0 });
    expect(toKey('-100')).toEqual({
      label: '-100',
      value: -100,
      escapedValue: '-100',
      row: 0,
      col: 0,
    });
    expect(toKey('Infinity')).toEqual({
      label: 'Infinity',
      value: Infinity,
      escapedValue: 'Infinity',
      row: 0,
      col: 0,
    });
  });

  test('isNumber', () => {
    expect(isNumber(KEYS[KEY.DECIMAL])).toBe(false);
    expect(isNumber(KEYS[KEY.CLEAR])).toBe(false);
    expect(isNumber(KEYS[KEY.EQUAL])).toBe(false);
    expect(isNumber(KEYS[KEY.ADD])).toBe(false);
    expect(isNumber(KEYS[KEY.SUBTRACT])).toBe(false);
    expect(isNumber(KEYS[KEY.MULTIPLY])).toBe(false);
    expect(isNumber(KEYS[KEY.DIVIDE])).toBe(false);
    expect(isNumber(KEYS[KEY.ZERO])).toBe(true);
    expect(isNumber(KEYS[KEY.ONE])).toBe(true);
    expect(isNumber(toKey('100'))).toBe(true);
    expect(isNumber(toKey('-100'))).toBe(true);
    expect(isNumber(toKey('Infinity'))).toBe(true);
  });

  test('isOperator', () => {
    expect(isOperator(KEYS[KEY.DECIMAL])).toBe(false);
    expect(isOperator(KEYS[KEY.CLEAR])).toBe(false);
    expect(isOperator(KEYS[KEY.EQUAL])).toBe(false);
    expect(isOperator(KEYS[KEY.ADD])).toBe(true);
    expect(isOperator(KEYS[KEY.SUBTRACT])).toBe(true);
    expect(isOperator(KEYS[KEY.MULTIPLY])).toBe(true);
    expect(isOperator(KEYS[KEY.DIVIDE])).toBe(true);
    expect(isOperator(KEYS[KEY.ZERO])).toBe(false);
    expect(isOperator(KEYS[KEY.ONE])).toBe(false);
    expect(isOperator(toKey('100'))).toBe(false);
    expect(isOperator(toKey('-100'))).toBe(false);
    expect(isOperator(toKey('Infinity'))).toBe(false);
  });

  test('createUrl', () => {
    expect(createUrl([])).toBe('/?f=');
    expect(createUrl([KEYS[KEY.ONE]!])).toBe('/?f=1');
    expect(
      createUrl([
        KEYS[KEY.ADD]!,
        KEYS[KEY.SUBTRACT]!,
        KEYS[KEY.MULTIPLY]!,
        KEYS[KEY.DIVIDE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.DECIMAL]!,
      ])
    ).toBe('/?f=pmtde.');
  });

  test('parseUrl', () => {
    expect(parseUrl('')).toEqual([]);
    expect(parseUrl('1')).toEqual([[toKey('1')]]);
    expect(parseUrl('2p')).toEqual([[toKey('2'), KEYS[KEY.ADD]!]]);
    expect(parseUrl('3m4')).toEqual([[toKey('3'), KEYS[KEY.SUBTRACT]!, toKey('4')]]);
    expect(parseUrl('5t6e11')).toEqual([
      [toKey('5'), KEYS[KEY.MULTIPLY]!, toKey('6'), KEYS[KEY.EQUAL]!, toKey('11')],
    ]);
    expect(parseUrl('7p8p9e24p1e25')).toEqual([
      [
        toKey('7'),
        KEYS[KEY.ADD]!,
        toKey('8'),
        KEYS[KEY.ADD]!,
        toKey('9'),
        KEYS[KEY.EQUAL]!,
        toKey('24'),
      ],
      [toKey('24'), KEYS[KEY.ADD]!, toKey('1'), KEYS[KEY.EQUAL]!, toKey('25')],
    ]);
    expect(parseUrl('1p1c1p2e3')).toEqual([
      [toKey('1'), KEYS[KEY.ADD]!, toKey('2'), KEYS[KEY.EQUAL]!, toKey('3')],
    ]);
  });
});
