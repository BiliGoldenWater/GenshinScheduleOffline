import React, { memo, useRef, useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import { getResinRecharge, ResinCap, roundResin } from "../../../db/resins";
import SideButtons from "./SideButtons";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByResin from "./EstimatorByResin";
import { Config, useConfig, useCurrentStats } from "../../../utils/config";
import { Resin as ResinIcon } from "../../../assets";
import {
  chakra,
  HStack,
  Icon,
  Link,
  Spacer,
  StackDivider,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useServerTime } from "../../../utils/time";
import EstimatorByNotifyMark from "./EstimatorByNotifyMark";
import { FormattedMessage, useIntl } from "react-intl";
import AutoSizeInput from "../../AutoSizeInput";
import { Bell } from "react-feather";

const estimateModes: Config["resinEstimateMode"][] = ["time", "value"];

const Resin = () => {
  const { formatMessage } = useIntl();
  const [resin, setResin] = useConfig("resin");
  const [, setStats] = useCurrentStats();
  const [mode, setMode] = useConfig("resinEstimateMode");
  const [notifyMark] = useConfig("resinNotifyMark");
  const [hover, setHover] = useState(false);
  const [isTouchDevice] = useMediaQuery("(any-pointer: coarse)");

  const resinInput = useRef<HTMLInputElement>(null);

  const time = useServerTime(60000);
  const current = resin.value + getResinRecharge(time.valueOf() - resin.time);

  return (
    <WidgetWrapper
      type="resin"
      heading={<FormattedMessage defaultMessage="Resin Calculator" />}
      onHover={setHover}
    >
      <WhiteCard>
        <HStack spacing={2}>
          <chakra.img
            alt="Resin"
            title={formatMessage({ defaultMessage: "Switch estimation mode" })}
            src={ResinIcon}
            w={10}
            h={10}
            cursor={current < ResinCap ? "pointer" : undefined}
            transform="scale(1.4)"
            onClick={() => {
              if (current >= ResinCap) {
                return;
              }

              setMode((mode) => {
                return estimateModes[
                  (estimateModes.indexOf(mode) + 1) % estimateModes.length
                ];
              });
            }}
          />

          <AutoSizeInput
            ref={resinInput}
            type="number"
            min={0}
            max={ResinCap}
            fontSize="xl"
            fontWeight="bold"
            value={roundResin(current).toString()}
            onClick={() => {
              resinInput.current?.select();
            }}
            onChange={({ currentTarget: { valueAsNumber } }) => {
              const oldValue = roundResin(current);
              const newValue = roundResin(valueAsNumber || 0);

              setResin({
                value: newValue,
                time: time.valueOf(),
              });

              setStats(
                (stats) =>
                  stats && {
                    ...stats,
                    resinsSpent: roundResin(
                      stats.resinsSpent - newValue + oldValue
                    ),
                  }
              );
            }}
          />

          <chakra.div flexShrink={0} fontSize="sm" color="gray.500">
            / {ResinCap}
          </chakra.div>

          <Spacer />

          <motion.div animate={{ opacity: hover || isTouchDevice ? 1 : 0 }}>
            <SideButtons current={current} />
          </motion.div>
        </HStack>

        <VStack
          align="start"
          spacing={2}
          color="gray.500"
          pl={12}
          fontSize="sm"
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.700")}
            />
          }
        >
          {current >= ResinCap ? (
            <chakra.span bg={useColorModeValue("yellow.100", "yellow.900")}>
              <FormattedMessage defaultMessage="Your resins are full." />
            </chakra.span>
          ) : mode === "time" ? (
            <EstimatorByTime />
          ) : mode === "value" ? (
            <EstimatorByResin />
          ) : null}

          {notifyMark !== ResinCap && current < notifyMark && (
            <HStack spacing={1} ml={-4}>
              <Icon as={Bell} w={3} fontSize="xs" />

              <Link href={"/src/pages/home/notifications/queue"}>
                <EstimatorByNotifyMark />
              </Link>
            </HStack>
          )}
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(Resin);
