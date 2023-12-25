import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";

const gPics = [
  {
    url: `/gallery/2813.jpg`,
    position: [7.6, 1.3, 6.5],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
  },
  {
    url: `/gallery/2814.jpg`,
    position: [7.6, 1.3, 4.4],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.1,
  },
  {
    url: `/gallery/2815.jpg`,
    position: [7.6, 1.3, 2.4],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 2,
  },
  {
    url: `/gallery/2816.jpg`,
    position: [7.6, 1.3, 0.8],
    rotation: [0, Math.PI * 1.5, 0],
    scale: 1.5,
  },
  {
    url: `/gallery/2817.jpg`,
    position: [6.1, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
  },
  {
    url: `/gallery/2818.jpg`,
    position: [3.8, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 1.1,
  },
  {
    url: `/gallery/2819.jpg`,
    position: [2, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
  },
  {
    url: `/gallery/2820.jpg`,
    position: [0.5, 1.3, 7.5],
    rotation: [0, Math.PI * 1, 0],
    scale: 0.78,
  },
];

export const Gallery = () => {
  return (
    <>
      {gPics.map(({ url, position, rotation, scale }) => (
        <PictureFrame
          key={url}
          url={url}
          position={position as [number, number, number]}
          rotation={rotation as [number, number, number]}
          scale={scale}
        />
      ))}
    </>
  );
};

type PictureFrameProps = {
  url: string;
  pixelPerMeter?: number;
} & JSX.IntrinsicElements["mesh"];

const PictureFrame = ({ url, pixelPerMeter, ...props }: PictureFrameProps) => {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(TextureLoader, url);
  const [width, height] = [texture.image.width, texture.image.height];

  const pPerMeter = pixelPerMeter ?? 1000;

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry args={[width / pPerMeter, height / pPerMeter, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
