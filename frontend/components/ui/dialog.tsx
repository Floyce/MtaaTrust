"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{
    open: boolean
    onOpenChange: (open: boolean) => void
}>({
    open: false,
    onOpenChange: () => { },
})

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {

    // Support controlled state
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const isControlled = open !== undefined
    const finalOpen = isControlled ? open : uncontrolledOpen
    const finalOnOpenChange = isControlled ? onOpenChange : setUncontrolledOpen

    return (
        <DialogContext.Provider value={{ open: finalOpen ?? false, onOpenChange: finalOnOpenChange ?? (() => { }) }}>
            {finalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    {/* Overlay click to close */}
                    <div className="absolute inset-0" onClick={() => finalOnOpenChange?.(false)} />
                    {/* Content will be rendered by DialogContent, but we need to ensure it's here. 
                        Actually standard shadcn renders Content inside Portal. 
                        For this simple version, we render children.
                        BUT DialogContent uses fixed positioning. 
                        If we render children here, DialogTrigger will also be rendered here? No.
                    */}
                </div>
            )}
            {/* We render children (Trigger + Content). 
                Content needs to be visible only when open.
                My previous implementation was returning null if not open.
                But Trigger needs to be visible always.
            */}
            {children}
        </DialogContext.Provider>
    )
}

const DialogTrigger = ({ asChild, children }: { asChild?: boolean, children: React.ReactNode }) => {
    const { onOpenChange } = React.useContext(DialogContext)

    // If asChild is true, we need to clone the child and add onClick
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                // Call original onClick if exists
                (children.props as any).onClick?.(e);
                onOpenChange(true)
            }
        })
    }

    return <button onClick={() => onOpenChange(true)}>{children}</button>
}

const DialogContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { className?: string }
>(({ className, children, ...props }, ref) => {
    const { open } = React.useContext(DialogContext)
    if (!open) return null

    // We use Portal logic concept: fixed positioning relative to viewport.
    // Since we are rendering this component inside the tree, we just use fixed z-index.
    return (
        <div
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
DialogContent.displayName = "DialogContent"

// ... (Header, Footer, Title, Description remain mostly same)

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-slate-500", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext)

    return (
        <button
            ref={ref}
            onClick={(e) => {
                onClick?.(e)
                onOpenChange(false)
            }}
            className={className}
            {...props}
        />
    )
})
DialogClose.displayName = "DialogClose"

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
}
