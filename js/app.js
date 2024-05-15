updateHeaderState();

var loginFormEl = document.getElementById('login-form');
if (loginFormEl) {
    loginFormEl.addEventListener('submit', login);
}

var signupFormEl = document.getElementById('signup-form');
if (signupFormEl) {
    signupFormEl.addEventListener('submit', signup);
}

if ((window.location.href === '/signin.html' || window.location.href === "/signup.html") &&
    window.localStorage.getItem('currentUser')
) {
    window.location.href = '/';
}

function login(e) {
    e.preventDefault();

    var loginEl = document.getElementById('login');
    var login = loginEl.value.trim();
    if (!login) {
        alert('Введіть логін!');
        return;
    }

    var passwordEl = document.getElementById('password');
    var password = passwordEl.value.trim();
    if (!password) {
        alert('Введіть пароль!');
        return;
    }

    var oldPassword = window.localStorage.getItem(login);

    if (!oldPassword) {
        alert('Користувача з таким логіном не існує!');
        return;
    }

    if (oldPassword !== password) {
        alert('Невірний пароль!');
        return;
    }

    window.localStorage.setItem('currentUser', login);
    loginEl.value = '';
    passwordEl.value = '';

    updateHeaderState();

    window.location.href = '/';
}

function signup(e) {
    e.preventDefault();

    var loginEl = document.getElementById('login');
    var login = loginEl.value.trim();
    if (!login) {
        alert('Введіть логін!');
        return;
    }

    var passwordEl = document.getElementById('password');
    var password = passwordEl.value.trim();
    if (!password) {
        alert('Введіть пароль!');
        return;
    }

    if (window.localStorage.getItem(login)) {
        alert('Користувач з таким логіном вже існує!');
        return;
    }

    window.localStorage.setItem(login, password);
    window.localStorage.setItem('currentUser', login);
    loginEl.value = '';
    passwordEl.value = '';

    updateHeaderState();

    window.location.href = '/';
}

function logout() {
    window.localStorage.removeItem('currentUser');
    updateHeaderState();
}

function updateHeaderState() {
    var currentUser = window.localStorage.getItem('currentUser');
    var loginLinkEl = document.getElementById('login-link');
    var logoutLinkEl = document.getElementById('logout-link');
    var greetingLinkEl = document.getElementById('greeting-link');

    if (currentUser) {
        loginLinkEl.classList.add('d-none');
        logoutLinkEl.classList.remove('d-none');
        greetingLinkEl.classList.remove('d-none');
        greetingLinkEl.innerHTML = '<a class="nav-link">Вітаємо, ' + currentUser + '!</a>';
    } else {
        loginLinkEl.classList.remove('d-none');
        logoutLinkEl.classList.add('d-none');
        greetingLinkEl.classList.add('d-none');
        greetingLinkEl.innerHTML = '';
    }
}