import { useEffect } from "react";
import { useStore, Direction } from "../../../store";

const DIRECTION_MAP: { [key: string]: Direction | null } = {
  ArrowRight: "r",
  ArrowLeft: "l",
  ArrowUp: "u",
  ArrowDown: "d",
};

export function useListeners() {
  const moveToNextCell = useStore(({ moveToNextCell }) => moveToNextCell);
  useEffect(() => {
    function handleKeyPress(ev: KeyboardEvent) {
      const direction = DIRECTION_MAP[ev.key];
      if (direction == null) {
        return;
      }

      ev.preventDefault();
      moveToNextCell(direction);
    }

    document.addEventListener("keydown", handleKeyPress);

    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveToNextCell]);
}
