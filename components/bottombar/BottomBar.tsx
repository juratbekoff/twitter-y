"use client";

import { HomeIcon, Search, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { RiLogoutCircleLine } from "react-icons/ri";

const BottomBar = () => {
  const { data: session, status }: any = useSession();

  const bottombarItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      label: "Explore",
      path: `/explore`,
      icon: <Search />,
    },
    {
      label: "Profile",
      path: `/profile/${
        status === "authenticated" && session?.currentUser?._id
      }`,
      icon: <User />,
    },
  ];

  return (
    <div className="fixed left-0 right-0 bottom-0 bg-black py-2">
      <div className="flex justify-between w-full gap-2 px-5 py-2">
        {bottombarItems.map((item) => {
          return (
            <Link href={item.path} key={item.label}>
              {item.icon}
            </Link>
          );
        })}

        {/* MOBILE SIDEBAR ACCOUNT
        <div className="lg:hidden block">
          <div onClick={() => signOut()}>
            <RiLogoutCircleLine size={24} color={"crimson"} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BottomBar;
