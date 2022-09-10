import { useStore } from "../../store";
import { Cell } from "../Cell";
import styles from "./Grid.module.scss";

export function Grid() {
  const { getCells } = useStore(({ getCells }) => ({ getCells }));

  return (
    <div className={styles.grid}>
      {getCells().map((cell) => (
        <Cell key={cell.id} {...cell.coordinates} />
      ))}
    </div>
  );
}
