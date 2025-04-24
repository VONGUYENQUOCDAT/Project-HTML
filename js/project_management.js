
let currentUser = "nguyenvana"; // Ví dụ: người đang đăng nhập

let project = {
    id: 1,
    name: "Ứng dụng quản lý công việc",
    owner: "nguyenvana"
}

let projects = [project];

const tableDataEl = document.querySelector(".table_data");

function renderData() {
    let dataHtml = ``;
    for (let i = 0; i < projects.length; i++) {
        if (projects[i].owner === currentUser) {
            dataHtml += `
                    <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${projects[i].name}</td>
                        <td>
                            <button class="btn btn-warning" onclick="renderDataUpdate(${i})">Sửa</button>
                            <button class="btn btn-danger" onclick="deleteProject(${i})">Xóa</button>
                            <button class="btn btn-primary" onclick="viewDetail(${projects[i].id})">Chi tiết</button>
                        </td>
                    </tr>
                `;
        }
    }

    tableDataEl.innerHTML = dataHtml;
}

renderData();

function toggleAddForm() {
    const formEl = document.getElementById("addProjectForm");
    formEl.style.display = formEl.style.display === "none" ? "block" : "none";
}

function addProject(e) {
    e.preventDefault();

    const nameInput = e.target.projectName.value.trim();
    const editIndex = document.getElementById("editIndex").value;

    if (nameInput === "") {
        alert("Tên dự án không được để trống");
        return;
    }

    if (nameInput.length < 5) {
        alert("Tên dự án phải có ít nhất 5 ký tự");
        return;
    }

    let existed = projects.find((p, i) => p.name === nameInput && p.owner === currentUser && i != editIndex);

    if (existed) {
        alert("Tên dự án đã tồn tại");
        return;
    }

    // Nếu đang sửa
    if (editIndex !== "") {
        projects[editIndex].name = nameInput;
        document.getElementById("editIndex").value = "";
    } else {
        // Thêm mới
        let newProject = {
            id: projects.length + 1,
            name: nameInput,
            owner: currentUser
        };
        projects.push(newProject);
    }

    e.target.reset(); // reset form
    toggleAddForm();  // ẩn form
    renderData();     // render lại bảng
}

function deleteProject(index) {
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa dự án này?");
    if (confirmDelete) {
        projects.splice(index, 1);
        renderData();
    }
}

function renderDataUpdate(index) {
    let projectTarget = projects[index];
    document.querySelector(".projectName").value = projectTarget.name;
    document.querySelector("#editIndex").value = index;
    document.getElementById("addProjectForm").style.display = "block";
}

function viewDetail(id) {
    window.location.href = `../pages/project_details.html?id=${id}`;
}