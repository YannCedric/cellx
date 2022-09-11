import { useStore } from "../../store";
import { Cell } from "../Cell";
import { Outline } from "../Outline";
import styles from "./Grid.module.scss";
import { useListeners } from "./hooks";

export function Grid() {
  const cells = useStore(({ cells }) => cells);
  const { rows, cols } = useStore(({ rows, cols }) => ({ rows, cols }));

  useListeners();

  const selectedCellCoordinates = useStore(function (store) {
    if (store.selectedCell == null) return null;

    const rect = document
      .getElementById(store.selectedCell.id)
      ?.getBoundingClientRect();

    if (rect == null) return null;

    return {
      x: rect.top + window.scrollY,
      y: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    };
  });

  const outlineMarkup = selectedCellCoordinates ? (
    <Outline {...selectedCellCoordinates} />
  ) : null;

  const props = {
    "--rows": rows,
    "--cols": cols,
  } as React.CSSProperties;

  return (
    <div style={props} className={styles.grid}>
      {Object.keys(cells).map((id) => (
        <Cell key={id} id={id} />
      ))}
      {outlineMarkup}
    </div>
  );
}
