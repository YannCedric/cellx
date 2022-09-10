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

const DEFAULT_ROWS_COUNT = 10;

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

export function toId(id: string) {
  const col = id[0];
  const row = id.substring(1);

  if (!/^[A-Z]$/.test(col)) {
    throw new Error("Invalid id col: " + id);
  } else if (!/^\d+$/.test(row)) {
    throw new Error("Invalid id row: " + id);
  }

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
  getCell(id: string): Cell;
  setCellValue(id: string, val: string): void;
}

function generateDefaultCells() {
  const cells: Cells = {};

  for (const col of LETTERS) {
    for (let row = 1; row <= DEFAULT_ROWS_COUNT; row++) {
      const id = toCellKey(col, row);

      cells[id] = { id, selected: false, value: "", coordinates: { row, col } };
    }
  }

  return cells;
}

const DEFAULT_CELLS = generateDefaultCells();

export const useStore = create<Store>((set, get) => ({
  rows: LETTERS.length,
  cols: DEFAULT_ROWS_COUNT,
  cells: DEFAULT_CELLS,
  getCell(id: string) {
    return get().cells[toId(id)];
  },
  setCellValue(id: string, val: string) {
    const { cells } = get();
    cells[toId(id)].value = val;

    set({ cells: cells });
  },
}));
