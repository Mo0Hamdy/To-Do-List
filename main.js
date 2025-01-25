let input = document.querySelector("input");
let btn = document.querySelector(".main");
let list = document.querySelector(".list");
let tasks = [];
let mode = "create";
let globalIndex = null;
if (localStorage.tasks != null) {
  tasks = JSON.parse(localStorage.tasks);
  display();
} else {
  tasks = [];
}

btn.addEventListener("click", function () {
  let task = input.value;
  if (task !== "") {
    if (mode === "create") {
      tasks.push(task);
    } else {
      //update mode
      tasks[globalIndex] = task;
      mode = "create";
      btn.innerHTML = "add task";
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
  input.value = "";
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
  // let done = document.querySelectorAll(".fa-check");
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
      mode = update;
      input.value = tasks[globalIndex];
    });
  });
  // done.forEach(element => {
  //   element.addEventListener("click",function(){
  //     element.style.cssText = `
  //     color:white;
  //     opacity: 1;
  //     font-size:20px;` 
  //   })
    
  // });
}

function Delete(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
}

document.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    let newItem = input.value;
    if (mode === "create") {
      if (newItem === "") {
      } else {
        tasks.push(newItem);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        display();
        input.value = "";
      }
    } else {
      tasks[globalIndex] = newItem;
      mode = "create";
      btn.innerHTML = "add task";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      display();
      input.value = "";
    }
  }
});
