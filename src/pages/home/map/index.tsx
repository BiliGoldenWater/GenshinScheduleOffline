import React from "react";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import TaskListOverlay from "../../../components/MapPage/TaskListOverlay";
import HeaderOverlay from "../../../components/MapPage/HeaderOverlay";
import { chakra } from "@chakra-ui/react";
import { Language } from "../../../langs";
import { Config } from "../../../utils/config";
import MapCore from "../../../components/Map";
import { render } from "../../../utils/render";

type Props = {
  language: Language | null;
  data: Config | null;
};

const Map = ({ language, data }: Props) => {
  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={["Map"]} header={false} footer={false} background={false}>
        <HeaderOverlay />
        <TaskListOverlay />

        <chakra.div bg="gray.900">
          <MapCore
            style={{
              width: "100vw",
              height: "100vh",
            }}
          />
        </chakra.div>
      </Layout>
    </ConfigProvider>
  );
};

render(Map, { language: "en-US", data: null });
