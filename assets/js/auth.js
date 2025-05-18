// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginForm = document.querySelector('.auth-form');
    const isLoginPage = document.title.includes('Sign In');
    const isRegisterPage = document.title.includes('Sign Up');
    
    if (loginForm) {
        // Handle login form submission
        if (isLoginPage) {
            setupLoginForm();
        }
        
        // Handle registration form submission
        if (isRegisterPage) {
            setupRegisterForm();
        }
    }
    
    // Setup login form
    function setupLoginForm() {
        const loginButton = loginForm.querySelector('.btn');
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');
        const rememberCheckbox = loginForm.querySelector('#remember');
        
        // Check if there's a saved email in localStorage
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
        
        if (loginButton) {
            loginButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                
                if (!email || !password) {
                    alert('Please enter both email and password');
                    return;
                }
                
                // Check if user exists in localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const user = users.find(u => u.email === email);
                
                if (!user) {
                    alert('User not found. Please register first.');
                    return;
                }
                
                if (user.password !== password) {
                    alert('Incorrect password. Please try again.');
                    return;
                }
                
                // Save current user to localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }));
                
                // Remember email if checkbox is checked
                if (rememberCheckbox && rememberCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                // Redirect to home page
                window.location.href = 'home.html';
            });
        }
    }
    
    // Setup register form
    function setupRegisterForm() {
        const registerButton = loginForm.querySelector('.btn');
        const nameInput = loginForm.querySelector('input[placeholder="Name"]');
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInputs = loginForm.querySelectorAll('input[type="password"]');
        const phoneInput = loginForm.querySelector('input[placeholder="Phone number"]');
        const termsCheckbox = loginForm.querySelector('#terms');
        
        if (registerButton) {
            registerButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const password = passwordInputs[0].value.trim();
                const confirmPassword = passwordInputs[1].value.trim();
                const phone = phoneInput ? phoneInput.value.trim() : '';
                
                // Validate inputs
                if (!name || !email || !password || !confirmPassword) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                if (termsCheckbox && !termsCheckbox.checked) {
                    alert('Please agree to the Terms and Conditions');
                    return;
                }
                
                // Check if email already exists
                const users = JSON.parse(localStorage.getItem('users')) || [];
                if (users.some(user => user.email === email)) {
                    alert('Email already registered. Please use a different email or login.');
                    return;
                }
                
                // Add new user
                users.push({
                    name,
                    email,
                    password,
                    phone: phone ? `+63${phone}` : ''
                });
                
                // Save users to localStorage
                localStorage.setItem('users', JSON.stringify(users));
                
                // Save current user to localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    name,
                    email,
                    phone: phone ? `+63${phone}` : ''
                }));
                
                // Redirect to home page
                window.location.href = 'home.html';
            });
        }
    }
});