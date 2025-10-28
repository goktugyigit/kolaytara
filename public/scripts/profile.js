// Kullanıcı bilgilerini yükle
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Kullanıcı bilgilerini göster
    document.getElementById('userEmail').textContent = user.email;

    // Üyelik tarihini göster (eğer varsa)
    if (user.createdAt) {
        const date = new Date(user.createdAt);
        document.getElementById('memberSince').textContent = date.toLocaleDateString('tr-TR');
    } else {
        document.getElementById('memberSince').textContent = 'Bilinmiyor';
    }

    // Şifre değiştirme formu
    const changePasswordForm = document.getElementById('changePasswordForm');
    const passwordMessage = document.getElementById('passwordMessage');

    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Şifre kontrolü
        if (newPassword !== confirmNewPassword) {
            showMessage('Yeni şifreler eşleşmiyor!', 'error');
            return;
        }

        if (newPassword.length < 6) {
            showMessage('Yeni şifre en az 6 karakter olmalıdır!', 'error');
            return;
        }

        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    currentPassword,
                    newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Şifreniz başarıyla değiştirildi!', 'success');
                changePasswordForm.reset();
            } else {
                showMessage(data.error || 'Şifre değiştirme başarısız!', 'error');
            }
        } catch (error) {
            console.error('Şifre değiştirme hatası:', error);
            showMessage('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        }
    });

    // Hesap silme
    document.getElementById('deleteAccountBtn').addEventListener('click', async () => {
        const confirmed = confirm(
            'Hesabınızı silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz ve tüm verileriniz silinecektir.'
        );

        if (!confirmed) return;

        const doubleConfirm = confirm(
            'Son kez soruyoruz: Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?'
        );

        if (!doubleConfirm) return;

        try {
            const response = await fetch('/api/delete-account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email
                })
            });

            if (response.ok) {
                alert('Hesabınız başarıyla silindi.');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            } else {
                const data = await response.json();
                alert(data.error || 'Hesap silme başarısız!');
            }
        } catch (error) {
            console.error('Hesap silme hatası:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    });

    // Çıkış butonu
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('passwordMessage');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
