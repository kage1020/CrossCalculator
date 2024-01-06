'use client';

import { cn } from '@/libs';
import NextUIButton from '@repo/ui/NextUIButton';
import { Card, CardBody, CardHeader } from '@repo/ui/NextUICard';
import { DivideIcon, EqualIcon, MinusIcon, PlusIcon, TimesIcon } from '@repo/ui/ReactIcons';
import { KEY, KEYS, Key, isNumber, isOperator, toKey, createUrl, parseUrl } from '@repo/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

export default function CalculatorCard() {
  const [formula, setFormula] = useState<Key[]>([]);
  const [history, setHistory] = useState<Key[][]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const f = searchParams.get('f');
    if (f) {
      const hist = parseUrl(f);
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

  const updateUrl = (keys: Key[]) => {
    router.replace(createUrl(keys), { scroll: false });
  };

  const handlePush = (key: Key) => {
    // if push clear
    if (key.escapedValue === KEYS[KEY.CLEAR]?.escapedValue) {
      setFormula([KEYS[KEY.ZERO]!]);
      updateUrl(history.flat());
    }
    // if push =
    else if (key.escapedValue === KEYS[KEY.EQUAL]?.escapedValue) {
      // if previous key is + - * /
      if (isOperator(formula.at(-1))) return;
      let result = eval(formula.map((f) => f.value).join(''));
      result = toKey(result.toString());
      if (result.escapedValue === 'Infinity') setFormula([KEYS[KEY.ZERO]!]);
      else setFormula([result]);
      setHistory((p) => [...p, [...formula, key, result]]);
      updateUrl([...history.flat(), ...formula, key, result]);
    }
    // if push + - * /
    else if (isOperator(key)) {
      // if previous key is + - * /
      if (isOperator(formula.at(-1))) {
        setFormula((p) => [...p.slice(0, -1), key]);
        updateUrl([...history.flat(), ...formula.slice(0, -1), key]);
      }
      // if previous key is .
      else if (formula.at(-1)?.escapedValue === '.') {
        setFormula((p) => [...p, KEYS[KEY.ZERO]!, key]);
        updateUrl([...history.flat(), ...formula, KEYS[KEY.ZERO]!, key]);
      } else {
        setFormula((p) => [...p, key]);
        updateUrl([...history.flat(), ...formula, key]);
      }
    }
    // if push .
    else if (key.escapedValue === '.') {
      // if previous key is + - * /
      if (isOperator(formula.at(-1))) {
        setFormula((p) => [...p, KEYS[KEY.ZERO]!, key]);
        updateUrl([...history.flat(), ...formula, KEYS[KEY.ZERO]!, key]);
      }
      // if previous key is .
      else if (formula.at(-1)?.escapedValue === '.') {
        return;
      }
      // if previous key is number
      else if (isNumber(formula.at(-1))) {
        setFormula((p) => [...p, key]);
        updateUrl([...history.flat(), ...formula, key]);
      }
    }
    // if push 0
    else if (key.escapedValue === '0') {
      // if previous key is 0 and it is first key
      if (formula.at(-1)?.escapedValue === '0' && formula.length === 1) return;
      setFormula((p) => [...p, key]);
      updateUrl([...history.flat(), ...formula, key]);
    }
    // if push number
    else {
      // if previous key is 0 and it is first key
      if (formula.at(-1)?.escapedValue === '0' && formula.length === 1) {
        setFormula((p) => [...p.slice(0, -1), key]);
        updateUrl([...history.flat(), ...formula.slice(0, -1), key]);
      }
      // if previous key is number
      else if (isNumber(formula.at(-1))) {
        const last = formula.at(-1)!;
        setFormula((p) => [...p.slice(0, -1), toKey(String(last.value) + String(key.value))]);
        updateUrl([
          ...history.flat(),
          ...formula.slice(0, -1),
          toKey(String(last.value) + String(key.value)),
        ]);
      } else {
        setFormula((p) => [...p, key]);
        updateUrl([...history.flat(), ...formula, key]);
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className='h-10 w-full border-2 rounded flex justify-end items-center tracking-wider p-1 dark:border-stone-600 text-xl'>
            {formula.map((f, i) => (
              <Fragment key={i}>
                {(isNumber(f) || f.label === '.') && (
                  <span className='w-3 min-w-max' key={i}>
                    {f.label}
                  </span>
                )}
                {!isNumber(f) && f === KEYS[KEY.ADD] && <PlusIcon />}
                {!isNumber(f) && f === KEYS[KEY.SUBTRACT] && <MinusIcon />}
                {!isNumber(f) && f === KEYS[KEY.MULTIPLY] && <TimesIcon />}
                {!isNumber(f) && f === KEYS[KEY.DIVIDE] && <DivideIcon />}
                {!isNumber(f) && f === KEYS[KEY.EQUAL] && <EqualIcon />}
              </Fragment>
            ))}
          </div>
        </CardHeader>
        <CardBody className='grid grid-cols-4 grid-row-5 gap-2'>
          {KEYS.map((k) => (
            <NextUIButton
              className={cn(
                'text-2xl h-full rounded !bg-neutral-700 min-w-0',
                k.row === 2 && 'row-span-2',
                k.col === 2 && 'col-span-2'
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
                    {(isNumber(v) || v.label === '.') && (
                      <span className='w-3 min-w-max'>{v.label}</span>
                    )}
                    {!isNumber(v) && v === KEYS[KEY.ADD] && <PlusIcon />}
                    {!isNumber(v) && v === KEYS[KEY.SUBTRACT] && <MinusIcon />}
                    {!isNumber(v) && v === KEYS[KEY.MULTIPLY] && <TimesIcon />}
                    {!isNumber(v) && v === KEYS[KEY.DIVIDE] && <DivideIcon />}
                    {!isNumber(v) && v === KEYS[KEY.EQUAL] && <EqualIcon />}
                  </Fragment>
                ))}
              </div>
              {i !== history.length - 1 && <hr />}
            </Fragment>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
