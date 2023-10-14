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
      let cellData = "";

      // 모든 셀의 첫번째 열에는 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      if (j === 0) {
        cellData = i;
      }
      // 모든 셀의 첫번째 행에는 A, B, C, D, E, F, G, H, I, J
      if (i === 0) {
        cellData = String.fromCharCode(65 + j - 1);
      }

      // 0-0 에는 빈 문자열
      if (i === 0 && j === 0) {
        cellData = "";
      }

      const cell = new Cell(false, false, cellData, i, j, false);
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
  return cellEl;
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
