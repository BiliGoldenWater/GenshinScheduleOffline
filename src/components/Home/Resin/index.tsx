import React, { memo, useCallback, useRef } from "react";
import WidgetWrapper from "../WidgetWrapper";
import WhiteCard from "../../WhiteCard";
import {
  getResinRecharge,
  ResinCap,
  ResinsPerCondensed,
  ResinsPerMinute,
  roundResin,
} from "../../../db/resins";
import SideButtons from "./SideButtons";
import EstimatorByTime from "./EstimatorByTime";
import EstimatorByResin from "./EstimatorByResin";
import { Config, useConfig, useCurrentStats } from "../../../utils/config";
import { Resin as ResinIcon } from "../../../assets";
import {
  Badge,
  Button,
  ButtonGroup,
  chakra,
  HStack,
  StackDivider,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useServerTime } from "../../../utils/time";
import { FormattedMessage, useIntl } from "react-intl";
import AutoSizeInput from "../../AutoSizeInput";
import { Duration } from "luxon";
import { formatResinRemainingTime } from "../../../utils/resin";

const estimateModes: Config["resinEstimateMode"][] = ["time", "value"];

const Resin = () => {
  const { formatMessage } = useIntl();
  const [resin, setResin] = useConfig("resin");
  const [, setStats] = useCurrentStats();
  const [mode, setMode] = useConfig("resinEstimateMode");

  const resinInput = useRef<HTMLInputElement>(null);

  const time = useServerTime(1000);
  const current = resin.value + getResinRecharge(time.valueOf() - resin.time);

  const applyResinOffset = useCallback(
    (offset: number) => {
      setResin({
        value: resin.value,
        time: resin.time + offset * 1000,
      });
    },
    [resin]
  );
  const condensedNum = Math.floor(current / ResinsPerCondensed);

  return (
    <WidgetWrapper
      type="resin"
      heading={<FormattedMessage defaultMessage="Resin Calculator" />}
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
          {condensedNum > 0 ? <Badge>{condensedNum}</Badge> : <></>}

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
            {current + 1 < ResinCap ? (
              (() => {
                const duration = Duration.fromObject({
                  minutes: (1 - (current % 1)) / ResinsPerMinute,
                });
                return (
                  <>
                    {" "}
                    -{" "}
                    <FormattedMessage
                      defaultMessage={"Next in {nextTime}"}
                      values={{
                        nextTime: formatResinRemainingTime(duration, time),
                      }}
                    />
                  </>
                );
              })()
            ) : (
              <></>
            )}
          </chakra.div>
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

          <HStack>
            <ButtonGroup isAttached>
              <Button
                color="gray.500"
                size="sm"
                onClick={() => {
                  applyResinOffset(1);
                }}
              >
                +1s
              </Button>
              <Button
                color="gray.500"
                size="sm"
                onClick={() => {
                  applyResinOffset(-1);
                }}
              >
                -1s
              </Button>
            </ButtonGroup>

            <SideButtons current={current} />
          </HStack>
        </VStack>
      </WhiteCard>
    </WidgetWrapper>
  );
};

export default memo(Resin);
