"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  label: string;
  isBack?: boolean;
}

const Header = ({ label, isBack }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full">
      <div className="flex flex-row p-5 items-center gap-4 border-b-[1px] border-neutral-800">
        {isBack && (
          <BiArrowBack
            onClick={handleBack}
            color={"white"}
            size={20}
            className={"cursor-pointer hover:opacity-70 transition"}
          />
        )}
        {!isBack && (
          <h1 className="text-white text-2xl font-semibold lg:hidden">Y</h1>
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
