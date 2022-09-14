import {
  ButtonGroup,
  chakra,
  HStack,
  Link,
  useColorModeValue,
  useToken,
  VStack,
} from "@chakra-ui/react";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task, useConfig } from "../../utils/config";
import DoneButton from "./DoneButton";
import { getAssetByName } from "../../assets";
import { useTaskFocusSetter } from "../../utils/tasks";
import { useIntl } from "react-intl";
import { useServerTime } from "../../utils/time";
import HideButton from "./HideButton";

const Item = ({
  task,
  setTask,
  onTaskClick,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  onTaskClick?: (task: Task) => void;
}) => {
  const { formatMessage } = useIntl();
  const time = useServerTime(60000);
  const [compact] = useConfig("taskListCompact");
  const [highlightColor] = useToken("colors", [
    useColorModeValue("yellow.100", "yellow.900"),
  ]);
  const [showHidden] = useConfig("taskListShowHidden");
  const setFocused = useTaskFocusSetter();

  const nameNode = (
    <Link
      as="button"
      fontSize="lg"
      fontWeight="bold"
      maxW="full"
      noOfLines={1}
      onClick={() => {
        setFocused(task);
        onTaskClick?.(task);
      }}
    >
      {task.name}
    </Link>
  );

  return (
    <HStack
      spacing={0}
      my={compact ? -2 : -1}
      opacity={task.visible && task.dueTime <= time.valueOf() ? 1 : 0.5}
    >
      <HStack
        spacing={2}
        bg={task.highlight ? highlightColor : undefined}
        borderRadius="sm"
        flex={1}
      >
        <chakra.img
          alt={task.icon}
          title={formatMessage({ defaultMessage: "Highlight task" })}
          src={getAssetByName(task.icon)}
          w={compact ? 6 : 10}
          h={compact ? 6 : 10}
          objectFit="contain"
          flexShrink={0}
          cursor="pointer"
          onClick={() => {
            setTask((task) => ({
              ...task,
              highlight: !task.highlight,
            }));
          }}
        />

        {compact ? (
          <chakra.div minW={0}>
            {nameNode}
            {task.description && (
              <chakra.span color="gray.500" wordBreak="break-word">
                <span> &mdash; </span>
                {task.description}
              </chakra.span>
            )}
          </chakra.div>
        ) : (
          <VStack align="start" spacing={0} flex={1} noOfLines={1}>
            {nameNode}
            {task.description && (
              <chakra.span
                fontSize="sm"
                color="gray.500"
                maxW="full"
                noOfLines={1}
              >
                {task.description}
              </chakra.span>
            )}
          </VStack>
        )}
      </HStack>

      <chakra.div flexShrink={0}>
        <ButtonGroup>
          {showHidden && <HideButton task={task} setTask={setTask} />}
          <DoneButton task={task} setTask={setTask} rounded />
        </ButtonGroup>
      </chakra.div>
    </HStack>
  );
};

export default memo(Item);
