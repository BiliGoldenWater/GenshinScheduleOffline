import React, { Dispatch, memo, useRef, useState } from "react";
import { getAccuratestUnit, getUnitMs, ServerResetHour, TimeUnit } from "../../../../utils/time";
import { FaSyncAlt } from "react-icons/fa";
import { chakra, HStack, Icon, Input, Select } from "@chakra-ui/react";
import { Task } from "../../../../utils/config";
import { Duration } from "luxon";
import { FormattedMessage, useIntl } from "react-intl";

const IntervalPicker = ({ value, setValue }: { value: number; setValue: Dispatch<Task["refreshTime"]> }) => {
  const { formatMessage } = useIntl();
  const ref = useRef<HTMLInputElement>(null);
  const [unit, setUnit] = useState<TimeUnit>(() => getAccuratestUnit(Duration.fromMillis(value)));
  const displayValue = Math.floor(value / getUnitMs(unit));

  return (
    <HStack fontSize="sm" spacing={2}>
      <Icon as={FaSyncAlt} />
      <chakra.div flexShrink={0}>
        <FormattedMessage id="taskRespawn" />:
      </chakra.div>

      <Input
        ref={ref}
        type="number"
        variant="unstyled"
        size="sm"
        min={1}
        value={displayValue}
        onChange={({ currentTarget: { valueAsNumber } }) => {
          setValue((valueAsNumber || 1) * getUnitMs(unit));
        }}
        flex={1}
        minW={0}
        h={4}
        p={0}
        textAlign="right"
        borderRadius={0}
        onClick={() => ref.current?.select()}
      />

      <Select
        variant="unstyled"
        size="sm"
        w={20}
        h={4}
        value={unit}
        onChange={({ currentTarget: { value } }) => {
          switch (value) {
            case "reset":
              setValue("reset");
              break;

            default:
              setUnit(value as TimeUnit);
              break;
          }
        }}
      >
        {["week", "day", "hour", "minute"].map((unit) => (
          <option key={unit} value={unit}>
            {formatMessage({ id: `unit.${unit}` }, { value: displayValue })}
          </option>
        ))}

        <option value="reset">
          {formatMessage({ id: "serverReset" })} ({formatMessage({ id: "timeMorning" }, { time: ServerResetHour })})
        </option>
      </Select>
    </HStack>
  );
};

export default memo(IntervalPicker);
