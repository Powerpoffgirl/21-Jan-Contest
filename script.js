let todayTable = document.getElementById("todayTable");
let futureTable = document.getElementById("futureTable");
let completedTable = document.getElementById("completedTable");

const addItem1 = document.getElementById("addItem");
const iItemName = document.getElementById("iItemName");
const iItemDate = document.getElementById("iItemDate");
const iItemPriority = document.getElementById("iItemPriority");
const iItemCompleted = document.getElementById("iItemCompleted");
const iItemCheck = document.getElementById("iItemCheck");

addItem1.addEventListener("click", addItem);

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function addItem() {
  todoList.push({
    itemName: iItemName.value,
    itemDate: iItemDate.value,
    priority: iItemPriority.value,
  });

  localStorage.setItem("todoList", JSON.stringify(todoList));
  showData();
}

function showData() {
  todayTable.innerHTML = "";
  completedTable.innerHTML = "";
  futureTable.innerHTML = "";

  let date = new Date().toISOString().slice(0, 10);
  console.log(date);

  todoList.map((e, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${i + ". " + e.itemName}</td>
        <td>${e.itemDate}</td>
        <td>Priority: ${e.priority}</td>
        <td><input onclick="completedTask(${i})" type="radio"></input> <input onclick="removeData(${i})" type="checkbox"></input></td>
    `;
    if (e.itemDate == date) {
      todayTable.append(row);
    } else if (e.itemDate < date) {
      completedTable.append(row);
    } else {
      futureTable.append(row);
    }
  });

  console.log(todoList);
}

showData();

function removeData(i) {
  let deleted = todoList.filter((data, index) => {
    return index !== i;
  });
  localStorage.setItem("todoList", JSON.stringify(deleted));
  location.reload();
}

function completedTask(i) {
  console.log("Completed task");
  let completed = todoList.filter((data, index) => {
    return index == i;
  });
  let row = document.createElement("tr");
  row.innerHTML = `
        <td>${completed.iItemName}</td>
        <td>${completed.itemDate}</td>
        <td>Priority: ${completed.priority}</td>
        <td><input onclick="removeData(${i})" type="checkbox"></input></td>
    `;
  completedTable.append(row);
  console.log(completedTable);
  completedTable.append(JSON.stringify(completed));
}
