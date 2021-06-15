import React, { memo } from "react";
import { createApiClient, User, WebData } from "../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../components/ConfigProvider";
import Layout from "../../components/Layout";
import Search from "../../components/Customize/Search";
import { VStack } from "@chakra-ui/react";
import CharacterList from "../../components/Customize/CharacterList";
import WeaponList from "../../components/Customize/WeaponList";
import ArtifactList from "../../components/Customize/ArtifactList";
import SettingsList from "../../components/Customize/SettingsList";

type Props = {
  user: User | null;
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
      user: client.authenticated ? await client.getSelf() : null,
      data: client.authenticated ? await client.getSync() : null,
    },
  };
};

const Customize = ({ user, data }: Props) => {
  return (
    <ConfigProvider initial={data}>
      <Layout title={["Customize"]}>
        <VStack align="stretch" spacing={16}>
          <Search />
          <CharacterList />
          <WeaponList />
          <ArtifactList />
          <SettingsList user={user || undefined} />
        </VStack>
      </Layout>
    </ConfigProvider>
  );
};

export default memo(Customize);
