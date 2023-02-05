import { DateTime, Duration } from "luxon";
import { useFormatDuration, useFormatTime } from "./time";

export function formatResinRemainingTime(
  remainingTime: Duration,
  currentTime: DateTime,
  targetTime?: boolean
) {
  return [
    useFormatDuration(remainingTime, ["hour", "minute", "second"]),
    targetTime
      ? `(${useFormatTime(currentTime.plus(remainingTime), [
          "hour",
          "minute",
          "second",
        ])})`
      : "",
  ].join(" ");
}
