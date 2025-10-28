// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    if (password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    // Simulate registration (in production, this would call your D1 backend)
    const user = { email, id: Date.now() };
    localStorage.setItem('user', JSON.stringify(user));
    
    alert('Kayıt başarılı! Yönlendiriliyorsunuz...');
    window.location.href = 'dashboard.html';
  });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login (in production, this would call your D1 backend)
    if (email && password.length >= 6) {
      const user = { email, id: Date.now() };
      localStorage.setItem('user', JSON.stringify(user));
      
      alert('Giriş başarılı!');
      window.location.href = 'dashboard.html';
    } else {
      alert('Geçersiz e-posta veya şifre!');
    }
  });
}
