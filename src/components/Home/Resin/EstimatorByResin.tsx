import React, { memo, useMemo } from "react";
import { useConfig } from "../../../utils/config";
import { useServerTime } from "../../../utils/time";
import {
  getResinRecharge,
  ResinCap,
  ResinsPerMinute,
} from "../../../db/resins";
import { Duration } from "luxon";
import { FormattedMessage } from "react-intl";
import { formatResinRemainingTime } from "../../../utils/resin";

const EstimatorByResin = () => {
  const [resin] = useConfig("resin");
  const time = useServerTime(1000);

  const values = useMemo(() => {
    const currentResin =
      resin.value + getResinRecharge(time.valueOf() - resin.time);
    const result: { remainingTime: Duration; value: number }[] = [];

    const addValue = (value: number) => {
      const remainingResins = value - currentResin;
      const remainingTime = Duration.fromObject({
        minutes: remainingResins / ResinsPerMinute,
      });

      if (remainingResins > 0) {
        result.push({
          remainingTime,
          value,
        });
      }
    };

    for (let i = 20; i <= ResinCap; i += 20) {
      addValue(i);
    }

    return result;
  }, [resin, time]);

  return (
    <div>
      {values.map(({ remainingTime, value }) => (
        <div key={remainingTime.valueOf()}>
          <FormattedMessage
            defaultMessage="{value} in {time}"
            values={{
              value,
              time: formatResinRemainingTime(remainingTime, time, true),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(EstimatorByResin);
