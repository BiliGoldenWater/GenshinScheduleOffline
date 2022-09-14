import React from "react";
import ConfigProvider from "../../components/ConfigProvider";
import Layout from "../../components/Layout";
import Search from "../../components/Customize/Search";
import { VStack } from "@chakra-ui/react";
import CharacterList from "../../components/Customize/CharacterList";
import WeaponList from "../../components/Customize/WeaponList";
import ArtifactList from "../../components/Customize/ArtifactList";
import SettingsList from "../../components/Customize/SettingsList";
import { Language } from "../../langs";
import { Config } from "../../utils/config";
import { render } from "../../utils/render";

type Props = {
  language: Language | null;
  data: Config | null;
};

const Customize = ({ language, data }: Props) => {
  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={["Customize"]}>
        <VStack align="stretch" spacing={16}>
          <Search />
          <CharacterList />
          <WeaponList />
          <ArtifactList />
          <SettingsList />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

render(Customize, { language: "en-US", data: null });
