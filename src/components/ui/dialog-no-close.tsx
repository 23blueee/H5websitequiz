import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger =
  DialogPrimitive.Trigger;
const DialogPortal =
  DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
  React.ElementRef<
    typeof DialogPrimitive.Overlay
  >,
  React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Overlay
  >
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName =
  DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<
    typeof DialogPrimitive.Content
  >,
  React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
  >
>(
  (
    { className, children, ...props },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-xs translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-background px-6 py-8 shadow-2xl mx-auto my-auto flex flex-col items-center justify-center gap-8",
          className
        )}
        onInteractOutside={(e) =>
          e.preventDefault()
        }
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);
DialogContent.displayName =
  DialogPrimitive.Content.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
};
