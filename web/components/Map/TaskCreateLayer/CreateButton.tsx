import React, { memo } from "react";
import { useConfig } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { FaCheck } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

const CreateButton = () => {
  const time = useServerTime(1000);
  const [task, setTask] = useConfig("mapCreateTask");
  const [, setTasks] = useConfig("tasks");
  const [, setFocused] = useConfig("mapFocusedTask");

  return (
    <Link
      as="button"
      color={useColorModeValue("green.500", "green.300")}
      fontSize="sm"
      fontWeight="normal"
      onClick={() => {
        setTask((task) => ({ ...task, visible: false }));
        setTasks((tasks) => [...tasks, { ...task, dueTime: time.valueOf() }]);
        setFocused(false);

        trackEvent("map", "taskCreate");
      }}
    >
      <HStack spacing={2}>
        <Icon as={FaCheck} />
        <div>
          <FormattedMessage id="taskCreate" />
        </div>
      </HStack>
    </Link>
  );
};

export default memo(CreateButton);
