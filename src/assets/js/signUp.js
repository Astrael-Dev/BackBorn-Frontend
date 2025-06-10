const imageCircle = document.getElementById('imageCircle');
const fileInput = document.getElementById('profile_picture');

// Show image preview in the circle
fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let img = imageCircle.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                imageCircle.appendChild(img);
                // Hide the SVG icon when image is present
                imageCircle.querySelector('svg').style.display = 'none';
            }
            img.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});

// Clicking the circle opens file dialog
imageCircle.addEventListener('click', function() {
    fileInput.click();
});

// Handle form submission
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:10000/api/signup', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            window.location.href = 'thank-you.html';
        } else {
            const result = await response.json();
            alert(result.message || 'Sign up failed.');
        }
    } catch (err) {
        alert('Sign up failed. Please try again.');
    }
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-closed-icon lucide-eye-closed"><path d="m15 18-.722-3.25"/><path d="M2 8a10.645 10.645 0 0 0 20 0"/><path d="m20 15-1.726-2.05"/><path d="m4 15 1.726-2.05"/><path d="m9 18 .722-3.25"/></svg>`;

togglePassword.innerHTML = eyeClosedSVG;

togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.innerHTML = eyeOpenSVG;
    } else {
        passwordInput.type = 'password';
        togglePassword.innerHTML = eyeClosedSVG;
    }
});