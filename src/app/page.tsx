'use client'

import { useState } from 'react'

import { Divide, Equal, Minus, Plus, X } from 'lucide-react'

import { ModeToggle } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'

type Label = {
  label: string | number
  icon: LucideIcon | null
  row: number
  col: number
}

const labels = [
  { label: 'C', icon: null, row: 1, col: 1 },
  { label: '/', icon: Divide, row: 1, col: 1 },
  { label: '*', icon: X, row: 1, col: 1 },
  { label: '-', icon: Minus, row: 1, col: 1 },
  { label: 7, icon: null, row: 1, col: 1 },
  { label: 8, icon: null, row: 1, col: 1 },
  { label: 9, icon: null, row: 1, col: 1 },
  { label: '+', icon: Plus, row: 2, col: 1 },
  { label: 4, icon: null, row: 1, col: 1 },
  { label: 5, icon: null, row: 1, col: 1 },
  { label: 6, icon: null, row: 1, col: 1 },
  { label: 1, icon: null, row: 1, col: 1 },
  { label: 2, icon: null, row: 1, col: 1 },
  { label: 3, icon: null, row: 1, col: 1 },
  { label: '=', icon: Equal, row: 2, col: 1 },
  { label: 0, icon: null, row: 1, col: 2 },
  { label: '.', icon: null, row: 1, col: 1 },
]

export default function Home() {
  const [formula, setFormula] = useState<Label[]>([])

  const handlePush = (label: Label) => {
    if (label.label === 'C') {
      setFormula([])
      return
    } else if (formula.length !== 0 && label.label === '=') {
      const result = eval(formula.map((f) => f.label).join(''))
      setFormula([{ label: result.toString(), icon: null, row: 1, col: 1 }])
      return
    }
    if (formula.length === 0 && typeof label.label !== 'number') return
    if (formula.length === 1 && formula[0].label === 0 && typeof label.label === 'number') {
      setFormula([label])
      return
    }
    setFormula([...formula, label])
  }

  return (
    <main className='grid place-items-center w-full h-full bg-stone-200 dark:bg-stone-900'>
      <div className='absolute top-8 right-8'>
        <ModeToggle />
      </div>
      <Card>
        <CardHeader>Next.js Calculator</CardHeader>
        <CardContent>
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-4 h-10 rounded p-2 bg-stone-100 dark:bg-stone-800 flex items-center justify-end tracking-wider'>
              {formula.map((f, i) => (
                <span key={i}>
                  {f.icon && <f.icon size={20} />}
                  {!f.icon && f.label}
                </span>
              ))}
            </div>
            {labels.map((l) => (
              <Button
                className={cn(
                  'text-lg',
                  l.row == 1 ? 'row-span-1' : 'row-span-2 h-full',
                  l.col == 1 ? 'col-span-1' : 'col-span-2',
                )}
                key={l.label}
                variant='secondary'
                onClick={() => handlePush(l)}
              >
                {!l.icon && l.label}
                {l.icon && <l.icon />}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
