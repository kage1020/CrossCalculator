export type Framework = {
  label: string;
  value: string;
  href: string;
  color: { light: string; dark: string };
};

export const FRAMEWORKS = {
  Astro: {
    label: 'Astro',
    value: 'astro',
    href: '/astro',
    color: { light: '#8D46E7', dark: '#8D46E7' },
  },
  Gatsby: {
    label: 'Gatsby',
    value: 'gatsby',
    href: '/gatsby',
    color: { light: '#663399', dark: '#663399' },
  },
  Next: {
    label: 'Next.js',
    value: 'next',
    href: '/next',
    color: { light: '#000000', dark: '#ffffff' },
  },
  Nuxt: {
    label: 'Nuxt',
    value: 'nuxt',
    href: '/nuxt',
    // color: { light: '#ffffff', dark: '#020420' },
    color: { light: '#00dc82', dark: '#00dc82' },
  },
  qwik: {
    label: 'qwik',
    value: 'qwik',
    href: '/qwik',
    color: { light: '#0093ee', dark: '#009dfd' },
  },
  React: {
    label: 'React',
    value: 'react',
    href: '/react',
    color: { light: '#0074a6', dark: '#0074a6' },
  },
  Remix: {
    label: 'Remix',
    value: 'remix',
    href: '/remix',
    color: { light: '#121212', dark: '#121212' },
  },
  Solid: {
    label: 'Solid',
    value: 'solid',
    href: '/solid',
    color: { light: '#2c4f7c', dark: '#2c4f7c' },
  },
  Svelte: {
    label: 'Svelte',
    value: 'svelte',
    href: '/svelte',
    color: { light: '#ff3e00', dark: '#ff3e00' },
  },
  Vue: {
    label: 'Vue',
    value: 'vue',
    href: '/vue',
    color: { light: '#3c8772', dark: '#3c8772' },
  },
};

export const frameworks = Object.values(FRAMEWORKS) as Framework[];

export type Key = {
  label: string;
  value: string | number;
  escapedValue: string;
  row: number;
  col: number;
};

export const KEY = {
  CLEAR: 0,
  DIVIDE: 1,
  MULTIPLY: 2,
  SUBTRACT: 3,
  SEVEN: 4,
  EIGHT: 5,
  NINE: 6,
  ADD: 7,
  FOUR: 8,
  FIVE: 9,
  SIX: 10,
  ONE: 11,
  TWO: 12,
  THREE: 13,
  EQUAL: 14,
  ZERO: 15,
  DECIMAL: 16,
};

export const KEYS: Key[] = [
  { label: 'C', value: 'c', escapedValue: 'c', row: 1, col: 1 },
  { label: '÷', value: '/', escapedValue: 'd', row: 1, col: 1 },
  { label: '×', value: '*', escapedValue: 't', row: 1, col: 1 },
  { label: '−', value: '-', escapedValue: 'm', row: 1, col: 1 },
  { label: '7', value: 7, escapedValue: '7', row: 1, col: 1 },
  { label: '8', value: 8, escapedValue: '8', row: 1, col: 1 },
  { label: '9', value: 9, escapedValue: '9', row: 1, col: 1 },
  { label: '＋', value: '+', escapedValue: 'p', row: 2, col: 1 },
  { label: '4', value: 4, escapedValue: '4', row: 1, col: 1 },
  { label: '5', value: 5, escapedValue: '5', row: 1, col: 1 },
  { label: '6', value: 6, escapedValue: '6', row: 1, col: 1 },
  { label: '1', value: 1, escapedValue: '1', row: 1, col: 1 },
  { label: '2', value: 2, escapedValue: '2', row: 1, col: 1 },
  { label: '3', value: 3, escapedValue: '3', row: 1, col: 1 },
  { label: '＝', value: '=', escapedValue: 'e', row: 2, col: 1 },
  { label: '0', value: 0, escapedValue: '0', row: 1, col: 2 },
  { label: '.', value: '.', escapedValue: '.', row: 1, col: 1 },
];

export const isNumber = (key: string | undefined) => !isNaN(Number(key));

export function escapeKeys(keys: Key[]) {
  return keys.map(({ escapedValue }) => escapedValue).join('');
}

export function toKey(str: string) {
  switch (str) {
    case 'c':
      return KEYS[KEY.CLEAR]!;
    case 'd':
      return KEYS[KEY.DIVIDE]!;
    case 't':
      return KEYS[KEY.MULTIPLY]!;
    case 'm':
      return KEYS[KEY.SUBTRACT]!;
    case 'p':
      return KEYS[KEY.ADD]!;
    case 'e':
      return KEYS[KEY.EQUAL]!;
    default:
      return { label: str, value: Number(str), escapedValue: str, row: 0, col: 0 };
  }
}

export function transformToKeys(str: string) {
  const split: string[] = str.match(/[0-9]+|[a-z]|./g) || [];
  const results: Key[][] = [];
  let temp: Key[] = [];
  for (let i = 0; i < split.length; i++) {
    if (split[i] === KEYS[KEY.CLEAR]?.escapedValue) {
      temp = [];
      continue;
    } else if (split[i] === KEYS[KEY.EQUAL]?.escapedValue) {
      results.push([...temp, KEYS[KEY.EQUAL]!, toKey(split[i + 1]!)]);
      if (i + 2 < split.length && split[i + 2] !== KEYS[KEY.CLEAR]?.escapedValue)
        temp = [toKey(split[i + 1]!)];
      else temp = [];
      i++;
    } else temp.push(toKey(split[i]!));
  }
  if (temp.length) results.push(temp);
  return results;
}
