const tasks = [
    { name: "Soạn thảo đề cương dự án", owner: "An Nguyễn", priority: "Cao", start: "02-24", deadline: "02-27", status: "To Do", progress: "Trễ hạn"},
    { name: "Lên lịch họp kickoff", owner: "Bách Nguyễn", priority: "Trung bình", start: "02-24", deadline: "02-27", status: "In Progress", progress: "Có rủi ro"}
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
                        <button class="btn btn-warning" onclick="openEditTask(${tasks.indexOf(task)})">Sửa</button>
                        <button class="btn btn-danger" onclick="confirmDeleteTask(${tasks.indexOf(task)})">Xóa</button>
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
                        <button class="btn btn-warning" onclick="openEditTask(${tasks.indexOf(task)})">Sửa</button>
                        <button class="btn btn-danger" onclick="confirmDeleteTask(${tasks.indexOf(task)})">Xóa</button>
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
                        <button class="btn btn-warning" onclick="openEditTask(${tasks.indexOf(task)})">Sửa</button>
                        <button class="btn btn-danger" onclick="confirmDeleteTask(${tasks.indexOf(task)})">Xóa</button>
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
                        <button class="btn btn-warning" onclick="openEditTask(${tasks.indexOf(task)})">Sửa</button>
                        <button class="btn btn-danger" onclick="confirmDeleteTask(${tasks.indexOf(task)})">Xóa</button>
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