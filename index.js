const inputTodo = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("todo-submit");
const saveTodoButton = document.getElementById("save-todo-btn");
let saveIndex = document.getElementById("saveIndex");

addTodoBtn.addEventListener("click", function () {
  if (inputTodo.value.trim() != 0) {
    let localTodos = JSON.parse(localStorage.getItem("localTodo"));
    if (localTodos === null) {
      todoList = [];
    } else {
      todoList = localTodos;
    }
    todoList.push(inputTodo.value);
    localStorage.setItem("localTodo", JSON.stringify(todoList));
  }
  showTodo();
});

function showTodo() {
  let localTodos = JSON.parse(localStorage.getItem("localTodo"));
  if (localTodos === null) {
    todoList = [];
  } else {
    todoList = localTodos;
  }
  let html = "";
  //   let itemShow = document.querySelector("#todos");
  let todo = document.getElementById("todos");
  todoList.forEach((data, index) => {
    html += `
    <div class="todoList">
   <div class="pText"> <p >${data}</p></div>
   <div class="btns">
   <button class="deleteTask" onClick="deleteItem(${index})">Delete</button>
   <button class="deleteTask" onClick="editItem(${index})">Edit</button></div>
    </div>
    `;
  });
  todo.innerHTML = html;
  //   itemShow.innerHTML = html;
}
showTodo();

function deleteItem(index) {
  let localTodos = JSON.parse(localStorage.getItem("localTodo"));
  todoList.splice(index, 1);
  localStorage.setItem("localTodo", JSON.stringify(todoList));
  showTodo();
}

function editItem(index) {
  saveIndex = index;
  let todo = localStorage.getItem("localTodo");
  todoList = JSON.parse(todo);
  inputTodo.value = todoList[index];
  saveTodoButton.style.display = "flex";
  addTodoBtn.style.display = "none";
}

saveTodoButton.addEventListener("click", () => {
  let todo = localStorage.getItem("localTodo");
  todoList = JSON.parse(todo);
  let id = saveIndex;
  console.log(id);
  todoList[id] = inputTodo.value;
  addTodoBtn.style.display = "flex";
  saveTodoButton.style.display = "none";
  inputTodo.value = "";
  localStorage.setItem("localTodo", JSON.stringify(todoList));
  showTodo();
});
