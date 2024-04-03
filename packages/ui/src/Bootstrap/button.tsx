import { cn } from "@repo/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      danger: "btn-danger",
      warning: "btn-warning",
      info: "btn-info",
      light: "btn-light",
      dark: "btn-dark",
    },
    outline: {
      true: "",
    },
    size: {
      sm: "btn-sm",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    outline: false,
  },
  compoundVariants: [
    {
      variant: "primary",
      outline: true,
      className: "btn-outline-primary",
    },
    {
      variant: "secondary",
      outline: true,
      className: "btn-outline-secondary",
    },
    {
      variant: "success",
      outline: true,
      className: "btn-outline-success",
    },
    {
      variant: "danger",
      outline: true,
      className: "btn-outline-danger",
    },
    {
      variant: "warning",
      outline: true,
      className: "btn-outline-warning",
    },
    {
      variant: "info",
      outline: true,
      className: "btn-outline-info",
    },
    {
      variant: "light",
      outline: true,
      className: "btn-outline-light",
    },
    {
      variant: "dark",
      outline: true,
      className: "btn-outline-dark",
    },
  ],
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, outline, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, outline, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
