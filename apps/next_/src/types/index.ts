export type ChildrenProps = Readonly<{
  children: React.ReactNode
}>

export type ClassNameProps = Readonly<{
  className?: string
}>

export type ComponentProps = ChildrenProps & ClassNameProps
