document.querySelector("#registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.querySelector("#fullname").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#ConfirmPassword").value;

    // xóa lỗi cũ
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    let valid = true;

    if (fullname === "") {
        document.querySelector("#error-fullname").textContent = "Vui lòng nhập họ và tên.";
        valid = false;
    }
    if (email === "") {
        document.querySelector("#error-email").textContent = "Vui lòng nhập email.";
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.querySelector("#error-email").textContent = "Email không đúng định dạng.";
        valid = false;
    }
    if (password.length < 8) {
        document.querySelector("#error-password").textContent = "Mật khẩu phải có ít nhất 8 ký tự.";
        valid = false;
    }
    if (confirmPassword !== password) {
        document.querySelector("#error-confirmPassword").textContent = "Mật khẩu xác nhận không khớp.";
        valid = false;
    }
    if (valid) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some(u => u.email === email);

        if (emailExists) {
            document.querySelector("#error-email").textContent = "Email đã được sử dụng.";
            return;
        }

        const user = {
            fullname: fullname,
            email: email,
            password: password
        };

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công!");
        window.location.href = "../pages/login.html";
    }
});