import React, {
  Dispatch,
  memo,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Task, useConfig } from "../../../utils/config";
import { CRS, Icon } from "leaflet";
import CardPopup from "../CardPopup";
import MarkerWrapper from "./MarkerWrapper";
import BackButton from "./BackButton";
import InfoPage from "./InfoPage";
import IconPage from "./IconPage";
import { getAssetByName } from "../../../assets";
import { HStack } from "@chakra-ui/react";
import TransparentPixel from "../../../assets/TransparentPixel.png";
import {
  applyPosOffset,
  posToLatLng,
  scalePosBy,
} from "../../../utils/mapPositionUtils";

export type PopupPage = "info" | "icon";
export const PopupPages: PopupPage[] = ["info", "icon"];

const TaskMarker = ({
  task,
  setTask,
  alwaysOpen,
  autoPan,
  showDue = true,
  onOpen,
  onClose,
  footer,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  alwaysOpen?: boolean;
  autoPan?: boolean;
  showDue?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  footer?: ReactNode;
}) => {
  const markerRef = useRef<any>(null);
  const popupRef = useRef<any>(null);

  const icon = useMemo(() => {
    return new Icon({
      iconUrl: getAssetByName(task.icon) || TransparentPixel,
      iconSize: [36, 36],
      className: "task-marker-icon",
    });
  }, [task.icon]);

  const [focused, setFocused] = useConfig("mapFocusedTask");
  const isFocused = focused === task.id;

  useEffect(() => {
    if (alwaysOpen || isFocused) {
      markerRef.current.openPopup();
    }
  }, [alwaysOpen, isFocused]);

  const [page, setPage] = useState<PopupPage>(PopupPages[0]);

  // region backward compatibility
  // @ts-ignore
  if (task.location != null) {
    // @ts-ignore
    let p = CRS.EPSG3395.latLngToPoint(task.location, 0);
    let pos = applyPosOffset(scalePosBy({ x: p.x, y: p.y }, 1.5));
    task.position = { x: pos.x - 388.61, y: pos.y - 271.8 };
    // need disable for debug
    // @ts-ignore
    task.location = undefined;
  }
  // endregion

  return (
    <MarkerWrapper
      task={task}
      markerRef={markerRef}
      position={posToLatLng(task.position)}
      icon={icon}
    >
      <CardPopup
        popupRef={popupRef}
        autoPan={autoPan}
        divide
        onOpen={() => {
          onOpen?.();
          setFocused(task.id);
        }}
        onClose={() => {
          onClose?.();
          isFocused && setFocused(false);
        }}
      >
        {useMemo(
          () =>
            page === "info" ? (
              <InfoPage
                task={task}
                setTask={setTask}
                setPage={setPage}
                showDue={showDue}
              />
            ) : page === "icon" ? (
              <IconPage setTask={setTask} setPage={setPage} />
            ) : null,
          [page, setTask, showDue, task]
        )}

        <HStack
          fontSize="sm"
          spacing={2}
          justify={page === "info" ? "flex-end" : undefined}
        >
          {page === "info" ? (
            footer
          ) : (
            <BackButton onClick={() => setPage("info")} />
          )}
        </HStack>
      </CardPopup>
    </MarkerWrapper>
  );
};

export default memo(TaskMarker);
