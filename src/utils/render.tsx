import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Config, DefaultConfig } from "./config";
import { Language, LanguageAliases } from "../langs";
import { Helmet } from "react-helmet";

const defaultLang =
  window.navigator.languages
    .map((it) => LanguageAliases[it])
    .filter((it) => it)[0] || "en-US";

export type RenderProps = {
  language: Language;
  config: Config;
};

export async function render<T extends RenderProps>(
  Element: (a: T) => JSX.Element,
  props?: T
) {
  const ele = document.getElementById("root")!;
  const root = createRoot(ele);

  // region read config
  let cfg_obj;
  try {
    // @ts-ignore
    if (window.__TAURI_IPC__) {
      // tauri
      let { readTextFile, BaseDirectory } = await import("@tauri-apps/api/fs");
      const cfg = await readTextFile("config.json", {
        dir: BaseDirectory.App,
      });
      cfg_obj = JSON.parse(cfg);
    } else {
      // localStorage
      const cfg = window.localStorage.getItem("config") || "";
      cfg_obj = JSON.parse(cfg);
    }
  } catch (e) {
    cfg_obj = DefaultConfig;
  }
  // endregion

  if (cfg_obj == null) cfg_obj = DefaultConfig;
  const lang = cfg_obj.language === "default" ? defaultLang : cfg_obj.language;

  const p: RenderProps = { ...props, config: cfg_obj, language: lang };

  root.render(
    <ChakraProvider>
      <Helmet>
        <style>{`
        @font-face {
          font-family: "Genshin";
          src: URL("/fonts/Genshin.woff") format("truetype");
        }
        `}</style>
      </Helmet>
      <ColorModeScript initialColorMode={"system"} />
      {/*@ts-ignore*/}
      <Element {...p} />
    </ChakraProvider>
  );
}
