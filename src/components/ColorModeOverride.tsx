import React, { memo, ReactNode, useEffect } from "react";
import { useConfig } from "../utils/config";
import { DarkMode, useColorMode } from "@chakra-ui/color-mode";
import { Helmet } from "react-helmet";

const ColorModeOverride = ({ children }: { children?: ReactNode }) => {
  const [theme] = useConfig("theme");
  const { setColorMode } = useColorMode();

  useEffect(() => setColorMode(theme), [theme, setColorMode]);

  switch (theme) {
    case "light":
      return (
        <>
          <LightModeStyle />
          {children}
        </>
      );

    case "dark":
      return (
        // @ts-ignore
        <DarkMode>
          <DarkModeStyle />
          {children}
        </DarkMode>
      );
  }
};

const LightModeStyle = () => {
  return (
    <Helmet>
      <style>{`
        :root {
          --nprogress-color: var(--chakra-colors-blue-300);
        }
      `}</style>
    </Helmet>
  );
};

const DarkModeStyle = () => {
  return (
    <Helmet>
      <style>{`
        :root {
          --nprogress-color: white;
          --text-color: rgba(255, 255, 255, 0.92);
        }

        body {
          background-color: var(--chakra-colors-gray-900) !important;
          color: var(--text-color) !important;
        }
      `}</style>
    </Helmet>
  );
};

export default memo(ColorModeOverride);
