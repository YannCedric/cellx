import { useStore } from "../../store";
import { Cell } from "../Cell";
import styles from "./Grid.module.scss";

export function Grid() {
  const cells = useStore(({ cells }) => cells);

  return (
    <div className={styles.grid}>
      {Object.keys(cells).map((id) => (
        <Cell key={id} id={id} />
      ))}
    </div>
  );
}
