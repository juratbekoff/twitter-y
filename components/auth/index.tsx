"use client";

import Image from "next/image";
import { Button } from "../ui";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback } from "react";
import { RegisterModal, LoginModal } from "../modals";
import { useLoginModal, useRegisterModal } from "@/hooks";
import { signIn } from "next-auth/react";

const Auth = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-2 gap-10 items-center  h-screen max-md:grid-cols-1 max-md:container max-md:h-[90vh]">
        <h1 className="text-white text-[400px] justify-self-center font-semibold select-none pointer-events-none max-md:text-9xl max-md:mt-10">
          Y
        </h1>
        <div className="flex flex-col justify-between h-[70vh] w-[70%] max-md:w-full ">
          <h1 className="text-6xl font-bold max-md:text-4xl max-md:text-center">
            is going now
          </h1>

          <div className="flex flex-col space-y-2 w-[70%] max-md:w-full">
            <h2 className="font-bold text-3xl mb-4 max-md:text-2xl">
              Join Today.
            </h2>

            {/* SignUp with Google */}
            <Button
              onClick={() => signIn("google")}
              label={
                <div className="flex gap-2 items-center justify-center">
                  <FcGoogle />
                  <span>Sign up with Google</span>
                </div>
              }
              fullWidth
              secondary
            />

            {/* SignUp with Github */}
            <Button
              onClick={() => signIn("github")}
              label={
                <div className="flex gap-2 items-center justify-center">
                  <AiFillGithub />
                  <span>Sign up with Github</span>
                </div>
              }
              fullWidth
              secondary
            />

            {/* SignUp with Email */}
            <div className="flex justify-center items-center">
              <div className="h-px bg-gray-500 w-1/2" />
              <span className="mx-4">or</span>
              <div className="h-px bg-gray-500 w-1/2" />
            </div>

            <Button
              onClick={onOpenRegisterModal}
              label="Create account"
              fullWidth
            />
          </div>

          {/* Create an account */}
          <div className="w-[70%] max-md:w-full">
            <h3 className="font-medium text-xl mb-4">
              Already have an account?
            </h3>
            <Button
              label="Sign in"
              fullWidth
              outline
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
