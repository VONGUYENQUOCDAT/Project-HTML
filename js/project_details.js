const tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: Date.now() + 1, name: "Soạn thảo đề cương dự án", owner: "An Nguyễn", priority: "Cao", start: "02-24", deadline: "02-27", status: "To Do", progress: "Trễ hạn" },
    { id: Date.now() + 2, name: "Lên lịch họp kickoff", owner: "Bách Nguyễn", priority: "Trung bình", start: "02-24", deadline: "02-27", status: "In Progress", progress: "Có rủi ro" }
];

// rendertask
function renderTasks() {
    const taskTable = document.querySelector(".task_data");
    let html = "";

    // nhom nhiem vu
    const groupedTasks = {
        "To Do": tasks.filter(task => task.status === "To Do"),
        "In Progress": tasks.filter(task => task.status === "In Progress"),
        "Pending": tasks.filter(task => task.status === "Pending"),
        "Done": tasks.filter(task => task.status === "Done")
    };

    // todo
    if (groupedTasks["To Do"].length > 0) {
        html += `<tr class="section-title"><td colspan="7">▼ To Do</td></tr>`;
        groupedTasks["To Do"].forEach(task => {
            html += `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.owner}</td>
                    <td><span class="badge ${getBadgeClass(task.priority)}">${task.priority}</span></td>
                    <td class="date">${task.start}</td>
                    <td class="date">${task.deadline}</td>
                    <td><span class="badge ${getStatusClass(task.progress)}">${task.progress}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditTask(${task.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }

    // progess
    if (groupedTasks["In Progress"].length > 0) {
        html += `<tr class="section-title"><td colspan="7">▼ In Progress</td></tr>`;
        groupedTasks["In Progress"].forEach(task => {
            html += `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.owner}</td>
                    <td><span class="badge ${getBadgeClass(task.priority)}">${task.priority}</span></td>
                    <td class="date">${task.start}</td>
                    <td class="date">${task.deadline}</td>
                    <td><span class="badge ${getStatusClass(task.progress)}">${task.progress}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditTask(${task.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }

    // pending
    if (groupedTasks["Pending"].length > 0) {
        html += `<tr class="section-title"><td colspan="7">▼ Pending</td></tr>`;
        groupedTasks["Pending"].forEach(task => {
            html += `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.owner}</td>
                    <td><span class="badge ${getBadgeClass(task.priority)}">${task.priority}</span></td>
                    <td class="date">${task.start}</td>
                    <td class="date">${task.deadline}</td>
                    <td><span class="badge ${getStatusClass(task.progress)}">${task.progress}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditTask(${task.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }

    // done
    if (groupedTasks["Done"].length > 0) {
        html += `<tr class="section-title"><td colspan="7">▼ Done</td></tr>`;
        groupedTasks["Done"].forEach(task => {
            html += `
                <tr>
                    <td>${task.name}</td>
                    <td>${task.owner}</td>
                    <td><span class="badge ${getBadgeClass(task.priority)}">${task.priority}</span></td>
                    <td class="date">${task.start}</td>
                    <td class="date">${task.deadline}</td>
                    <td><span class="badge ${getStatusClass(task.progress)}">${task.progress}</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditTask(${task.id})">Sửa</button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    }
    taskTable.innerHTML = html;
}

// lay the uu tien
function getBadgeClass(priority) {
    switch (priority) {
        case "Thấp":
            return "low";
        case "Trung bình":
            return "medium";
        case "Cao":
            return "high";
        default:
            return "low";
    }
}

// lay the tien do theo trang thai
function getStatusClass(status) {
    switch (status) {
        case "Đang tiến độ":
            return "warning";
        case "Có rủi ro":
            return "warning";
        case "Trễ hạn":
            return "late";
        case "Hoàn thành":
            return "done";
        default:
            return "warning";
    }
}

renderTasks();

const project = JSON.parse(localStorage.getItem("selectedProject")) || {};
const projectNameEl = document.getElementById("project-name");
if (projectNameEl) {
    projectNameEl.textContent = project.name;
}
document.getElementById("project-description").textContent = project.description;

function validateTask(task, isEdit = false, currentIndex = -1) {
    const errors = [];

    if (!task.name || task.name.trim().length < 3) {
        errors.push("Tên nhiệm vụ phải có ít nhất 3 ký tự.");
    }

    const duplicate = tasks.find((t, index) => t.name === task.name && (!isEdit || index !== currentIndex));
    if (duplicate) {
        errors.push("Tên nhiệm vụ đã tồn tại.");
    }

    const today = new Date().toISOString().split("T")[0];
    if (task.start < today) {
        errors.push("Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại.");
    }

    if (task.deadline <= task.start) {
        errors.push("Hạn chót phải lớn hơn ngày bắt đầu.");
    }

    return errors;
}

const today = new Date().toISOString().split('T')[0];

function addTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const taskOwner = document.getElementById("taskOwner").value.trim();
    const taskStatus = document.getElementById("taskStatus").value;
    const taskStart = document.getElementById("taskStart").value;
    const taskEnd = document.getElementById("taskEnd").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskProgress = document.getElementById("taskProgress").value;

    if (!taskName || !taskOwner || !taskStatus || !taskStart || !taskEnd || !taskPriority || !taskProgress) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (taskStart < today) {
        alert("Ngày bắt đầu không thể trước ngày hôm nay!");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        owner: taskOwner,
        status: taskStatus,
        start: taskStart,
        deadline: taskEnd,
        priority: taskPriority,
        progress: taskProgress
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();

    document.getElementById("taskForm").reset();
    document.getElementById("saveTaskBtn").removeAttribute("data-index");
    document.getElementById("saveTaskBtn").textContent = "Lưu";
}


function openEditTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        alert("Nhiệm vụ không tồn tại.");
        return;
    }

    document.getElementById("taskName").value = task.name;
    document.getElementById("taskOwner").value = task.owner;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskStart").value = task.start;
    document.getElementById("taskEnd").value = task.deadline;
    document.getElementById("taskProgress").value = task.progress;
    document.getElementById("taskStatus").value = task.status;

    const saveButton = document.getElementById("saveTaskBtn");
    saveButton.setAttribute("data-id", task.id);
    saveButton.textContent = "Lưu thay đổi";

    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("taskModal"));
    modal.show();
}

function saveEditedTask() {
    const taskId = document.getElementById("saveTaskBtn").getAttribute("data-id");
    const taskIndex = tasks.findIndex(task => task.id == taskId);

    if (taskIndex === -1) {
        alert("Nhiệm vụ không tồn tại.");
        return;
    }

    const task = {
        id: Number(taskId),
        name: document.getElementById("taskName").value.trim(),
        owner: document.getElementById("taskOwner").value.trim(),
        priority: document.getElementById("taskPriority").value,
        start: document.getElementById("taskStart").value,
        deadline: document.getElementById("taskEnd").value,
        progress: document.getElementById("taskProgress").value,
        status: document.getElementById("taskStatus").value,
    };

    const errors = validateTask(task, true, taskIndex);
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
    }

    tasks[taskIndex] = task;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();

    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();

    document.getElementById("taskForm").reset();
    document.getElementById("saveTaskBtn").removeAttribute("data-id");
    document.getElementById("saveTaskBtn").textContent = "Lưu";
}

function deleteTask(taskId) {
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.show();

    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.onclick = function () {
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();

            confirmDeleteModal.hide();
        }
    };
}

function saveTask() {
    const isEditMode = document.getElementById("saveTaskBtn").hasAttribute("data-id");

    if (isEditMode) {
        saveEditedTask();
    } else {
        addTask();
    }
}