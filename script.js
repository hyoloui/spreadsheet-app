const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
  constructor(isHeader, disabled, data, row, column, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
  }
}

initSpreadsheet();

function initSpreadsheet() {
  for (let i = 0; i < ROWS; i += 1) {
    const row = [];
    for (let j = 0; j < COLS; j += 1) {
      const cell = new Cell(false, false, i + "-" + j, i, j, false);
      row.push(cell); // 0-0, 0-1, 0-2, ...
    }
    spreadsheet.push(row);
  }
  drawSheet();
  console.log(spreadsheet);
}

function createCellElement(cell) {
  const cellEl = document.createElement("input");
  cellEl.classname = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;
  return cellEl;
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i += 1) {
    for (let j = 0; j < spreadsheet[i].length; j += 1) {
      const cell = spreadsheet[i][j];
      const cellEl = createCellElement(cell);
      spreadSheetContainer.appendChild(cellEl);
    }
  }
}
