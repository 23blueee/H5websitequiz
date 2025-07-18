import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";

interface CustomDialogProps {
  open: boolean;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  content: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  onOpenChange?: (
    open: boolean
  ) => void;
}

export const CustomDialog: React.FC<
  CustomDialogProps
> = ({
  open,
  imgSrc,
  imgAlt,
  title,
  description,
  content,
  buttonText,
  onButtonClick,
  onOpenChange,
}) => (
  <Dialog
    open={open}
    onOpenChange={onOpenChange}
  >
    <DialogContent className="flex flex-col justify-center items-center w-[300px] gap-4 p-8 bg-white rounded-2xl shadow-2xl">
      <VisuallyHidden>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </VisuallyHidden>
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-20 h-20 object-contain"
      />
      {content}
      <Button
        className="w-32 h-12 text-lg rounded-full"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </DialogContent>
  </Dialog>
);
