let inputField;
let table;
let tableData;

const keyCodeResult = {
  altKey: false,
  ctrlKey: false,
  shiftKey: false,
  keyCode: 0,
  key: '',
};

const setKeyEvent = (ev) => {
  const result = Object.assign({}, keyCodeResult);
  Object.keys(keyCodeResult).forEach((key) => {
    result[key] = ev[key];
  });
  return result;
}

const renderIcon = (isEnabled) => {
  const addingClass = isEnabled ? 'enabled' : 'disabled';
  return `<i class="material-icons large ${addingClass}">check_circle</i>`;
}

const renderTableData = (data) => {
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

const onKeydown = (ev) => {
  const keyEvents = setKeyEvent(ev);
  const renderHtml = renderTableData(keyEvents);

  tableData.innerHTML = renderHtml;
};

const onLoad = () => {
  inputField = document.getElementById('KeyCode');
  table = document.getElementById('KeyCodeTable');

  tableData = document.getElementById('table-data');

  inputField.addEventListener('keydown', onKeydown);
}

onLoad();