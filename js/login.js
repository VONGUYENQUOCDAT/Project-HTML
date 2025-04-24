document.querySelector('#loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let emailError = document.querySelector('#email-error');
    let passwordError = document.querySelector('#password-error');
    let valid = true;

    if (!validateEmail(email)) {
        emailError.textContent = 'Email không hợp lệ';
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (password.length < 8) {
        passwordError.textContent = 'Mật khẩu phải có ít nhất 8 ký tự';
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (valid) {
        window.location.href = "../pages/project_management.html";
    }
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}