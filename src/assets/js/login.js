// Password visibility toggle (same as before)
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPasswordInput = document.getElementById('loginPasswordInput');

const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed-icon lucide-eye-closed"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`;

toggleLoginPassword.innerHTML = eyeClosedSVG;

toggleLoginPassword.addEventListener('click', function () {
    if (loginPasswordInput.type === 'password') {
        loginPasswordInput.type = 'text';
        toggleLoginPassword.innerHTML = eyeOpenSVG;
    } else {
        loginPasswordInput.type = 'password';
        toggleLoginPassword.innerHTML = eyeClosedSVG;
    }
});

// JWT decode helper (to check expiry)
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

// Check JWT on page load
(function checkJwtSession() {
    const token = localStorage.getItem('jwt');
    if (token) {
        const payload = parseJwt(token);
        if (payload && payload.exp && Date.now() < payload.exp * 1000) {
            // Token is valid, redirect
            window.location.href = 'thank-you.html';
        } else {
            // Token expired, remove it
            localStorage.removeItem('jwt');
        }
    }
})();

// Login form submit
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.password.value
    };

    try {
        const response = await fetch('https://backborn-backend.onrender.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok && result.token) {
            localStorage.setItem('jwt', result.token);
            window.location.href = 'thank-you.html';
        } else {
            alert(result.message || 'Login failed.');
        }
    } catch (err) {
        alert('Login failed. Please try again.');
    }
});