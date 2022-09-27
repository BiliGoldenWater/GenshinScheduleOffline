import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Task, useConfig } from "../../utils/config";
import { FormattedMessage, useIntl } from "react-intl";
import { Eye, EyeOff } from "react-feather";
import { useTaskFocusSetter } from "../../utils/tasks";
import { motion } from "framer-motion";

const HideButton = ({
  task,
  setTask,
  rounded,
  alwaysShow,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  rounded?: boolean;
  alwaysShow?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const [compact] = useConfig("taskListCompact");

  const isVisible = task.visible;
  const setFocused = useTaskFocusSetter();
  const [hover, setHover] = useState(false);

  return (
    <motion.div animate={{ opacity: hover || alwaysShow ? 1 : 0 }}>
      <Tooltip
        label={
          isVisible ? (
            <FormattedMessage defaultMessage="Hide temporarily" />
          ) : (
            <FormattedMessage defaultMessage="Unhide" />
          )
        }
        closeOnClick={false}
      >
        <IconButton
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onBlur={() => setHover(false)}
          variant="ghost"
          color="gray.500"
          size={compact ? "xs" : "sm"}
          borderRadius={rounded ? "full" : undefined}
          minW={8}
          icon={<Icon as={isVisible ? Eye : EyeOff} fontSize="lg" />}
          aria-label={
            isVisible
              ? formatMessage({ defaultMessage: "Hide" })
              : formatMessage({ defaultMessage: "Show" })
          }
          onClick={() => {
            setTask((task) => ({
              ...task,
              visible: !isVisible,
            }));
            setFocused(task);
          }}
        />
      </Tooltip>
    </motion.div>
  );
};

export default memo(HideButton);
