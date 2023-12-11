import { useLoginModal, useRegisterModal } from "@/hooks";
import Modal from "../ui/modal";
import { useCallback, useState } from "react";

import { LoginForm } from "../forms";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = <LoginForm />;

  const footer = (
    <div className="text-neutral-400 text-center mb-4">
      <p>
        Don't have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      modalType="LOGIN"
    />
  );
};

export default LoginModal;
