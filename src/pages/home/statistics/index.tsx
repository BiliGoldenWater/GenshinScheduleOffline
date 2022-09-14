import React from "react";
import Layout from "../../../components/Layout";
import ConfigProvider from "../../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";
import ResinStats from "../../../components/Statistics/ResinStats";
import TaskStats from "../../../components/Statistics/TaskStats";
import InfoText from "../../../components/Statistics/InfoText";
import { Language } from "../../../langs";
import { Config } from "../../../utils/config";
import { render } from "../../../utils/render";

type Props = {
  language: Language | null;
  data: Config | null;
};

const Statistics = ({ language, data }: Props) => {
  return (
    <ConfigProvider initial={data} language={language}>
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

render(Statistics, { language: "en-US", data: null });
