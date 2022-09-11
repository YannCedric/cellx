import { useStore } from "../../store";
import styles from "./Cell.module.scss";

interface Props {
  id: string;
}
export function Cell({ id }: Props) {
  const { setCellValue, setSelectedCell } = useStore(
    ({ getCell, setCellValue, setSelectedCell }) => ({
      getCell,
      setCellValue,
      setSelectedCell,
    })
  );

  const cell = useStore(({ getCell }) => getCell(id));

  return (
    <textarea
      id={cell.id}
      onClick={() => setSelectedCell(cell.id)}
      onFocus={() => setSelectedCell(cell.id)}
      className={styles.input}
      value={cell.value}
      onChange={(e) => setCellValue(id, e.target.value)}
    />
  );
}
