"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>
        {children}
        <ProgressBar
          height="4px"
          color="#2299DD"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </SessionProvider>
    </NextThemesProvider>
  );
}
