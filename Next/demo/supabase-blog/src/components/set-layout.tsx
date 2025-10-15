import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  screenPage?: boolean;
  pageScroll?: boolean;
  safeArea?: boolean;
  isMedia?: boolean;
  extraClass : String,
  boxStyle?: React.CSSProperties;
}

export default function SetLayout({
  children,
  header,
  footer,
  screenPage = false,
  pageScroll = false,
  safeArea = false,
  boxStyle,
  extraClass = "",
}: RootLayoutProps) {
  return (
    <div
      className={`
        flex flex-col w-full m-auto
        ${screenPage ? "h-screen" : ""}
        ${pageScroll ? "min-h-screen" : ""}
        ${extraClass}
      `}
      style={boxStyle}
    >
      {header && (
        <div
          className={`shrink-0 w-full ${pageScroll ? "sticky z-[1] left-0 top-0" : ""}`}
        >
          {header}
        </div>
      )}

      <div className={`flex-1 w-full ${screenPage?'overflow-hidden':''}`}>{children}</div>

      {footer && (
        <div
          className={`
          shrink-0 w-full
          ${pageScroll ? "sticky left-0 bottom-0" : ""}
          ${safeArea ? "safe-area" : ""}
        `}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
