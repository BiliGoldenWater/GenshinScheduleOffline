debugger;
import React, { memo, useState } from "react";
import { Character } from "../../../db/characters";
import { CommonMaterial, CommonMaterialWiki } from "../../../db/commonMaterials";
import { FaPlus } from "react-icons/fa";
import { Badge, Button, chakra, HStack, Icon, Link, VStack } from "@chakra-ui/react";
import { getAssetByName } from "../../../assets";
import { useTaskCreator } from "../../../utils/tasks";
import { FormattedMessage, FormattedMessage as FormattedMessageId, useIntl } from "react-intl";

const CommonMaterialDisplay = ({ character, material }: { character: Character; material: CommonMaterial }) => {
  const { formatMessage, formatMessage: formatMessageId } = useIntl();
  const createTask = useTaskCreator();
  const [create, setCreate] = useState(false);

  return (
    <VStack align="start" spacing={4}>
      <HStack>
        <chakra.img alt={material.item} src={getAssetByName(material.item)} w={10} h={10} objectFit="contain" />

        <div>
          <chakra.div fontSize="lg">
            <Link href={material.wiki} isExternal>
              <FormattedMessageId id={material.name} />
            </Link>
          </chakra.div>

          <Badge color="gray.500">
            <Link href={CommonMaterialWiki} isExternal>
              <FormattedMessageId id={material.type} />
            </Link>
          </Badge>
        </div>
      </HStack>

      <Button
        size="sm"
        leftIcon={<Icon as={FaPlus} />}
        isLoading={create}
        onClick={async () => {
          setCreate(true);

          try {
            await createTask(
              material,
              formatMessage(
                { defaultMessage: "ascension material for {name}" },
                { name: formatMessageId({ id: character.name }) }
              )
            );
          } finally {
            setCreate(false);
          }
        }}
      >
        <FormattedMessage defaultMessage="Add as task" />
      </Button>
    </VStack>
  );
};

export default memo(CommonMaterialDisplay);
