// auth.js

// بيانات تسجيل الدخول للمالك
const adminUsername = "Admin1"; // اسم المستخدم
const adminPassword = "123456"; // كلمة المرور

// دالة تسجيل الدخول
function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (!usernameInput || !passwordInput) return;

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
        sessionStorage.setItem("isAdminLoggedIn", "true");
        showAdminPanel();
        if (typeof showToast === "function") {
            showToast("Login successful!");
        } else {
            alert("Login successful!");
        }
    } else {
        if (typeof showToast === "function") {
            showToast("Incorrect username or password.", true);
        } else {
            alert("Incorrect username or password.");
        }
    }
}

// دالة عرض لوحة التحكم
function showAdminPanel() {
    const loginForm = document.getElementById("loginForm");
    const adminControls = document.getElementById("adminControls");
    if (loginForm) loginForm.style.display = "none";
    if (adminControls) adminControls.style.display = "block";
}

// دالة تسجيل الخروج
function logout() {
    sessionStorage.removeItem("isAdminLoggedIn");
    const loginForm = document.getElementById("loginForm");
    const adminControls = document.getElementById("adminControls");
    if (loginForm) loginForm.style.display = "block";
    if (adminControls) adminControls.style.display = "none";
    if (typeof showToast === "function") {
        showToast("Logged out successfully.");
    } else {
        alert("Logged out successfully.");
    }
}

// استرجاع الجلسة عند التحميل
window.addEventListener("load", () => {
    if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
        showAdminPanel();
    }
});
