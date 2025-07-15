document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Handle form submission (for demonstration purposes only)
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Logged in!');
    });

    document.getElementById('signup').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signed up!');
    });
});