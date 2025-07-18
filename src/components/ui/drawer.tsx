import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Drawer = DialogPrimitive.Root;
const DrawerTrigger =
  DialogPrimitive.Trigger;
const DrawerClose =
  DialogPrimitive.Close;

const DrawerTitle =
  DialogPrimitive.Title;

const DrawerContent = React.forwardRef<
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
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
      <DialogPrimitive.Title />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-white p-0 shadow-lg animate-in slide-in-from-bottom-10 w-full max-h-[80vh] h-[80vh] overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
DrawerContent.displayName =
  "DrawerContent";

const DrawerHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between px-4 h-20", // 48px高度，左右padding，底部分割线
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const DrawerDescription =
  React.forwardRef<
    React.ElementRef<
      typeof DialogPrimitive.Description
    >,
    React.ComponentPropsWithoutRef<
      typeof DialogPrimitive.Description
    >
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(
        "text-base text-gray-500 px-4 mb-2",
        className
      )}
      {...props}
    />
  ));
DrawerDescription.displayName =
  "DrawerDescription";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
};
