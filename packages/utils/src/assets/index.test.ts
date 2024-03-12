import { describe, expect, test } from "vitest"
import {
  KEY,
  KEYS,
  createUrl,
  isNumber,
  isOperator,
  parseUrl,
  toKey,
} from "./index"

describe("isNumber", () => {
  test("should return true for numbers", () => {
    expect(isNumber(KEYS[KEY.ZERO])).toBeTruthy()
    expect(isNumber(KEYS[KEY.ONE])).toBeTruthy()
    expect(isNumber(KEYS[KEY.TWO])).toBeTruthy()
    expect(isNumber(KEYS[KEY.THREE])).toBeTruthy()
    expect(isNumber(KEYS[KEY.FOUR])).toBeTruthy()
    expect(isNumber(KEYS[KEY.FIVE])).toBeTruthy()
    expect(isNumber(KEYS[KEY.SIX])).toBeTruthy()
    expect(isNumber(KEYS[KEY.SEVEN])).toBeTruthy()
    expect(isNumber(KEYS[KEY.EIGHT])).toBeTruthy()
    expect(isNumber(KEYS[KEY.NINE])).toBeTruthy()
    expect(isNumber(KEYS[KEY.DECIMAL])).toBeFalsy()
    expect(isNumber(KEYS[KEY.ADD])).toBeFalsy()
    expect(isNumber(KEYS[KEY.SUBTRACT])).toBeFalsy()
    expect(isNumber(KEYS[KEY.MULTIPLY])).toBeFalsy()
    expect(isNumber(KEYS[KEY.DIVIDE])).toBeFalsy()
    expect(isNumber(KEYS[KEY.EQUAL])).toBeFalsy()
    expect(isNumber(KEYS[KEY.CLEAR])).toBeFalsy()
  })
})

describe("isOperator", () => {
  test("should return true for operators", () => {
    expect(isOperator(KEYS[KEY.ZERO])).toBeFalsy()
    expect(isOperator(KEYS[KEY.ONE])).toBeFalsy()
    expect(isOperator(KEYS[KEY.TWO])).toBeFalsy()
    expect(isOperator(KEYS[KEY.THREE])).toBeFalsy()
    expect(isOperator(KEYS[KEY.FOUR])).toBeFalsy()
    expect(isOperator(KEYS[KEY.FIVE])).toBeFalsy()
    expect(isOperator(KEYS[KEY.SIX])).toBeFalsy()
    expect(isOperator(KEYS[KEY.SEVEN])).toBeFalsy()
    expect(isOperator(KEYS[KEY.EIGHT])).toBeFalsy()
    expect(isOperator(KEYS[KEY.NINE])).toBeFalsy()
    expect(isOperator(KEYS[KEY.DECIMAL])).toBeFalsy()
    expect(isOperator(KEYS[KEY.ADD])).toBeTruthy()
    expect(isOperator(KEYS[KEY.SUBTRACT])).toBeTruthy()
    expect(isOperator(KEYS[KEY.MULTIPLY])).toBeTruthy()
    expect(isOperator(KEYS[KEY.DIVIDE])).toBeTruthy()
    expect(isOperator(KEYS[KEY.EQUAL])).toBeFalsy()
    expect(isOperator(KEYS[KEY.CLEAR])).toBeFalsy()
  })
})

describe("toKey", () => {
  test("should return a correct key", () => {
    expect(toKey("c")).toEqual(KEYS[KEY.CLEAR])
    expect(toKey("d")).toEqual(KEYS[KEY.DIVIDE])
    expect(toKey("t")).toEqual(KEYS[KEY.MULTIPLY])
    expect(toKey("m")).toEqual(KEYS[KEY.SUBTRACT])
    expect(toKey("p")).toEqual(KEYS[KEY.ADD])
    expect(toKey("e")).toEqual(KEYS[KEY.EQUAL])
    expect(toKey(".")).toEqual(KEYS[KEY.DECIMAL])
    expect(toKey("0")).toEqual({
      label: "0",
      value: 0,
      escapedValue: "0",
      row: 1,
      col: 1,
    })
    expect(toKey("1")).toEqual(KEYS[KEY.ONE])
    expect(toKey("2")).toEqual(KEYS[KEY.TWO])
    expect(toKey("3")).toEqual(KEYS[KEY.THREE])
    expect(toKey("4")).toEqual(KEYS[KEY.FOUR])
    expect(toKey("5")).toEqual(KEYS[KEY.FIVE])
    expect(toKey("6")).toEqual(KEYS[KEY.SIX])
    expect(toKey("7")).toEqual(KEYS[KEY.SEVEN])
    expect(toKey("8")).toEqual(KEYS[KEY.EIGHT])
    expect(toKey("9")).toEqual(KEYS[KEY.NINE])
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
    expect(createUrl([KEYS[KEY.ZERO]!])).toEqual("/?f=0")
    expect(
      createUrl([
        KEYS[KEY.ONE]!,
        KEYS[KEY.TWO]!,
        KEYS[KEY.THREE]!,
        KEYS[KEY.FOUR]!,
        KEYS[KEY.FIVE]!,
        KEYS[KEY.SIX]!,
        KEYS[KEY.SEVEN]!,
        KEYS[KEY.EIGHT]!,
        KEYS[KEY.NINE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.SUBTRACT]!,
        KEYS[KEY.MULTIPLY]!,
        KEYS[KEY.DIVIDE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.CLEAR]!,
        KEYS[KEY.DECIMAL]!,
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
    expect(parseUrl("1p")).toEqual([[KEYS[KEY.ONE]!, KEYS[KEY.ADD]!]])
    expect(parseUrl("1p1")).toEqual([
      [KEYS[KEY.ONE]!, KEYS[KEY.ADD]!, KEYS[KEY.ONE]!],
    ])
    expect(parseUrl("1p1e")).toEqual([
      [KEYS[KEY.ONE]!, KEYS[KEY.ADD]!, KEYS[KEY.ONE]!, KEYS[KEY.EQUAL]!],
    ])
    expect(parseUrl("1p1e1")).toEqual([
      [
        KEYS[KEY.ONE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.ONE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.ONE]!,
      ],
    ])
    expect(parseUrl("1p1e1p1")).toEqual([
      [
        KEYS[KEY.ONE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.ONE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.ONE]!,
      ],
      [KEYS[KEY.ONE]!, KEYS[KEY.ADD]!, KEYS[KEY.ONE]!],
    ])
    expect(parseUrl("1p1c1p1e1")).toEqual([
      [
        KEYS[KEY.ONE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.ONE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.ONE]!,
      ],
    ])
    expect(parseUrl("1p1p1e1")).toEqual([
      [
        KEYS[KEY.ONE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.ONE]!,
        KEYS[KEY.ADD]!,
        KEYS[KEY.ONE]!,
        KEYS[KEY.EQUAL]!,
        KEYS[KEY.ONE]!,
      ],
    ])
  })
})
