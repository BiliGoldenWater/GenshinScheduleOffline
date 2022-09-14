import React from "react";
import DomainList from "../../components/Home/DomainView";
import TaskList from "../../components/Home/Tasks";
import Resin from "../../components/Home/Resin";
import RealmCurrency from "../../components/Home/RealmCurrency";
import Clock from "../../components/Home/Clock";
import Layout from "../../components/Layout";
import ConfigProvider from "../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";
import { Language } from "../../langs";
import { Config } from "../../utils/config";
import { render } from "../../utils/render";

type Props = {
  language: Language | null;
  config: Config | null;
};

const Home = ({ language, config }: Props) => {
  return (
    <ConfigProvider initial={config} language={language}>
      <Layout>
        <VStack align="stretch" spacing={16}>
          <Clock />
          <Resin />
          <RealmCurrency />
          <TaskList />
          <DomainList />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

render(Home, {
  language: "en-US",
  config: null,
});
