let inputField;
let table;
let tableData;

const keyCodeObject = {
  altKey: false,
  ctrlKey: false,
  shiftKey: false,
  keyCode: 0,
  key: '',
};
const keyCodeResults = [];
let lastKeyCode = 0;

const setKeyEvent = (ev) => {
  const result = Object.assign({}, keyCodeObject);
  Object.keys(keyCodeObject).forEach((key) => {
    result[key] = ev[key];
  });

  lastKeyCode = result.keyCode;
  return result;
}

const renderIcon = (isEnabled) => {
  const addingClass = isEnabled ? 'enabled' : 'disabled';
  return `<i class="material-icons large ${addingClass}">check_circle</i>`;
}

const renderTableItem = (data) => {
  return `
  <tr class="table-primary">
    <td>${data.key}</td>
    <td>${data.keyCode}</td>
    <td>${renderIcon(data.ctrlKey)}</td>
    <td>${renderIcon(data.shiftKey)}</td>
    <td>${renderIcon(data.altKey)}</td>
  </tr>
  `
}

const renderTableData = () => {
  const renderHtml =  keyCodeResults.map((data) => {
    return renderTableItem(data);
  }).join('');

  tableData.innerHTML = renderHtml;
}

const pushObject = (object) => {
  keyCodeResults.push(object);
  if (keyCodeResults.length > 5) {
    keyCodeResults.shift();
  }
}

const initalizeTable = () => {
  if (keyCodeResults.length === 0) {
    tableData.innerHTML = `
    <tr class="table-primary">
      <td colspan="5">何かキーを入力してください。。。</td>
    </tr>
    `;
  }
}

const onKeyup = (ev) => {
  lastKeyCode = 0;
}

const onKeydown = (ev) => {
  if (lastKeyCode === ev.keyCode) return;

  const object = setKeyEvent(ev);
  pushObject(object);
  renderTableData();
};

const onLoad = () => {
  inputField = document.getElementById('KeyCode');
  table = document.getElementById('KeyCodeTable');

  tableData = document.getElementById('table-data');

  inputField.addEventListener('keydown', onKeydown);
  initalizeTable();
}

onLoad();