import React from "react";

type AvatarName =
  | "zebra" | "rabbit" | "rhino" | "buffalo" | "crocodile"
  | "seal" | "pig" | "hippo" | "giraffe" | "ostrich"
  | "walrus" | "penguin" | "bear" | "snake" | "chicken"
  | "gecko" | "macaw" | "horse" | "elephant" | "duck"
  | "sloth" | "panda" | "blue_hippo" | "eagle" | "moose"
  | "gray_rhino" | "owl" | "gorilla" | "koala" | "camel";

type Props = {
  avatarName: AvatarName;
  size?: number;
};

const avatarMap: Record<AvatarName, { x: number; y: number }> = {
  zebra: { x: 0, y: 0 },
  rabbit: { x: 1, y: 0 },
  rhino: { x: 2, y: 0 },
  buffalo: { x: 3, y: 0 },
  crocodile: { x: 4, y: 0 },
  seal: { x: 0, y: 1 },
  pig: { x: 1, y: 1 },
  hippo: { x: 2, y: 1 },
  giraffe: { x: 3, y: 1 },
  ostrich: { x: 4, y: 1 },
  walrus: { x: 0, y: 2 },
  penguin: { x: 1, y: 2 },
  bear: { x: 2, y: 2 },
  snake: { x: 3, y: 2 },
  chicken: { x: 4, y: 2 },
  gecko: { x: 0, y: 3 },
  macaw: { x: 1, y: 3 },
  horse: { x: 2, y: 3 },
  elephant: { x: 3, y: 3 },
  duck: { x: 4, y: 3 },
  sloth: { x: 0, y: 4 },
  panda: { x: 1, y: 4 },
  blue_hippo: { x: 2, y: 4 },
  eagle: { x: 3, y: 4 },
  moose: { x: 4, y: 4 },
  gray_rhino: { x: 0, y: 5 },
  owl: { x: 1, y: 5 },
  gorilla: { x: 2, y: 5 },
  koala: { x: 3, y: 5 },
  camel: { x: 4, y: 5 }
};

export const GGAvatar: React.FC<Props> = ({ avatarName, size }) => {
  const spriteSize = 64;
  const coords = avatarMap[avatarName];

  if (!coords) return null;

  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    backgroundImage: "url('/images/sprites/square_nodetailsOutline.png')",
    backgroundSize: `${spriteSize * 5}px ${spriteSize * 6}px`,
    backgroundPosition: `-${coords.x * spriteSize}px -${coords.y * spriteSize}px`,
    backgroundRepeat: "no-repeat",
    borderRadius: 8
  };

  return <div style={style} />;
};
