// auth.js

// بيانات تسجيل الدخول للمالك
const adminUsername = "Admin1"; // اسم المستخدم
const adminPassword = "@#Q123456"; // كلمة المرور

// دالة تسجيل الدخول
function login() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;

    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("adminControls").style.display = "block";
        alert("Login successful!");
    } else {
        alert("Incorrect username or password.");
    }
}
