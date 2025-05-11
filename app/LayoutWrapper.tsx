"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import Header from "./components/header";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" />
      <div className="flex flex-col w-full">
        <Header />
        <main className="container mx-auto flex-1 max-w-7xl">{children}</main>
      </div>
    </HeroUIProvider>
  );
};
export default LayoutWrapper;
