import React, { memo } from "react";
import { Config, useConfig } from "../utils/config";
import { BackgroundKlee, BackgroundPaimon, BackgroundZhongli } from "../assets";
import { chakra } from "@chakra-ui/react";

const backgrounds: { [key in Config["background"]]?: string } = {
  paimon: BackgroundPaimon.src,
  klee: BackgroundKlee.src,
  zhongli: BackgroundZhongli.src,
};

const Background = () => {
  const [value] = useConfig("background");
  const src = backgrounds[value];

  if (!src) {
    return null;
  }

  return (
    <chakra.img
      src={src}
      position="fixed"
      pointerEvents="none"
      userSelect="none"
      zIndex={-10}
      opacity={0.05}
      top={0}
      right={0}
      w="full"
      h="full"
      maxW="xl"
      objectFit="contain"
      objectPosition="100% 100%"
    />
  );
};

export default memo(Background);
