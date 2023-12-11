"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";
import { useCallback, useState } from "react";

import { RegFormStepOne, RegFormStepTwo } from "../forms";
import { useLoginModal } from "@/hooks";

const RegisterModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent =
    step === 1 ? (
      <RegFormStepOne setData={setData} setStep={setStep} />
    ) : (
      <RegFormStepTwo stepOnedata={data} setStep={setStep} />
    );

  const footer = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
      setStep={setStep}
      modalType="REGISTER"
    />
  );
};

export default RegisterModal;
