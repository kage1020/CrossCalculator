import { isNumber, escapeKeys, toKey, transformToKeys, Key, KEY, KEYS } from './index';

describe('Utils', () => {
  test('isNumber function', () => {
    expect(isNumber('1')).toBeTruthy();
    expect(isNumber('a')).toBeFalsy();
  });

  test('escapeKeys function', () => {
    const keys: Key[] = [
      { label: '1', value: '1', escapedValue: '1', row: 1, col: 1 },
      { label: '2', value: '2', escapedValue: '2', row: 1, col: 2 },
    ];
    expect(escapeKeys(keys)).toBe('12');
  });

  test('toKey function', () => {
    expect(toKey('c')).toEqual(KEYS[KEY.CLEAR]);
    expect(toKey('p')).toEqual(KEYS[KEY.ADD]);
    expect(toKey('m')).toEqual(KEYS[KEY.SUBTRACT]);
    expect(toKey('t')).toEqual(KEYS[KEY.MULTIPLY]);
    expect(toKey('d')).toEqual(KEYS[KEY.DIVIDE]);
    expect(toKey('e')).toEqual(KEYS[KEY.EQUAL]);
    expect(toKey('1')).toEqual({ label: '1', value: 1, escapedValue: '1', row: 0, col: 0 });
  });

  test('transformToKeys function', () => {
    let str = '1p1e2';
    expect(transformToKeys(str)).toEqual([
      [
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.EQUAL]!,
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
      ],
    ]);
    str = '1p1e2p1e3';
    expect(transformToKeys(str)).toEqual([
      [
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.EQUAL]!,
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
      ],
      [
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.EQUAL]!,
        { label: '3', value: 3, escapedValue: '3', row: 0, col: 0 },
      ],
    ]);
    str = '1p1e2c2p2e4';
    expect(transformToKeys(str)).toEqual([
      [
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.EQUAL]!,
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
      ],
      [
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '2', value: 2, escapedValue: '2', row: 0, col: 0 },
        KEYS[KEY.EQUAL]!,
        { label: '4', value: 4, escapedValue: '4', row: 0, col: 0 },
      ],
    ]);
    str = '1p1';
    expect(transformToKeys(str)).toEqual([
      [
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
        KEYS[KEY.ADD]!,
        { label: '1', value: 1, escapedValue: '1', row: 0, col: 0 },
      ],
    ]);
    str = '';
    expect(transformToKeys(str)).toEqual([]);
  });
});
