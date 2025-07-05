let input = document.querySelector("input");
let btn = document.querySelector(".main");
let list = document.querySelector(".list");
let tasks = [];
let mode = "create";
let regex = /^[a-zA-Z0-9]+$/;
let globalIndex = null;
if (localStorage.tasks != null) {
  tasks = JSON.parse(localStorage.tasks);
  display();
}

btn.addEventListener("click", getData);

document.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    getData();
  }
});

function display() {
  let listItem = "";
  tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    listItem += `
    <div class = "item">
    <span>${tasks[i]}</span>
    <div class = "collect">
    <i class="fa-solid fa-trash" id ='${i}'></i>
    <i class="fa-solid fa-pen"   id ='${i}'></i>
    </div>
    </div>`;
  }

  list.innerHTML = listItem;
  let trash = document.querySelectorAll(".fa-trash");
  let update = document.querySelectorAll(".fa-pen");
  trash.forEach((element) => {
    element.addEventListener("click", function () {
      let index = element.getAttribute("id");
      Delete(index);
    });
  });
  update.forEach((element) => {
    element.addEventListener("click", function () {
      globalIndex = element.getAttribute("id");
      btn.innerHTML = "update";
      mode = "update";
      input.value = tasks[globalIndex];
    });
  });
}

function Delete(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
}

function getData() {
  let task = input.value;
  if (task.trim() !== "" && regex.test(task)) {
    if (mode === "create") {
      tasks.push(task);
    } else {
      tasks[globalIndex] = task;
      mode = "create";
      btn.innerHTML = "add task";
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
  input.value = "";
}
