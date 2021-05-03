import React, { memo } from "react";
import { chakra, HStack, Icon, Select } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";
import { useConfig } from "../../../utils/config";
import { trackEvent } from "../../../utils/umami";
import { FormattedMessage, useIntl } from "react-intl";

const ResinEstimateModeSwitch = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = useConfig("resinEstimateMode");

  return (
    <HStack w="full" spacing={4}>
      <HStack spacing={2}>
        <Icon as={FaCalculator} />
        <div>
          <FormattedMessage id="resinEstMode" />
        </div>
      </HStack>

      <chakra.div w="full" maxW="xs">
        <Select
          value={value}
          onChange={({ currentTarget: { value } }) => {
            setValue(value as any);
            trackEvent("resinEstimateMode", value);
          }}
        >
          <option value="time">{formatMessage({ id: "resinEstTime" })}</option>
          <option value="value">{formatMessage({ id: "resinEstValue" })}</option>
        </Select>
      </chakra.div>
    </HStack>
  );
};

export default memo(ResinEstimateModeSwitch);
