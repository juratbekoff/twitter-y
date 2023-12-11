import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Loader2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";

const SidebarAccount = () => {
  const { data, status }: any = useSession();

  if (status == "loading")
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin text-sky-500" />
      </div>
    );

  return (
    <>
      {/* DESKTOP SIDEBAR ACCOUNT */}
      <Popover>
        <PopoverTrigger className="w-full rounded-full hover:bg-slate-300 hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={data?.currentUser?.profileImage} />
                <AvatarFallback>{data?.currentUser?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>
                  {data?.currentUser?.name &&
                    sliceText(String(data?.currentUser?.name!), 15)}
                </p>
                {data?.currentUser?.username ? (
                  <p className="opacity-40">@{data?.currentUser?.username}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-black border-none rounded-2xl shadow shadow-white px-0 mb-3">
          <div
            className="font-bold text-red-500 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 p-4 transition"
            onClick={() => signOut()}
          >
            Log out{" "}
            {data?.currentUser?.username
              ? `@${data?.currentUser?.username}`
              : data?.currentUser?.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;
