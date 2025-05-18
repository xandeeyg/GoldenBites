// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    // Skip auth check on login and register pages
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('register.html')) {
        return;
    }
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // Redirect to login page
        window.location.href = 'login.html';
    }
});