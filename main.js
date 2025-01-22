let input = document.querySelector("input");
let btn = document.querySelector(".main");
let list = document.querySelector(".list");
let tasks = [];
let mode = "create";
// let index2;
if (localStorage.tasks != null) {
  tasks = JSON.parse(localStorage.tasks);
  display();
} else {
  tasks = [];
}

btn.addEventListener("click", function () {
  // if (mode === "create")
  // {
    let task = input.value;
    if (task !== "") {
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      display();
      input.value = "";
  // }
  // else{ //update mode
  //   tasks[index2]=input.value;
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   display()
  // }
  }
});

function display() {
  let listItem = "";
  tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    listItem += `
    <div class = "item">
    <span>${tasks[i]}</span>
    <i class="fa-solid fa-trash" id ='${i}'></i>
    </div>`;
  }
  
  list.innerHTML = listItem;
  let trash = document.querySelectorAll(".fa-trash");
  let update = document.querySelectorAll(".second")
  trash.forEach((element) => {
    element.addEventListener("click", function () {
      let index = element.getAttribute("id");
      Delete(index);
    });
  });
  // update.forEach(element => {
  //   element.addEventListener("click",function(){
  //     mode = "update"
  //     let index = element.getAttribute("id");
  //     index2 = index;
  //     input.value = tasks[index];
  //     btn.innerHTML = "update";
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
    if (newItem === "") {
    } else {
      tasks.push(newItem);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      display();
      input.value = "";
    }
  }
});

