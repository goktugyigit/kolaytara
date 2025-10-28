// Check authentication
function checkAuth() {
  const user = localStorage.getItem('user');
  if (!user && window.location.pathname.includes('dashboard')) {
    window.location.href = 'login.html';
    return null;
  }
  return user ? JSON.parse(user) : null;
}

// Initialize dashboard
if (window.location.pathname.includes('dashboard')) {
  const user = checkAuth();
  if (user) {
    document.getElementById('userEmail').textContent = user.email;
  }
}

// Logout handler
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}
