import React, { memo } from "react";
import {
  AspectRatio,
  Center,
  chakra,
  Link,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import IconImage from "../IconImage";
import { Artifact } from "../../../db/artifacts";
import { FormattedMessage as FormattedMessageId } from "react-intl";

const Icon = ({ artifact }: { artifact: Artifact }) => {
  return (
    <Link
      borderRadius="md"
      href={`/src/pages/customize/artifacts/?name=${artifact.name}`}
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
            <IconImage name={artifact.name} h="full" objectFit="contain" />
          </Center>

          <chakra.div
            noOfLines={1}
            textAlign="center"
            maxW="100%"
            fontSize="sm"
            fontWeight="500"
          >
            <FormattedMessageId id={artifact.name} />
          </chakra.div>
        </VStack>
      </AspectRatio>
    </Link>
  );
};

export default memo(Icon);
