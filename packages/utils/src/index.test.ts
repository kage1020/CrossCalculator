import { KEY } from "@repo/data"
import { describe, expect, test } from "vitest"
import { createUrl, isNumber, isOperator, parseUrl, toKey } from "./index"

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(KEY.ZERO)).toBeTruthy()
    expect(isNumber(KEY.ONE)).toBeTruthy()
    expect(isNumber(KEY.TWO)).toBeTruthy()
    expect(isNumber(KEY.THREE)).toBeTruthy()
    expect(isNumber(KEY.FOUR)).toBeTruthy()
    expect(isNumber(KEY.FIVE)).toBeTruthy()
    expect(isNumber(KEY.SIX)).toBeTruthy()
    expect(isNumber(KEY.SEVEN)).toBeTruthy()
    expect(isNumber(KEY.EIGHT)).toBeTruthy()
    expect(isNumber(KEY.NINE)).toBeTruthy()
    expect(isNumber(KEY.DECIMAL)).toBeFalsy()
    expect(isNumber(KEY.ADD)).toBeFalsy()
    expect(isNumber(KEY.SUBTRACT)).toBeFalsy()
    expect(isNumber(KEY.MULTIPLY)).toBeFalsy()
    expect(isNumber(KEY.DIVIDE)).toBeFalsy()
    expect(isNumber(KEY.EQUAL)).toBeFalsy()
    expect(isNumber(KEY.CLEAR)).toBeFalsy()
  })
})

describe("isOperator", () => {
  test("should return true for operators", () => {
    expect(isOperator(KEY.ZERO)).toBeFalsy()
    expect(isOperator(KEY.ONE)).toBeFalsy()
    expect(isOperator(KEY.TWO)).toBeFalsy()
    expect(isOperator(KEY.THREE)).toBeFalsy()
    expect(isOperator(KEY.FOUR)).toBeFalsy()
    expect(isOperator(KEY.FIVE)).toBeFalsy()
    expect(isOperator(KEY.SIX)).toBeFalsy()
    expect(isOperator(KEY.SEVEN)).toBeFalsy()
    expect(isOperator(KEY.EIGHT)).toBeFalsy()
    expect(isOperator(KEY.NINE)).toBeFalsy()
    expect(isOperator(KEY.DECIMAL)).toBeFalsy()
    expect(isOperator(KEY.ADD)).toBeTruthy()
    expect(isOperator(KEY.SUBTRACT)).toBeTruthy()
    expect(isOperator(KEY.MULTIPLY)).toBeTruthy()
    expect(isOperator(KEY.DIVIDE)).toBeTruthy()
    expect(isOperator(KEY.EQUAL)).toBeFalsy()
    expect(isOperator(KEY.CLEAR)).toBeFalsy()
  })
})

describe("toKey", () => {
  test("should return a correct key", () => {
    expect(toKey("c")).toEqual(KEY.CLEAR)
    expect(toKey("d")).toEqual(KEY.DIVIDE)
    expect(toKey("t")).toEqual(KEY.MULTIPLY)
    expect(toKey("m")).toEqual(KEY.SUBTRACT)
    expect(toKey("p")).toEqual(KEY.ADD)
    expect(toKey("e")).toEqual(KEY.EQUAL)
    expect(toKey(".")).toEqual(KEY.DECIMAL)
    expect(toKey("0")).toEqual({
      label: "0",
      value: 0,
      escapedValue: "0",
      row: 1,
      col: 1,
    })
    expect(toKey("1")).toEqual(KEY.ONE)
    expect(toKey("2")).toEqual(KEY.TWO)
    expect(toKey("3")).toEqual(KEY.THREE)
    expect(toKey("4")).toEqual(KEY.FOUR)
    expect(toKey("5")).toEqual(KEY.FIVE)
    expect(toKey("6")).toEqual(KEY.SIX)
    expect(toKey("7")).toEqual(KEY.SEVEN)
    expect(toKey("8")).toEqual(KEY.EIGHT)
    expect(toKey("9")).toEqual(KEY.NINE)
    expect(toKey("100")).toEqual({
      label: "100",
      value: 100,
      escapedValue: "100",
      row: 1,
      col: 1,
    })
    expect(toKey("-100")).toEqual({
      label: "-100",
      value: -100,
      escapedValue: "-100",
      row: 1,
      col: 1,
    })
    expect(toKey("Infinity")).toEqual({
      label: "Infinity",
      value: Infinity,
      escapedValue: "Infinity",
      row: 1,
      col: 1,
    })
    expect(toKey("string")).toEqual({
      label: "string",
      value: -1,
      escapedValue: "string",
      row: 1,
      col: 1,
    })
  })
})

describe("createUrl", () => {
  test("should create a correct url", () => {
    expect(createUrl([])).toEqual("/?f=")
    expect(createUrl([KEY.ZERO])).toEqual("/?f=0")
    expect(
      createUrl([
        KEY.ONE,
        KEY.TWO,
        KEY.THREE,
        KEY.FOUR,
        KEY.FIVE,
        KEY.SIX,
        KEY.SEVEN,
        KEY.EIGHT,
        KEY.NINE,
        KEY.ADD,
        KEY.SUBTRACT,
        KEY.MULTIPLY,
        KEY.DIVIDE,
        KEY.EQUAL,
        KEY.CLEAR,
        KEY.DECIMAL,
      ]),
    ).toEqual("/?f=123456789pmtdec.")
  })
})

describe("parseUrl", () => {
  test("should parse a correct url", () => {
    expect(parseUrl("")).toEqual([])
    expect(parseUrl("0")).toEqual([
      [{ label: "0", value: 0, escapedValue: "0", row: 1, col: 1 }],
    ])
    expect(parseUrl("1p")).toEqual([[KEY.ONE, KEY.ADD]])
    expect(parseUrl("1p1")).toEqual([[KEY.ONE, KEY.ADD, KEY.ONE]])
    expect(parseUrl("1p1e")).toEqual([[KEY.ONE, KEY.ADD, KEY.ONE, KEY.EQUAL]])
    expect(parseUrl("1p1e1")).toEqual([
      [KEY.ONE, KEY.ADD, KEY.ONE, KEY.EQUAL, KEY.ONE],
    ])
    expect(parseUrl("1p1e1p1")).toEqual([
      [KEY.ONE, KEY.ADD, KEY.ONE, KEY.EQUAL, KEY.ONE],
      [KEY.ONE, KEY.ADD, KEY.ONE],
    ])
    expect(parseUrl("1p1c1p1e1")).toEqual([
      [KEY.ONE, KEY.ADD, KEY.ONE, KEY.EQUAL, KEY.ONE],
    ])
    expect(parseUrl("1p1p1e1")).toEqual([
      [KEY.ONE, KEY.ADD, KEY.ONE, KEY.ADD, KEY.ONE, KEY.EQUAL, KEY.ONE],
    ])
  })
})
