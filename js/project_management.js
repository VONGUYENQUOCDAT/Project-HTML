let currentUser = "nguyenvana";
let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        name: "Ứng dụng quản lý công việc",
        description: "Ứng dụng giúp quản lý công việc nhóm hiệu quả",
        owner: "nguyenvana"
    },
    {
        id: 2,
        name: "Phát triển ứng dụng di động",
        description: "Xây dựng app mobile cho doanh nghiệp",
        owner: "nguyenvana"
    },
];
let searchKeyword = "";
let currentPage = 1;
const rowsPerPage = 5;
let deleteIndex = null;

const tableDataEl = document.querySelector(".table_data");

function isProjectNameExist(name, editIndex = null) {
    return projects.find((p, i) => p.name === name && p.owner === currentUser && i !== editIndex);
}

function renderData() {
    let filteredProjects = projects.filter(project =>
        project.owner === currentUser &&
        project.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedProjects = filteredProjects.slice(start, end);

    let dataHtml = "";
    paginatedProjects.forEach((project, i) => {
        dataHtml += `
            <tr>
                <th scope="row">${start + i + 1}</th>
                <td>${project.name}</td>
                <td>
                    <button class="btn btn-warning" onclick="renderDataUpdate(${projects.indexOf(project)})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteProject(${projects.indexOf(project)})">Xóa</button>
                    <button class="btn btn-primary" onclick="viewDetail(${project.id})">Chi tiết</button>
                </td>
            </tr>
        `;
    });

    tableDataEl.innerHTML = dataHtml;
    renderPagination(filteredProjects.length);
}

renderData();
document.getElementById("searchInput").addEventListener("input", function (e) {
    searchKeyword = e.target.value;
    currentPage = 1;
    renderData();
});

function toggleAddForm() {
    const formEl = document.getElementById("addProjectForm");
    formEl.style.display = formEl.style.display === "none" ? "block" : "none";
}

function addProject(e) {
    e.preventDefault();

    const nameInput = e.target.projectName.value.trim();
    const descInput = e.target.projectDesc.value.trim();
    const editIndex = document.getElementById("editIndex").value;

    if (nameInput === "") {
        alert("Tên dự án không được để trống");
        return;
    }

    if (nameInput.length < 5) {
        alert("Tên dự án phải có ít nhất 5 ký tự");
        return;
    }

    if (isProjectNameExist(nameInput, editIndex)) {
        alert("Tên dự án đã tồn tại");
        return;
    }

    if (descInput === "") {
        alert("Mô tả dự án không được để trống");
        return;
    }

    if (descInput.length < 10) {
        alert("Mô tả dự án phải có ít nhất 10 ký tự");
        return;
    }

    // nếu đang sửa
    if (editIndex !== "") {
        projects[editIndex].name = nameInput;
        projects[editIndex].description = descInput;
        document.getElementById("editIndex").value = "";
    } else {
        // thêm mới
        let newProject = {
            id: projects.length + 1,
            name: nameInput,
            description: descInput,
            owner: currentUser
        };
        projects.push(newProject);
    }
    saveProjectsToLocalStorage();
    e.target.reset(); // reset form
    toggleAddForm();  // ẩn form
    renderData();     // render lại bảng
}

function deleteProject(index) {
    deleteIndex = index;
    new bootstrap.Modal(document.getElementById("confirmDeleteModal")).show();
}

function renderDataUpdate(index) {
    const projectTarget = projects[index];
    document.querySelector(".projectName").value = projectTarget.name;
    document.getElementById("projectNameInput").value = projectTarget.name;
    document.getElementById("projectDescInput").value = projectTarget.description || "";
    document.getElementById("editIndex").value = index;
    document.getElementById("projectModalLabel").innerText = "Chỉnh Sửa Dự Án";
    new bootstrap.Modal(document.getElementById("projectModal")).show();
}

function viewDetail(id) {
    window.location.href = `../pages/project_details.html?id=${id}`;
}

// phần phân trang
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const paginationEl = document.querySelector(".pagination");
    let paginationHtml = "";

    paginationHtml += `<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="changePage(${currentPage - 1})"><</a></li>`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<li class="page-item ${i === currentPage ? "active" : ""}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
    }

    paginationHtml += `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">></a></li>`;

    paginationEl.innerHTML = paginationHtml;
}

function changePage(page) {
    currentPage = page;
    renderData();
}

//modal them moi
function openAddModal() {
    document.getElementById("editIndex").value = "";
    document.querySelector(".projectName").value = "";
    document.getElementById("projectModalLabel").innerText = "Thêm Dự Án";
    new bootstrap.Modal(document.getElementById("projectModal")).show();
}
document.getElementById("saveProjectBtn").addEventListener("click", function () {
    const nameInput = document.getElementById("projectNameInput").value.trim();
    const editIndex = document.getElementById("editIndex").value;
    const descInput = document.getElementById("projectDescInput").value.trim();

    if (nameInput === "") {
        alert("Tên dự án không được để trống");
        return;
    }

    if (nameInput.length < 5) {
        alert("Tên dự án phải có ít nhất 5 ký tự");
        return;
    }

    if (isProjectNameExist(nameInput, editIndex)) {
        alert("Tên dự án đã tồn tại");
        return;
    }

    if (descInput === "") {
        alert("Mô tả dự án không được để trống");
        return;
    }

    if (descInput.length < 10) {
        alert("Mô tả dự án phải có ít nhất 10 ký tự");
        return;
    }

    if (editIndex !== "") {
        projects[editIndex].name = nameInput;
        projects[editIndex].description = descInput;
    } else {
        projects.push({
            id: projects.length + 1,
            name: nameInput,
            description: descInput,
            owner: currentUser
        });
    }

    saveProjectsToLocalStorage();
    document.getElementById("editIndex").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectDescInput").value = "";
    bootstrap.Modal.getInstance(document.getElementById("projectModal")).hide();
    renderData();
});

// modal xoa
document.getElementById("deleteProjectBtn").addEventListener("click", function () {
    if (deleteIndex !== null) {
        projects.splice(deleteIndex, 1);
        saveProjectsToLocalStorage();
        deleteIndex = null;
        bootstrap.Modal.getInstance(document.getElementById("confirmDeleteModal")).hide();
        renderData();
    }
});

// luu du lieu
function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}