// Cloudflare Pages Function - Forgot Password
export async function onRequestPost(context) {
    try {
        const { email } = await context.request.json();
        const db = context.env.DB;

        // Validasyon
        if (!email) {
            return Response.json({ error: 'Email gerekli' }, { status: 400 });
        }

        // Kullanıcıyı bul
        const user = await db.prepare('SELECT id FROM users WHERE email = ?')
            .bind(email)
            .first();

        if (!user) {
            return Response.json({ error: 'Bu email ile kayıtlı kullanıcı bulunamadı' }, { status: 404 });
        }

        // Rastgele yeni şifre oluştur
        const newPassword = generateRandomPassword();
        const passwordHash = await hashPassword(newPassword);

        // Şifreyi güncelle
        await db.prepare(
            'UPDATE users SET password_hash = ?, updated_at = datetime("now") WHERE email = ?'
        ).bind(passwordHash, email).run();

        // Yeni şifreyi döndür (normalde email gönderilir)
        return Response.json({
            success: true,
            newPassword: newPassword,
            message: 'Şifreniz sıfırlandı'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        return Response.json({
            error: 'İşlem sırasında hata oluştu: ' + error.message
        }, { status: 500 });
    }
}

function generateRandomPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
