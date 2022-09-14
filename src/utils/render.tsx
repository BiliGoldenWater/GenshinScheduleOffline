import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

export function render<T>(Element: (a: T) => JSX.Element, props: T) {
  const ele = document.getElementById("root")!;
  const root = createRoot(ele);

  root.render(
    <ChakraProvider>
      <ColorModeScript initialColorMode={"system"} />
      {/*@ts-ignore*/}
      <Element {...props} />
    </ChakraProvider>
  );
}
