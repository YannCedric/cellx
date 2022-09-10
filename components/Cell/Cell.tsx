import { useStore } from "../../store";
import styles from "./Cell.module.scss";

interface Props {
  id: string;
}
export function Cell({ id }: Props) {
  const { setCellValue } = useStore(({ getCell, setCellValue }) => ({
    getCell,
    setCellValue,
  }));

  const cell = useStore(({ getCell }) => getCell(id));

  return (
    <textarea
      className={styles.input}
      value={cell.value}
      onChange={(e) => setCellValue(id, e.target.value)}
    />
  );
}
