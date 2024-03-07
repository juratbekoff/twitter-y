"use client";

import { Bell, Home, Search, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SidebarAccount, SidebarItem, SidebarPostButton } from ".";

const Sidebar = () => {
  const { data: session, status }: any = useSession();

  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Explore",
      path: `/explore`,
      icon: Search,
    },
    {
      label: "Profile",
      path: `/profile/${
        status === "authenticated" && session?.currentUser?._id
      }`,
      icon: User,
    },
  ];

  return (
    <section className="max-md:hidden sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 px-1">
      <div className="flex flex-col justify-between space-y-2">
        <Link
          href={"/"}
          className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition"
        >
          <h1 className="font-bold text-4xl text-white">Y</h1>
        </Link>

        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem icon={item.icon} label={item.label} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>

      <SidebarAccount />
    </section>
  );
};

export default Sidebar;
