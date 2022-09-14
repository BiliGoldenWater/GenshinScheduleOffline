import React from "react";
import ConfigProvider from "../../components/ConfigProvider";
import Layout from "../../components/Layout";
import Search from "../../components/Customize/Search";
import { VStack } from "@chakra-ui/react";
import CharacterList from "../../components/Customize/CharacterList";
import WeaponList from "../../components/Customize/WeaponList";
import ArtifactList from "../../components/Customize/ArtifactList";
import SettingsList from "../../components/Customize/SettingsList";
import { render, RenderProps } from "../../utils/render";

const Customize = ({ language, config }: RenderProps) => {
  return (
    <ConfigProvider initial={config} language={language}>
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

render(Customize).then();
