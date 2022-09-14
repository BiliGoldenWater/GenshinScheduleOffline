import React, { memo } from "react";
import { Heading, VStack } from "@chakra-ui/react";
import BackgroundSwitch from "./BackgroundSwitch";
import ConfigExportButton from "./ConfigExportButton";
import TaskDefaultZoomSlider from "./TaskDefaultZoomSlider";
import ThemeSwitch from "./ThemeSwitch";
import ResinNotifyMarkSlider from "./ResinNotifyMarkSlider";
import ResinEstimateModeSwitch from "./ResinEstimateModeSwitch";
import TaskListCompactSwitch from "./TaskListCompactSwitch";
import LanguageSwitch from "./LanguageSwitch";
import { FormattedMessage } from "react-intl";
import ResinCalcButtonInput from "./ResinCalcButtonInput";

const SettingsList = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="md">
        <FormattedMessage defaultMessage="Settings" />
      </Heading>

      <VStack align="start" spacing={4}>
        <ThemeSwitch />
        <TaskListCompactSwitch />
        <LanguageSwitch />
        <BackgroundSwitch />
        <ResinEstimateModeSwitch />
        <ResinCalcButtonInput />
        <ResinNotifyMarkSlider />
        <TaskDefaultZoomSlider />

        <ConfigExportButton />
      </VStack>
    </VStack>
  );
};

export default memo(SettingsList);
