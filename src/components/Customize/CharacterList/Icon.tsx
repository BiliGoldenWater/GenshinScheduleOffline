import React, { memo } from "react";
import { Character } from "../../../db/characters";
import {
  AspectRatio,
  Badge,
  Center,
  chakra,
  HStack,
  Link,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import IconImage from "../IconImage";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const Icon = ({ character }: { character: Character }) => {
  return (
    <Link
      borderRadius="md"
      href={`/src/pages/customize/characters/?name=${character.name}`}
    >
      <AspectRatio ratio={5 / 6}>
        <VStack
          align="stretch"
          p={2}
          spacing={2}
          borderRadius="md"
          overflow="hidden"
          bg={useColorModeValue("white", "gray.900")}
          borderWidth={1}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          transition=".2s"
        >
          <Center minH={0} flex={1}>
            <IconImage
              name={character.name}
              h="full"
              borderRadius="full"
              objectFit="cover"
            />
          </Center>

          <VStack spacing={1}>
            <chakra.div fontSize="sm" fontWeight="500">
              <FormattedMessageId id={character.name} />
            </chakra.div>

            <Badge colorScheme={character.talentMaterial.colorHint}>
              <HStack spacing={1}>
                <chakra.img
                  alt={character.talentMaterial.item}
                  title={character.talentMaterial.item}
                  src={getAssetByName(character.talentMaterial.item)}
                  w={3}
                  h={3}
                />

                <div>
                  <FormattedMessageId id={character.talentMaterial.name} />
                </div>
              </HStack>
            </Badge>
          </VStack>
        </VStack>
      </AspectRatio>
    </Link>
  );
};

export default memo(Icon);
