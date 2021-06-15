import React, { memo } from "react";
import DomainList from "../../components/Home/DomainView";
import TaskList from "../../components/Home/Tasks";
import Resin from "../../components/Home/Resin";
import RealmCurrency from "../../components/Home/RealmCurrency";
import Clock from "../../components/Home/Clock";
import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";
import { createApiClient, WebData } from "../../utils/api";
import ConfigProvider from "../../components/ConfigProvider";
import { VStack } from "@chakra-ui/react";

type Props = {
  data: WebData | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const client = createApiClient(ctx);

  if (!client.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const Home = ({ data }: Props) => {
  return (
    <ConfigProvider initial={data}>
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

export default memo(Home);
