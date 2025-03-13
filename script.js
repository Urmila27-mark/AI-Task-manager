const taskList = document.getElementById("taskList");
const insights = document.getElementById("insights");
const darkModeToggle = document.getElementById("darkModeToggle");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", loadTasks);

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;
    if (!taskInput) return;
    
    const task = { text: taskInput, priority, deadline, completed: false };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${task.text} - ${task.priority} - ${task.deadline}</span> <button onclick="deleteTask(${index})">❌</button>`;
        if (task.completed) li.style.textDecoration = "line-through";
        li.addEventListener("click", () => toggleComplete(index));
        taskList.appendChild(li);
    });
    updateInsights();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function updateInsights() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    insights.innerText = totalTasks ? `${(completedTasks / totalTasks * 100).toFixed(1)}% completed` : "No tasks yet";
}

function loadTasks() {
    renderTasks();
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
}