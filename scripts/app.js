const $ = document;

// Sections
const nav = $.querySelector("nav");
const listContainer = $.getElementById("listContainer");
const nullList = $.getElementById("nullList");

// Buttons
const addTodoBtn = $.getElementById("addTodoBtn");
const clearListBtn = $.getElementById("clearListBtn");

// Input
const inputTodo = $.getElementById("addTodoInput");

// Storage
let todoList = [];

// loaded
window.onload = function () {
  let listStorage = JSON.parse(localStorage.getItem("list"));
  if (listStorage) todoList = listStorage;
  todoGenerator(todoList);
};

// Add Todo
function addTodo() {
  let inputValue = inputTodo.value;
  inputTodo.value = "";
  if (inputValue) {
    let todoItem = {
      id: todoList.length,
      title: inputValue,
      complete: false,
    };

    todoList.push(todoItem);
    setTodoData(todoList);
    todoGenerator(todoList);
  }

  inputTodo.focus();
}

function setTodoData(list) {
  localStorage.setItem("list", JSON.stringify(list));
}

function todoGenerator(list) {
  let newTodo, todoTitle, todoBtnBox, compeletTodoBtn, removeTodoBtn;

  if (list.length > 0) nullList.classList.add("d-none");
  else nullList.classList.remove("d-none");

  listContainer.innerHTML = "";

  list.forEach(function (item) {
    newTodo = $.createElement("div");
    newTodo.className =
      "alert alert-primary d-flex justify-content-between align-items-center";

    todoTitle = $.createElement("h4");
    todoTitle.innerHTML = item.title;

    todoBtnBox = $.createElement("div");

    compeletTodoBtn = $.createElement("button");
    compeletTodoBtn.className = "btn btn-primary";
    compeletTodoBtn.innerHTML = "انجام شد";
    compeletTodoBtn.onclick = function (e) {
      let listStorage = JSON.parse(localStorage.getItem("list"));

      listStorage.forEach(function (li) {
        if (li.id == item.id) {
          li.complete = !li.complete;
          item = li;
        }
      });

      setTodoData(listStorage);
      todoGenerator(listStorage);
    };

    removeTodoBtn = $.createElement("button");
    removeTodoBtn.className = "btn btn-outline-danger me-1";
    removeTodoBtn.innerHTML = "حذف";
    removeTodoBtn.onclick = function (e) {
      let listStorage = JSON.parse(localStorage.getItem("list"));

      let indexTodo = listStorage.findIndex(function (li) {
        return li.id == item.id;
      });

      listStorage.splice(indexTodo, 1);
      setTodoData(listStorage);
      todoGenerator(listStorage);
    };

    todoBtnBox.appendChild(compeletTodoBtn);
    todoBtnBox.appendChild(removeTodoBtn);

    newTodo.appendChild(todoTitle);
    newTodo.appendChild(todoBtnBox);

    if (item.complete) {
      newTodo.classList.replace("alert-primary", "alert-success");
      compeletTodoBtn.classList.add("disabled");
    }
    listContainer.appendChild(newTodo);
  });
}

// Clear List
function clearTodosList() {
  todoList = [];
  localStorage.removeItem("list");
  todoGenerator(todoList);
}

// Listener
addTodoBtn.addEventListener("click", addTodo);

inputTodo.addEventListener("keydown", function (e) {
  if (e.code == "Enter") addTodo();
});

clearListBtn.addEventListener("click", clearTodosList);

$.addEventListener("scroll", function () {
  if ($.documentElement.scrollTop > 170) nav.classList.add("nav");
  else nav.classList.remove("nav");
});

