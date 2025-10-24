import React from "react";
import HeaderContent from '@/components/header-content';
import SetLayout from "@/components/set-layout";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imgBg = '/blog-bg.webp';
  const extraClass = `md:w-[70%] max-md:w-[82%] max-md:min-w-[500px]`;
  return (
    <>
      <SetLayout extraClass={extraClass} pageScroll safeArea>
        <HeaderContent imgBg={imgBg}></HeaderContent>
        <div className="min-h-[70vh]">
          {children}
        </div>
      </SetLayout>
    </>
  );
}
