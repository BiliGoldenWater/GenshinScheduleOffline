import React from "react";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import TaskListOverlay from "../../../components/MapPage/TaskListOverlay";
import HeaderOverlay from "../../../components/MapPage/HeaderOverlay";
import { chakra } from "@chakra-ui/react";
import MapCore from "../../../components/Map";
import { render, RenderProps } from "../../../utils/render";

const Map = ({ language, config }: RenderProps) => {
  return (
    <ConfigProvider initial={config} language={language}>
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

render(Map).then();
