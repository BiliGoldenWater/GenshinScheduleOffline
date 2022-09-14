import React from "react";
import DomainList from "../../components/Home/DomainView";
import TaskList from "../../components/Home/Tasks";
import Resin from "../../components/Home/Resin";
import RealmCurrency from "../../components/Home/RealmCurrency";
import Clock from "../../components/Home/Clock";
import Layout from "../../components/Layout";
import ConfigProvider from "../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";
import { render, RenderProps } from "../../utils/render";

const Home = ({ language, config }: RenderProps) => {
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

render(Home).then();
