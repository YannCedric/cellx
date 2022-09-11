import classnames from "classnames";
import styles from "./Outline.module.scss";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Outline({ x, y, width, height }: Props) {
  const outlineProps = {
    "--x": x + "px",
    "--y": y + "px",
    "--width": width + "px",
    "--height": height + "px",
  } as React.CSSProperties;

  const buttonProps = {
    "--x": x + height - 5 + "px",
    "--y": y + width - 5 + "px",
    "--width": 8 + "px",
    "--height": 8 + "px",
  } as React.CSSProperties;

  return (
    <>
      <div
        style={outlineProps}
        className={classnames(styles.position, styles.outline)}
      />
      <div
        style={buttonProps}
        className={classnames(styles.position, styles.button)}
      />
    </>
  );
}
