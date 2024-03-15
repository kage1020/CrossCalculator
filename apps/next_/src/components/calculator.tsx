"use client"

import { KEY, KEYS, Key } from "@repo/data"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@repo/ui/NextUI"
import { Divide, Equal, Minus, Plus, Times } from "@repo/ui/icons/react"
import { cn, isNumber, isOperator, parseUrl, toKey } from "@repo/utils"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

export default function Calculator() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [formula, setFormula] = useState<Key[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const f = searchParams.get("f")
    if (f) {
      const history = parseUrl(f)[0]
      if (!history?.includes(KEY.EQUAL)) {
        setFormula(history || [])
        return
      }
    }
    setFormula([KEY.ZERO])
  }, [])

  const addKeysToUrl = (key: Key[]) => {
    const f = searchParams.get("f")
    const escapedValues = key.map(({ escapedValue }) => escapedValue).join("")
    router.replace(`${pathname}?f=${f ?? ""}${escapedValues}`, {
      scroll: false,
    })
  }

  const setHistory = (key: Key) => {
    // if clear key is pressed, clear the formula
    if (key === KEY.CLEAR) {
      setFormula([KEY.ZERO])
      addKeysToUrl([KEY.CLEAR])
      return
    }
    // if equal key is pressed, calculate the result
    else if (key === KEY.EQUAL) {
      // if the last key is an operator, return
      if (isOperator(formula.at(-1))) return
      const result = toKey(
        eval(formula.map((key) => key.value).join("")).toString(),
      )
      setFormula([result])
      addKeysToUrl([KEY.EQUAL, result])
    }
    // if operator key is pressed, add the operator to the formula
    else if (isOperator(key)) {
      // if the last key is a decimal, return
      if (formula.at(-1) === KEY.DECIMAL) return
      // if the last key is an operator, replace the last key with the new operator
      if (isOperator(formula.at(-1))) {
        setFormula([...formula.slice(0, -1), key])
        addKeysToUrl([key])
        return
      }
      setFormula([...formula, key])
      addKeysToUrl([key])
    }
    // if decimal key is pressed, add the decimal to the formula
    else if (key === KEY.DECIMAL) {
      // if the last key is a decimal, return
      if (formula.at(-1) === KEY.DECIMAL) return
      // if the last key is an operator, add a zero before the decimal
      if (isOperator(formula.at(-1))) {
        setFormula([...formula, KEY.ZERO, key])
        addKeysToUrl([KEY.ZERO, key])
        return
      }
      setFormula([...formula, key])
      addKeysToUrl([key])
    }
    // if 0 key is pressed, add the 0 to the formula
    else if (key === KEY.ZERO) {
      // if first key is 0, return
      if (formula.at(0) === KEY.ZERO) return
      setFormula([...formula, key])
      addKeysToUrl([key])
    }
    // if number key is pressed, add the number to the formula
    else if (isNumber(key)) {
      // if the first and last key is 0, replace the last key with the new number
      if (formula.at(0) === KEY.ZERO && formula.at(-1) === KEY.ZERO) {
        setFormula([...formula.slice(0, -1), key])
        addKeysToUrl([key])
        return
      }
      // if the last key is a number, append the new number to the last key
      if (isNumber(formula.at(-1))) {
        const lastKey = formula.at(-1)!
        const newKey = toKey(lastKey.escapedValue + key.escapedValue)
        setFormula([...formula.slice(0, -1), newKey])
        addKeysToUrl([newKey])
      }
      setFormula([...formula, key])
      addKeysToUrl([key])
    } else {
      onOpen()
    }
  }

  return (
    <>
      <Card className="font-mono text-2xl">
        <CardHeader className="justify-center">
          <div
            className="w-full inline-flex px-3 border-medium border-default-200 min-h-unit-10 rounded items-center justify-end gap-1 h-14 py-2 outline-none focus-visible:outline-none overflow-x-auto tracking-widest"
            tabIndex={-1}
          >
            {formula.map((key, i) => (
              <Fragment key={i}>
                {(isNumber(key) || key.label === ".") && (
                  <span>{key.label}</span>
                )}
                {!isNumber(key) && key === KEY.ADD && <Plus size={24} />}
                {!isNumber(key) && key === KEY.SUBTRACT && <Minus size={24} />}
                {!isNumber(key) && key === KEY.MULTIPLY && <Times size={24} />}
                {!isNumber(key) && key === KEY.DIVIDE && <Divide size={24} />}
              </Fragment>
            ))}
          </div>
        </CardHeader>
        <CardBody className="grid grid-cols-4 gap-2">
          {KEYS.map((key) => (
            <Button
              className={cn(
                "h-full rounded py-2 text-2xl",
                key.row === 2 && "row-span-2",
                key.col === 2 && "col-span-2",
              )}
              key={key.value}
              onClick={() => setHistory(key)}
            >
              {(isNumber(key) || key.label === "." || key.label === "C") &&
                key.label}
              {!isNumber(key) && key === KEY.ADD && <Plus size={24} />}
              {!isNumber(key) && key === KEY.SUBTRACT && <Minus size={24} />}
              {!isNumber(key) && key === KEY.MULTIPLY && <Times size={24} />}
              {!isNumber(key) && key === KEY.DIVIDE && <Divide size={24} />}
              {!isNumber(key) && key === KEY.EQUAL && <Equal size={24} />}
            </Button>
          ))}
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Oops! Something went wrong.</ModalHeader>
          <ModalBody>
            <p>There was an error processing calculation.</p>
            <p>
              Please give me a feedback on{" "}
              <Link
                href="https://github.com/kage1020/CrossCalculator"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
              .
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
