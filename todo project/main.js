// script.js
let tasks = [];

// Add task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const categoryInput = document.getElementById('categoryInput').value;

    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskInput,
        category: categoryInput,
    };

    tasks.push(newTask);
    document.getElementById('taskInput').value = ''; // clear input field
    renderTasks();
}

// Render tasks in the list
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear previous tasks

    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchText = document.getElementById('searchBar').value.toLowerCase();

    const filteredTasks = tasks.filter(task => {
        const matchesCategory = categoryFilter === '' || task.category === categoryFilter;
        const matchesSearch = task.text.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.text} (${task.category})</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Filter tasks when search bar or category filter is changed
function filterTasks() {
    renderTasks();
}

// Initial render of tasks
renderTasks();
