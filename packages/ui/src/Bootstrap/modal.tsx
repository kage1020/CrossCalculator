import { cn } from "@repo/utils"

type ModalProps = {
  className?: string
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function Modal({ className, title, actions, children }: ModalProps) {
  return (
    <div
      className={cn("modal fade", className)}
      id="modal"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          {actions && <div className="modal-footer">{actions}</div>}
        </div>
      </div>
    </div>
  )
}

type ModalOpenButtonProps = {
  className?: string
  children: React.ReactNode
}

export function OpenButton({ className, children }: ModalOpenButtonProps) {
  return (
    <button
      type="button"
      className={cn("btn btn-primary", className)}
      data-bs-toggle="modal"
      data-bs-target="#modal"
    >
      {children}
    </button>
  )
}

type ModalCloseButtonProps = ModalOpenButtonProps

export function CloseButton({ className, children }: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      className={cn("btn btn-secondary", className)}
      data-bs-dismiss="modal"
    >
      {children}
    </button>
  )
}
