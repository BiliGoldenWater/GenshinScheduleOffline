import React from "react";
import ConfigProvider from "../../../components/ConfigProvider";
import Layout from "../../../components/Layout";
import { Badge, chakra, HStack, Link, VStack } from "@chakra-ui/react";
import WhiteCard from "../../../components/WhiteCard";
import { getAssetByName } from "../../../assets";
import MaterialDisplay from "../../../components/Customize/WeaponInfo/MaterialDisplay";
import CommonMaterialDisplay from "../../../components/Customize/WeaponInfo/CommonMaterialDisplay";
import { Weapons, WeaponWiki } from "../../../db/weapons";
import NoteInput from "../../../components/Customize/WeaponInfo/NoteInput";
import {
  FormattedMessage,
  FormattedMessage as FormattedMessageId,
} from "react-intl";
import { DomainOfForgery } from "../../../db/domainCategories";
import { Language } from "../../../langs";
import LeakedWarning from "../../../components/Customize/LeakedWarning";
import { Config, DefaultConfig } from "../../../utils/config";
import { render } from "../../../utils/render";

type Props = {
  language: Language | null;
  data: Config;
};

const WeaponInfo = ({ language, data }: Props) => {
  const name = new URL(window.location.href).searchParams.get("name");
  const weapon = Weapons.find((weapon) => weapon.name === name);

  return (
    <ConfigProvider initial={data} language={language}>
      <Layout title={[weapon?.name || "Not Found"]}>
        {weapon ? (
          <VStack align="stretch" spacing={4}>
            {!weapon.leaked ? null : <LeakedWarning />}
            <WhiteCard divide>
              <HStack spacing={4}>
                <chakra.img
                  alt={weapon.name}
                  title={weapon.name}
                  src={getAssetByName(weapon.name)}
                  w={16}
                  h={16}
                  objectFit="cover"
                />

                <div>
                  <chakra.div fontSize="xl" fontWeight="bold">
                    <Link href={weapon.wiki} isExternal>
                      <FormattedMessageId id={weapon.name} />
                    </Link>
                  </chakra.div>

                  <Badge colorScheme={DomainOfForgery.colorHint}>
                    <Link href={WeaponWiki} isExternal>
                      <FormattedMessage defaultMessage="weapon" />
                    </Link>
                  </Badge>
                </div>
              </HStack>

              <MaterialDisplay weapon={weapon} material={weapon.material} />

              {weapon.commonMaterials.map((material) => (
                <CommonMaterialDisplay
                  key={material.name}
                  weapon={weapon}
                  material={material}
                />
              ))}

              <NoteInput weapon={weapon} />
            </WhiteCard>
          </VStack>
        ) : (
          <FormattedMessage defaultMessage="No such weapon." />
        )}
      </Layout>
    </ConfigProvider>
  );
};

render(WeaponInfo, { language: "en-US", data: DefaultConfig });
