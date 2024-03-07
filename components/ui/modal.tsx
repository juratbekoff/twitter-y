import { ReactElement } from "react";

import { Dialog, DialogContent } from "../ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen?: boolean;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalSteps?: number;
  onClose?: () => void;
  setStep?: any;
  modalType?: "REGISTER" | "LOGIN";
  isEditing?: boolean;
}

const Modal = ({
  body,
  footer,
  isOpen,
  step,
  totalSteps,
  onClose,
  setStep,
  modalType,
  isEditing,
}: ModalProps) => {
  const onCloseHandler = () => {
    if (onClose) {
      if (modalType === "LOGIN") {
        onClose();
      } else if (modalType === "REGISTER") {
        setStep(1);
        onClose();
      } else {
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseHandler}>
      <DialogContent
        className={cn(
          "bg-black p-1",
          isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
        )}
      >
        <div className="flex items-center gap-6">
          <button
            className="p-1 border-0 text-white hover:opacity-70 transition w-fit"
            onClick={onCloseHandler}
          >
            <X size={28} />
          </button>

          {step && (
            <span className="text-xl font-semibold">
              Step {step} of {totalSteps}
            </span>
          )}
        </div>

        <div className="px-5">
          <h1 className="text-3xl font-bold mt-5">
            {modalType === "REGISTER" ? "Create your account" : "Sign In"}
          </h1>
          <div className="mt-6">{body}</div>
          {footer && <div className="mt-4">{footer}</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
