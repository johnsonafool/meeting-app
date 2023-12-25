"use client";

import {
  forwardRef,
  HTMLProps,
  ReactNode,
  Suspense,
  useImperativeHandle,
  useRef,
} from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  View as ViewImpl,
} from "@react-three/drei";
import { ExtendedColors, NodeProps, Overwrite } from "@react-three/fiber";
import * as THREE from "three";
import { ThreejsProvider } from "../providers/threejs-provider";

type TProps = HTMLProps<HTMLDivElement> & {
  children: ReactNode;
  orbit?: boolean;
};

type TRef = {
  ref: HTMLDivElement;
};

// environment
export const Common = ({
  color,
}: {
  color?: ExtendedColors<Overwrite<THREE.Color, NodeProps<THREE.Color, any>>>;
}) => (
  <Suspense fallback={null}>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={1} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <PerspectiveCamera makeDefault fov={45} position={[-4, 6, -4]} />
  </Suspense>
);

const View = forwardRef<TRef, TProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null) as any;

  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <ThreejsProvider>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </ThreejsProvider>
    </>
  );
});

View.displayName = "View";

export { View };
