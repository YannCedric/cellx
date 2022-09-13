import create from "zustand";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

export type Direction = "l" | "r" | "u" | "d";

const DEFAULT_ROWS_COUNT = 20;

type Col = typeof LETTERS[number];
type Row = number;
type CellKey = `${Col}${Row}`;

export interface Coordinate {
  row: Row;
  col: Col;
}

function toCellKey(col: Col, row: Row) {
  return `${col}${row}` as CellKey;
}

function toCoordinates(id: string): Coordinate {
  const col = id[0];
  const row = id.substring(1);

  if (!/^[A-Z]$/.test(col)) {
    throw new Error("Invalid id col: " + id);
  } else if (!/^\d+$/.test(row)) {
    throw new Error("Invalid id row: " + id);
  }

  return {
    col: col as Col,
    row: Number(row) as Row,
  };
}

function getSiblingRow(row: Row, side: 1 | -1) {
  let siblingRow = row + side;

  if (siblingRow === -1) siblingRow = DEFAULT_ROWS_COUNT;
  else if (siblingRow === DEFAULT_ROWS_COUNT + 1) siblingRow = 0;

  return siblingRow as Row;
}

function getSiblingCol(col: Col, side: 1 | -1) {
  let siblingCol =
    col.substring(0, col.length - 1) +
    String.fromCharCode(col.charCodeAt(col.length - 1) + side);

  if (siblingCol === "{") siblingCol = "A";
  else if (siblingCol === "]") siblingCol = "Z";

  return siblingCol as Col;
}

export function parseId(id: string) {
  const { col, row } = toCoordinates(id);

  return `${col}${row}` as CellKey;
}

interface Cell {
  id: CellKey;
  coordinates: Coordinate;
  value: string;
  selected: boolean;
}

interface Cells {
  [key: CellKey]: Cell;
}
interface Store {
  cols: number;
  rows: number;
  cells: Cells;
  selectedCell: Cell | null;
  setSelectedCell(id: string): void;
  moveToNextCell(direction: Direction): void;
  getCell(id: string): Cell;
  setCellValue(id: string, val: string): void;
}

function generateDefaultCells() {
  const cells: Cells = {};

  for (let row = 1; row <= DEFAULT_ROWS_COUNT; row++) {
    for (const col of LETTERS) {
      const id = toCellKey(col, row);

      cells[id] = { id, selected: false, value: "", coordinates: { row, col } };
    }
  }

  return cells;
}

const DEFAULT_CELLS = generateDefaultCells();

export const useStore = create<Store>((set, get) => ({
  rows: DEFAULT_ROWS_COUNT,
  cols: LETTERS.length,
  cells: DEFAULT_CELLS,
  selectedCell: null,
  moveToNextCell(direction: Direction) {
    const { selectedCell, setSelectedCell } = get();
    if (selectedCell == null) {
      setSelectedCell("A1");
    } else {
      const { col, row } = toCoordinates(selectedCell.id);
      let nextRow = row;
      let nextCol = col;

      if (direction == "l") nextCol = getSiblingCol(col, -1);
      else if (direction == "r") nextCol = getSiblingCol(col, +1);
      else if (direction == "u") nextRow = getSiblingRow(row, -1);
      else if (direction == "d") nextRow = getSiblingRow(row, +1);

      const nextId = `${nextCol}${nextRow}`;
      setSelectedCell(nextId);
      document.getElementById(nextId)?.focus();
    }
  },
  setSelectedCell(id: string | null) {
    if (id === null) {
      set({ selectedCell: null });
      return;
    }

    const selectedCell = get().selectedCell;
    if (id != selectedCell?.id) {
      const { cells } = get();
      const cell = cells[parseId(id)];

      set({ selectedCell: cell });
      return;
    }
  },
  getCell(id: string) {
    return get().cells[parseId(id)];
  },
  setCellValue(id: string, val: string) {
    const { cells } = get();
    cells[parseId(id)].value = val;

    set({ cells: cells });
  },
}));
