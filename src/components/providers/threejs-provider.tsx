"use client";

import { ReactNode, createElement } from "react";
import { r3f } from "@/lib/threejs/global";

// export const ThreejsProvider = ({ children }: { children: ReactNode }) => {
//   return createElement(
//     "html",
//     { lang: "en" },
//     createElement(
//       "body",
//       { className: "fixed h-full w-full bg-blue-gray-50" },
//       children
//     )
//   );
// };

export const ThreejsProvider = ({ children }: { children: ReactNode }) => {
  return <r3f.In>{children}</r3f.In>;
};
