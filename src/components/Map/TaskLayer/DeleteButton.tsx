import React, { memo } from "react";
import { Task, useConfig } from "../../../utils/config";
import { HStack, Icon, Link } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Trash } from "react-feather";

const DeleteButton = ({ task }: { task: Task }) => {
  const [, setTasks] = useConfig("tasks");

  return (
    <Link
      as="button"
      fontSize="sm"
      onClick={() => {
        setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
      }}
    >
      <HStack spacing={2}>
        <Icon as={Trash} />
        <div>
          <FormattedMessage defaultMessage="Delete" />
        </div>
      </HStack>
    </Link>
  );
};

export default memo(DeleteButton);
