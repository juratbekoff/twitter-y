import React from "react";
import { getServerSession } from "next-auth";

import Auth from "@/components/auth";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/auth-options";
import { Followbar } from "@/components/shared";
import { Sidebar } from "@/components/sidebar";
import { BottomBar } from "@/components/bottombar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="lg:container h-screen mx-auto lg:max-w-[1300px]">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1 max-md:border-none">
          {children}
          <Toaster />
        </div>

        <div className="hidden max-md:flex">
          <BottomBar />
        </div>

        <Followbar />
      </div>
    </div>
  );
};

export default RootLayout;
