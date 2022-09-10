import { Coordinate, useStore } from "../../store";
import styles from "./Cell.module.scss";

export function Cell(coordinates: Coordinate) {
  const { setCellValue } = useStore(({ getCell, setCellValue }) => ({
    getCell,
    setCellValue,
  }));

  const cell = useStore(({ getCell }) => getCell(coordinates));

  return (
    <textarea
      className={styles.input}
      value={cell.value}
      onChange={(e) => setCellValue(cell.coordinates, e.target.value)}
    />
  );
}
