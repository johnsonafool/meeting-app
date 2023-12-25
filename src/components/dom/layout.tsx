"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/canvas/scene"), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [isMouted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMouted || typeof window === "undefined") {
    return null;
  }

  return (
    <div
      ref={ref as any}
      style={{
        position: "relative",
        width: " 100%",
        height: "100%",
        overflow: "auto",
        touchAction: "auto",
        zIndex: -10,
      }}
    >
      {children}
      <Scene
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
        eventSource={ref}
        eventPrefix="client"
      />
    </div>
  );
};

export { Layout };
