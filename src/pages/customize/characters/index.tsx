import React from "react";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Characters, CharacterWiki } from "../../../db/characters";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import MaterialDisplay from "../../../components/Customize/CharacterInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../../components/Customize/CharacterInfo/CommonMaterialDisplay";
import NoteInput from "../../../components/Customize/CharacterInfo/NoteInput";
import { FormattedMessage } from "react-intl";
import { DomainOfMastery } from "../../../db/domainCategories";
import { Language } from "../../../langs";
import LeakedWarning from "../../../components/Customize/LeakedWarning";
import { Config, DefaultConfig } from "../../../utils/config";
import { render } from "../../../utils/render";

type Props = {
  language: Language | null;
  data: Config;
};

const CharacterInfo = ({ language, data }: Props) => {
  const name = new URL(window.location.href).searchParams.get("name");
  const character = Characters.find((character) => character.name === name);

  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={[character?.name || "Not Found"]}>
        {character ? (
          <VStack align="stretch" spacing={4}>
            {!character.leaked ? null : <LeakedWarning />}

            <WhiteCard divide>
              <HStack spacing={4}>
                <chakra.img
                  alt={character.name}
                  title={character.name}
                  src={getAssetByName(character.name)}
                  w={16}
                  h={16}
                  borderRadius="full"
                />

                <div>
                  <chakra.div fontSize="xl" fontWeight="bold">
                    <Link href={character.wiki} isExternal>
                      <FormattedMessage id={character.name} />
                    </Link>
                  </chakra.div>

                  <Badge colorScheme={DomainOfMastery.colorHint}>
                    <Link href={CharacterWiki} isExternal>
                      <FormattedMessage defaultMessage="character" />
                    </Link>
                  </Badge>
                </div>
              </HStack>

              {character.materials[0] && (
                <MaterialDisplay
                  character={character}
                  material={character.materials[0]}
                  listName="charactersGem"
                />
              )}

              {character.materials[1] && (
                <MaterialDisplay
                  character={character}
                  material={character.materials[1]}
                  listName="charactersNormalBoss"
                />
              )}

              <MaterialDisplay
                character={character}
                material={character.talentMaterial}
                listName="characters"
              />

              <MaterialDisplay
                character={character}
                material={character.talentMaterialWeekly}
                listName="charactersWeekly"
              />

              {character.commonMaterials.map((material) => (
                <CommonMaterialDisplay
                  key={material.name}
                  character={character}
                  material={material}
                />
              ))}

              <NoteInput character={character} />
            </WhiteCard>
          </VStack>
        ) : (
          <FormattedMessage defaultMessage="No such character." />
        )}
      </Layout>
    </ConfigProvider>
  );
};

render(CharacterInfo, { language: "en-US", data: DefaultConfig });
