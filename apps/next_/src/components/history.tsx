"use client"

import { KEY, Key } from "@repo/data"
import { Card, CardBody, Divider } from "@repo/ui/NextUI"
import { Divide, Equal, Minus, Plus, Times } from "@repo/ui/icons/react"
import { isNumber, parseUrl } from "@repo/utils"
import { useSearchParams } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

export default function History() {
  const [history, setHistory] = useState<Key[][]>([])
  const searchParams = useSearchParams()

  useEffect(() => {
    const f = searchParams.get("f")
    if (f) {
      const h = parseUrl(f)
      setHistory(h)
    }
  }, [searchParams])

  return (
    <Card>
      <CardBody className="w-[400px] h-[400px] font-mono text-2xl tracking-widest block">
        <div className="inline-flex flex-col justify-end space-y-2 w-full">
          {history
            .filter((v, i) => i !== history.length - 1 || v.includes(KEY.EQUAL))
            .map((h, i) => (
              <Fragment key={i}>
                <div className="inline-flex items-center justify-end gap-1">
                  {h.map((key, j) => (
                    <Fragment key={j}>
                      {(isNumber(key) || key.label === ".") && (
                        <span>{key.label}</span>
                      )}
                      {!isNumber(key) && key === KEY.ADD && <Plus size={24} />}
                      {!isNumber(key) && key === KEY.SUBTRACT && (
                        <Minus size={24} />
                      )}
                      {!isNumber(key) && key === KEY.MULTIPLY && (
                        <Times size={24} />
                      )}
                      {!isNumber(key) && key === KEY.DIVIDE && (
                        <Divide size={24} />
                      )}
                      {!isNumber(key) && key === KEY.EQUAL && (
                        <Equal size={24} />
                      )}
                    </Fragment>
                  ))}
                </div>
                {i !== history.length - 1 && <Divider />}
              </Fragment>
            ))}
        </div>
      </CardBody>
    </Card>
  )
}
