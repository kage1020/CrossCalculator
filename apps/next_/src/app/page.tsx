'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Card, CardBody, CardHeader } from '@repo/ui/NextUICard';
import NextUIButton from '@repo/ui/NextUIButton';
import {
  GithubIcon,
  NextIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
  TimesIcon,
  DivideIcon,
  EqualIcon,
} from '@repo/ui/ReactIcons';
import { KEY, KEYS, Key, isNumber, toKey, transformToKeys } from '@repo/utils';
import ThemeSwitcher from '@/components/theme-switcher';
import FrameworkSelect from '@/components/framework-select';
import { cn, frameworks } from '@/libs';

export default function Home() {
  const [formula, setFormula] = useState<Key[]>([]);
  const [history, setHistory] = useState<Key[][]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const f = searchParams.get('f');
    if (f) {
      const hist = transformToKeys(f);
      if (
        hist
          .at(-1)
          ?.map((h) => h.escapedValue)
          .includes('e')
      ) {
        setHistory(hist);
      } else {
        setHistory(hist.slice(0, -1));
        setFormula(hist.at(-1)!);
      }
    } else {
      setFormula([KEYS[KEY.ZERO]!]);
    }
  }, []);

  const handlePush = (key: Key) => {
    // if push clear
    if (key.value === KEYS[KEY.CLEAR]?.value) {
      setFormula([KEYS[KEY.ZERO]!]);
      router.push(
        `${pathname}?f=${history
          .flat()
          .map((f) => f.escapedValue)
          .join('')}`,
        { scroll: false }
      );
    }
    // if push =
    else if (key.escapedValue === 'e') {
      // if previous key is + - * /
      if (
        [
          KEYS[KEY.ADD]?.escapedValue,
          KEYS[KEY.SUBTRACT]?.escapedValue,
          KEYS[KEY.MULTIPLY]?.escapedValue,
          KEYS[KEY.DIVIDE]?.escapedValue,
        ].includes(formula.at(-1)?.escapedValue)
      )
        return;
      let result = eval(formula.map((f) => f.value).join(''));
      result = toKey(result.toString());
      setFormula([result]);
      setHistory((p) => [...p, [...formula, key, result]]);
      router.push(
        `${pathname}?f=${[
          ...history.flat().map((f) => f.escapedValue),
          ...formula.map((f) => f.escapedValue),
          key.escapedValue,
          result.escapedValue,
        ].join('')}`,
        { scroll: false }
      );
    }
    // if push + - * /
    else if (
      [
        KEYS[KEY.ADD]?.escapedValue,
        KEYS[KEY.SUBTRACT]?.escapedValue,
        KEYS[KEY.MULTIPLY]?.escapedValue,
        KEYS[KEY.DIVIDE]?.escapedValue,
      ].includes(key.escapedValue)
    ) {
      // if formula is empty
      if (formula.length === 0) return;
      // if previous key is + - * /
      else if (
        [
          KEYS[KEY.ADD]?.escapedValue,
          KEYS[KEY.SUBTRACT]?.escapedValue,
          KEYS[KEY.MULTIPLY]?.escapedValue,
          KEYS[KEY.DIVIDE]?.escapedValue,
        ].includes(formula.at(-1)?.escapedValue)
      ) {
        setFormula((p) => [...p.slice(0, -1), key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.slice(0, -1).map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
      // if previous key is .
      else if (formula.at(-1)?.escapedValue === '.') {
        setFormula((p) => [...p, KEYS[KEY.ZERO]!, key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.map((f) => f.escapedValue),
            '0',
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      } else {
        setFormula((p) => [...p, key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
    }
    // if push .
    else if (key.escapedValue === '.') {
      // if previous key is + - * /
      if (
        [
          KEYS[KEY.ADD]?.escapedValue,
          KEYS[KEY.SUBTRACT]?.escapedValue,
          KEYS[KEY.MULTIPLY]?.escapedValue,
          KEYS[KEY.DIVIDE]?.escapedValue,
        ].includes(formula.at(-1)?.escapedValue)
      ) {
        setFormula((p) => [...p, KEYS[KEY.ZERO]!, key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.map((f) => f.escapedValue),
            '0',
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
      // if previous key is .
      else if (formula.at(-1)?.escapedValue === '.') {
        return;
      }
      // if previous key is number
      else if (isNumber(formula.at(-1)?.label)) {
        setFormula((p) => [...p, key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
    }
    // if push 0
    else if (key.escapedValue === '0') {
      // if previous key is number
      if (isNumber(formula.at(-1)?.label)) {
        setFormula((p) => [...p.slice(0, -1), key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.slice(0, -1).map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
    } else {
      // if previous key is 0
      if (formula.at(-1)?.escapedValue === '0') {
        setFormula((p) => [...p.slice(0, -1), key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.slice(0, -1).map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      } else {
        setFormula((p) => [...p, key]);
        router.push(
          `${pathname}?f=${[
            ...history.flat().map((f) => f.escapedValue),
            ...formula.map((f) => f.escapedValue),
            key.escapedValue,
          ].join('')}`,
          { scroll: false }
        );
      }
    }
  };

  return (
    <main className='grid place-items-center gap-y-2 w-full h-full p-4'>
      <Card className='max-w-[400px]'>
        <CardHeader className='justify-center'>
          {mounted && (
            <NextIcon
              className='mr-1'
              color={theme === 'dark' ? frameworks[2]?.color.dark : frameworks[2]?.color.light}
            />
          )}
          Next.js Cross Calculator
        </CardHeader>
        <CardBody className='gap-y-3 pt-0 !pb-6'>
          <div className='flex items-center justify-center gap-4'>
            <Link
              href='https://github.com/kage1020/CrossCalculator'
              target='_blank'
              rel='noopener noreferrer'
              className='w-8 flex justify-center'
            >
              <GithubIcon size={20} />
            </Link>
            <Link
              href='https://twitter.com/kage1020'
              target='_blank'
              rel='noopener noreferrer'
              className='w-8 flex justify-center'
            >
              <XIcon size={20} />
            </Link>
            <ThemeSwitcher />
          </div>
          <FrameworkSelect />
        </CardBody>
      </Card>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 font-mono'>
        <Card>
          <CardHeader>
            <div className='h-10 w-full border-2 rounded flex justify-end items-center tracking-wider p-1 dark:border-stone-600 text-xl'>
              {formula.map((f, i) => (
                <Fragment key={i}>
                  {(isNumber(f.label) || f.label === '.') && (
                    <span className='w-3 min-w-max' key={i}>
                      {f.label}
                    </span>
                  )}
                  {!isNumber(f.label) && f === KEYS[KEY.ADD] && <PlusIcon />}
                  {!isNumber(f.label) && f === KEYS[KEY.SUBTRACT] && <MinusIcon />}
                  {!isNumber(f.label) && f === KEYS[KEY.MULTIPLY] && <TimesIcon />}
                  {!isNumber(f.label) && f === KEYS[KEY.DIVIDE] && <DivideIcon />}
                  {!isNumber(f.label) && f === KEYS[KEY.EQUAL] && <EqualIcon />}
                </Fragment>
              ))}
            </div>
          </CardHeader>
          <CardBody className='grid grid-cols-4 gap-2'>
            {KEYS.map((k) => (
              <NextUIButton
                className={cn(
                  'text-2xl h-full sm:w-16 md:w-[4.5rem] lg:w-20 xl:w-20 min-h-12 rounded min-w-0',
                  k.row === 2 && 'row-span-2',
                  k.col === 2 &&
                    'col-span-2 sm:w-[8.5rem] md:w-[9.5rem] lg:w-[10.5rem] xl:w-[10.5rem]'
                )}
                key={k.value}
                onClick={() => handlePush(k)}
              >
                {k.label}
              </NextUIButton>
            ))}
          </CardBody>
        </Card>
        <Card className='w-full min-h-[400px]'>
          <CardBody className='gap-y-2'>
            {history.map((h, i) => (
              <Fragment key={i}>
                <div className='flex flex-wrap justify-end items-center space-x-2 text-xl'>
                  {h.map((v, j) => (
                    <Fragment key={j}>
                      {(isNumber(v.label) || v.label === '.') && (
                        <span className='w-3 min-w-max'>{v.label}</span>
                      )}
                      {!isNumber(v.label) && v === KEYS[KEY.ADD] && <PlusIcon />}
                      {!isNumber(v.label) && v === KEYS[KEY.SUBTRACT] && <MinusIcon />}
                      {!isNumber(v.label) && v === KEYS[KEY.MULTIPLY] && <TimesIcon />}
                      {!isNumber(v.label) && v === KEYS[KEY.DIVIDE] && <DivideIcon />}
                      {!isNumber(v.label) && v === KEYS[KEY.EQUAL] && <EqualIcon />}
                    </Fragment>
                  ))}
                </div>
                {i !== history.length - 1 && <hr />}
              </Fragment>
            ))}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
