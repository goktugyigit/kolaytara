export async function onRequestPost(context) {
    try {
        const { email, currentPassword, newPassword } = await context.request.json();

        if (!email || !currentPassword || !newPassword) {
            return Response.json({ error: 'Tüm alanlar gereklidir' }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return Response.json({ error: 'Yeni şifre en az 6 karakter olmalıdır' }, { status: 400 });
        }

        const DB = context.env.DB;

        // Kullanıcıyı bul
        const user = await DB.prepare(
            'SELECT id, email, password_hash FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return Response.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
        }

        // Mevcut şifreyi hash'le ve kontrol et
        const currentPasswordHash = await hashPassword(currentPassword);

        if (currentPasswordHash !== user.password_hash) {
            return Response.json({ error: 'Mevcut şifre yanlış' }, { status: 401 });
        }

        // Yeni şifreyi hash'le ve güncelle
        const newPasswordHash = await hashPassword(newPassword);

        await DB.prepare(
            'UPDATE users SET password_hash = ? WHERE email = ?'
        ).bind(newPasswordHash, email).run();

        return Response.json({
            success: true,
            message: 'Şifre başarıyla değiştirildi'
        }, { status: 200 });

    } catch (error) {
        console.error('Şifre değiştirme hatası:', error);
        return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
