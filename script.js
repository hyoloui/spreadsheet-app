const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

initSpreadsheet();

function initSpreadsheet() {
  for (let i = 0; i < ROWS; i += 1) {
    const row = [];
    for (let j = 0; j < COLS; j += 1) {
      let columnCode = String.fromCharCode(65 + j - 1);
      let cellData = "";
      let isHeader = false;
      let disabled = false;

      // 모든 셀의 첫번째 열에는 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      // 모든 셀의 첫번째 행에는 A, B, C, D, E, F, G, H, I, J
      if (i === 0) {
        cellData = columnCode;
        isHeader = true;
        disabled = true;
      }

      const rowName = i;
      let columnName = columnCode;

      // 0-0 에는 빈 문자열
      if (i === 0 && j === 0) cellData = "";
      if (j === 0) columnName = 0;

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      row.push(cell); // 0-0, 0-1, 0-2, ...
    }
    spreadsheet.push(row);
  }
  drawSheet();
  console.log(spreadsheet);
}

function createCellElement(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.onclick = () => handleCellClick(cell);

  return cellEl;
}

function handleCellClick(cell) {
  clearHeaderActiveStates();
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
  console.log(columnHeaderEl, rowHeaderEl);
}

function clearHeaderActiveStates() {
  const activeHeaderEls = document.querySelectorAll(".active");
  activeHeaderEls.forEach((el) => el.classList.remove("active"));
}

function getElFromRowCol(row, col) {
  return document.querySelector(`#cell_${row}${col}`);
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i += 1) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j += 1) {
      const cell = spreadsheet[i][j];
      const cellEl = createCellElement(cell);
      rowContainerEl.appendChild(cellEl);
    }

    spreadSheetContainer.appendChild(rowContainerEl);
  }
}
