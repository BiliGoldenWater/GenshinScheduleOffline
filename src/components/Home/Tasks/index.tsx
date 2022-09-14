import React, { memo, useCallback, useRef } from "react";
import WidgetWrapper from "../WidgetWrapper";
import { useDueTasks, useFilteredTasks } from "../../../utils/tasks";
import TaskListCard from "../../TaskListCard";
import MarkAllDone from "./MarkAllDone";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  ButtonGroup,
  chakra,
  HStack,
  Icon,
  Link,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import SearchButton from "./SearchButton";
import { useHotkeys } from "react-hotkeys-hook";
import { useConfig } from "../../../utils/config";
import ShowHiddenButton from "./ShowHiddenButton";
import { FormattedMessage } from "react-intl";
import { ChevronRight } from "react-feather";
import ShowDoneButton from "./ShowDoneButton";
import { useServerTime } from "../../../utils/time";

import MapCore from "../../Map";

const TaskList = () => {
  const time = useServerTime(60000);
  const [tasks] = useConfig("tasks");
  const dueTasks = useDueTasks(useFilteredTasks(tasks));
  const mapRef = useRef<HTMLDivElement>(null);
  const [showHidden] = useConfig("taskListShowHidden");

  const scrollToMap = useCallback(() => {
    mapRef.current?.scrollIntoView({
      block: "center",
    });
  }, []);

  useHotkeys(
    "n",
    (e) => {
      scrollToMap();
      e.preventDefault();
    },
    [scrollToMap]
  );

  return (
    <WidgetWrapper
      type="tasks"
      heading={
        <span>
          <FormattedMessage defaultMessage="Today's Tasks" />
          {!!dueTasks.length && <span> ({dueTasks.length})</span>}
        </span>
      }
      menu={
        <ButtonGroup isAttached>
          {!!tasks.length && <SearchButton />}
          {(tasks.find((task) => !task.visible) || showHidden) && (
            <ShowHiddenButton />
          )}
          {tasks.find((task) => time.valueOf() < task.dueTime) && (
            <ShowDoneButton />
          )}
        </ButtonGroup>
      }
    >
      <VStack align="stretch" spacing={4}>
        {dueTasks.length ? (
          <VStack align="stretch" spacing={2}>
            <TaskListCard onItemClick={scrollToMap} />

            <chakra.div textAlign="right">
              <MarkAllDone />
            </chakra.div>
          </VStack>
        ) : (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <VStack align="start" spacing={0}>
              <AlertTitle>
                <FormattedMessage defaultMessage="No tasks for now." />
              </AlertTitle>
              <div>
                <FormattedMessage defaultMessage="Create one by clicking on the map." />
              </div>
            </VStack>
          </Alert>
        )}

        <VStack align="stretch" spacing={2}>
          <chakra.div
            ref={mapRef}
            h="md"
            bg={useColorModeValue("white", "gray.900")}
            overflow="hidden"
            borderRadius="md"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderWidth={1}
          >
            <MapCore
              minimal
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </chakra.div>

          <HStack justify="flex-end">
            <Link fontSize="sm" href={"/src/pages/home/map/"}>
              <HStack spacing={2}>
                <div>
                  <FormattedMessage defaultMessage="Open map" />
                </div>
                <Icon as={ChevronRight} />
              </HStack>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </WidgetWrapper>
  );
};

export default memo(TaskList);
