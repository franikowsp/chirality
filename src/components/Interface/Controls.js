import React from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

import ControlCircle from "./ControlCircle";

import useInterfaceStore from "../../stores/useInterfaceStore";

export default function Controls() {
  // States
  const { add, toggleAdd, remove, toggleRemove } = useInterfaceStore(
    (state) => state
  );

  // State wire up
  const controlsArray = [
    // Add button
    {
      cx: 0,
      state: add,
      onClick: toggleAdd,
      icon: IoIosAddCircle,
    },
    // Delete button
    {
      cx: 75,
      state: remove,
      onClick: toggleRemove,
      icon: IoIosRemoveCircle,
    },
  ];

  return (
    <>
      {controlsArray.map((d, i) => {
        return (
          <React.Fragment key={`button-${i}`}>
            <ControlCircle {...d} />
          </React.Fragment>
        );
      })}
    </>
  );
}
