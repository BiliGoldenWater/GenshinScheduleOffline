import React, { memo } from "react";
import { createApiClient, WebData } from "../../../utils/api";
import { GetServerSideProps } from "next";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Characters, CharacterWiki } from "../../../db/characters";
import { chakra, HStack, Link } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import MaterialDisplay from "../../../components/Customize/CharacterInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../../components/Customize/CharacterInfo/CommonMaterialDisplay";
import NoteInput from "../../../components/Customize/CharacterInfo/NoteInput";
import { FormattedMessage } from "react-intl";

type Props = {
  data: WebData | null;
  name: string | null;
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

  const character = Characters.find((character) => character.name === ctx.query.name);

  if (!character) {
    ctx.res.statusCode = 404;
  }

  return {
    props: {
      data: client.authenticated ? await client.getSync() : null,
      name: character?.name || null,
    },
  };
};

const CharacterInfo = ({ data, name }: Props) => {
  const character = Characters.find((character) => character.name === name);

  return (
    <ConfigProvider initial={data}>
      <Layout title={[character?.name || "Not Found"]}>
        {character ? (
          <WhiteCard divide>
            <HStack spacing={4}>
              <chakra.img alt={character.name} src={getAssetByName(character.name)} w={16} h={16} borderRadius="full" />

              <div>
                <chakra.div fontSize="xl" fontWeight="bold">
                  <Link href={character.wiki} isExternal>
                    {character.name}
                  </Link>
                </chakra.div>
                <chakra.div fontSize="sm" color="gray.500">
                  <Link href={CharacterWiki} isExternal>
                    {character.type}
                  </Link>
                </chakra.div>
              </div>
            </HStack>

            {character.talentMaterialWeekly.map((material) => (
              <MaterialDisplay key={material.name} character={character} material={material} isWeekly />
            ))}

            {character.talentMaterials.map((material) => (
              <MaterialDisplay key={material.name} character={character} material={material} />
            ))}

            {character.commonMaterials.map((material) => (
              <CommonMaterialDisplay key={material.name} character={character} material={material} />
            ))}

            <NoteInput character={character} />
          </WhiteCard>
        ) : (
          <FormattedMessage id="characterNotFound" />
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default memo(CharacterInfo);
