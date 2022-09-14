import React from "react";
import Layout from "../../../components/Layout";
import ConfigProvider from "../../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";
import ResinStats from "../../../components/Statistics/ResinStats";
import TaskStats from "../../../components/Statistics/TaskStats";
import InfoText from "../../../components/Statistics/InfoText";
import { render, RenderProps } from "../../../utils/render";

const Statistics = ({ language, config }: RenderProps) => {
  return (
    <ConfigProvider initial={config} language={language}>
      <Layout title={["Statistics"]}>
        <VStack align="stretch" spacing={12}>
          <InfoText />
          <ResinStats />
          <TaskStats />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

render(Statistics).then();
