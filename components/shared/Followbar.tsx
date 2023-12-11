"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui";
import { User } from ".";
import { useUsers } from "@/hooks";
import { IUser } from "@/types";
import Link from "next/link";

const Followbar = () => {
  const { isLoading, users } = useUsers(7);

  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <Link href={"/explore"}>
            <Button
              label="See all"
              secondary
              classNames="h-[30px] p-0 w-fit px-3 text-sm"
            />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {users.map((user: IUser) => {
              return (
                <Link href={`/profile/${user._id}`}>
                  <User user={user} key={user._id} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followbar;
