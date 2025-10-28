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
    // Profil butonuna ikon göster
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
      profileBtn.textContent = '👤 Profil';
    }
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

// Profile button handler
const profileBtn = document.getElementById('profileBtn');
if (profileBtn) {
  profileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      alert(`Profil Bilgileri:\n\nE-posta: ${user.email}\nKayıt Tarihi: ${user.createdAt || 'Bilinmiyor'}`);
    }
  });
}
