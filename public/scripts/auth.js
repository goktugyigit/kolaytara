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

    try {
      // Backend API'ye kayıt isteği gönder
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Kayıt başarısız!');
        return;
      }

      // Başarılı kayıt
      const user = { email, id: data.userId };
      localStorage.setItem('user', JSON.stringify(user));

      alert('Kayıt başarılı! Yönlendiriliyorsunuz...');
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Register error:', error);
      alert('Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.');
    }
  });
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Backend API'ye giriş isteği gönder
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Giriş başarısız!');
        return;
      }

      // Başarılı giriş
      const user = { email: data.user.email, id: data.user.id };
      localStorage.setItem('user', JSON.stringify(user));

      alert('Giriş başarılı!');
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Login error:', error);
      alert('Giriş sırasında hata oluştu. Lütfen tekrar deneyin.');
    }
  });
}
