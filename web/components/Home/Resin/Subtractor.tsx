import React, { memo } from "react";
import { useConfig, useCurrentStats } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import { clampResin, getResinRecharge } from "../../../db/resins";
import { trackEvent } from "../../../utils/umami";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";

const resinUsages = [60, 40, 30, 20];

const Subtractor = ({ current }: { current: number }) => {
  const time = useServerTime(1000);
  const [, setResin] = useConfig("resin");
  const [, setStats] = useCurrentStats();

  return (
    <ButtonGroup isAttached>
      {resinUsages.map(
        (value) =>
          current - value > 0 && (
            <SubtractButton
              key={value}
              value={value}
              onClick={() => {
                setResin((resin) => ({
                  value: clampResin(clampResin(resin.value + getResinRecharge(time.valueOf() - resin.time)) - value),
                  time: time.valueOf(),
                }));

                setStats((stats) => stats && { ...stats, resinsSpent: stats.resinsSpent + value });

                trackEvent("resin", `subtract${value}`);
              }}
            />
          )
      )}
    </ButtonGroup>
  );
};

const SubtractButton = ({ value, onClick }: { value: number; onClick: () => void }) => {
  useHotkeys(
    value.toString().slice(0, 1),
    (e) => {
      onClick();
      e.preventDefault();
    },
    [onClick]
  );

  return (
    <Button variant="ghost" color="gray.500" size="sm" p={0} onClick={onClick}>
      -{value}
    </Button>
  );
};

export default memo(Subtractor);
