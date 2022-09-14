import React, { memo, ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { Config, useConfig } from "../../../utils/config";
import {
  BlackArtifact,
  BlackCharacter,
  BlackWeapon,
  WhiteArtifact,
  WhiteCharacter,
  WhiteWeapon,
} from "../../../assets";
import { FormattedMessage } from "react-intl";

const FilterTypeButtons = () => {
  return (
    <ButtonGroup isAttached>
      <FilterButton
        type="character"
        label={<FormattedMessage defaultMessage="Characters" />}
        image={useColorModeValue(BlackCharacter, WhiteCharacter)}
      />

      <FilterButton
        type="weapon"
        label={<FormattedMessage defaultMessage="Weapons" />}
        image={useColorModeValue(BlackWeapon, WhiteWeapon)}
      />

      <FilterButton
        type="artifact"
        label={<FormattedMessage defaultMessage="Artifacts" />}
        image={useColorModeValue(BlackArtifact, WhiteArtifact)}
      />
    </ButtonGroup>
  );
};

const FilterButton = ({
  type,
  label,
  image,
}: {
  type: Config["domainFilterType"];
  label: ReactNode;
  image?: string;
}) => {
  const [filter, setFilter] = useConfig("domainFilterType");

  return (
    <Tooltip label={label} closeOnClick={false}>
      <Button
        as="button"
        variant="ghost"
        w={8}
        h={8}
        p={0}
        minW={0}
        onClick={() => {
          if (filter === type) {
            setFilter("all");
          } else {
            setFilter(type);
          }
        }}
      >
        {image && (
          <chakra.img
            src={image}
            w={5}
            transition=".2s"
            opacity={filter === type ? 1 : 0.3}
          />
        )}
      </Button>
    </Tooltip>
  );
};

export default memo(FilterTypeButtons);
