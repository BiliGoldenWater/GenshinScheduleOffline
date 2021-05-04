import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { FaCheck, FaTimes } from "react-icons/fa";
import { trackEvent } from "../../../utils/umami";
import { HStack, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { useTaskDoneSetter, useTaskFocusSetter } from "../../../utils/tasks";
import { FormattedMessage } from "react-intl";

const DoneButton = ({ task, setTask }: { task: Task; setTask: Dispatch<SetStateAction<Task>> }) => {
  const time = useServerTime(1000);
  const due = time.valueOf() <= task.dueTime;
  const setDone = useTaskDoneSetter(setTask);
  const setFocused = useTaskFocusSetter();

  return (
    <Link
      as="button"
      color={useColorModeValue(due ? "red.500" : "green.500", due ? "red.300" : "green.300")}
      fontSize="sm"
      onClick={() => {
        setDone(!due);
        setFocused();

        trackEvent("map", due ? "taskDone" : "taskUndone");
      }}
    >
      <HStack spacing={2}>
        <Icon as={due ? FaTimes : FaCheck} />
        <div>{due ? <FormattedMessage id="taskDone" /> : <FormattedMessage id="taskUndone" />}</div>
      </HStack>
    </Link>
  );
};

export default memo(DoneButton);
