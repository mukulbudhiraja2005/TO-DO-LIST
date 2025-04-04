
let themebtn = document.querySelector("#themeselector");
let btn2 = document.querySelector("#addtask");
let input = document.querySelector("input");
let ul = document.querySelector("#tasklist");

// Theme toggle button
themebtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Save selected theme to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.setItem("theme", "light-mode");
    }
});

// Load everything on page load
document.addEventListener("DOMContentLoaded", function () {
    // Load theme from localStorage
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-mode");
    }

    // Load tasks from localStorage
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        try {
            savedTasks = JSON.parse(savedTasks);
            if (Array.isArray(savedTasks)) {
                savedTasks.forEach(task => createTaskElement(task));
            } else {
                localStorage.removeItem("tasks");
            }
        } catch (err) {
            console.error("Failed to parse tasks:", err);
            localStorage.removeItem("tasks");
        }
    }
});

// Add task button click
btn2.addEventListener("click", function () {
    let task = input.value.trim();
    if (task) {
        createTaskElement(task);
        saveTaskToLocalStorage(task);
        input.value = "";
    }
});

// Create task element
function createTaskElement(task) {
    let item = document.createElement("li");
    item.innerText = task;

    let delbtn = document.createElement("button");
    delbtn.innerText = "Delete";

    delbtn.addEventListener("click", function () {
        item.remove();
        removeFromLocalStorage(task);
    });

    item.appendChild(delbtn);
    ul.appendChild(item);
}

// Save task
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let updatedTasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
