export async function onRequestPost(context) {
    try {
        const { email, currentPassword, newPassword } = await context.request.json();

        if (!email || !currentPassword || !newPassword) {
            return new Response(JSON.stringify({ error: 'Tüm alanlar gereklidir' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (newPassword.length < 6) {
            return new Response(JSON.stringify({ error: 'Yeni şifre en az 6 karakter olmalıdır' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const DB = context.env.DB;

        // Kullanıcıyı bul ve mevcut şifreyi kontrol et
        const user = await DB.prepare(
            'SELECT * FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return new Response(JSON.stringify({ error: 'Kullanıcı bulunamadı' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Mevcut şifreyi kontrol et
        if (user.password !== currentPassword) {
            return new Response(JSON.stringify({ error: 'Mevcut şifre yanlış' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Yeni şifreyi güncelle
        await DB.prepare(
            'UPDATE users SET password = ? WHERE email = ?'
        ).bind(newPassword, email).run();

        return new Response(JSON.stringify({
            success: true,
            message: 'Şifre başarıyla değiştirildi'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Şifre değiştirme hatası:', error);
        return new Response(JSON.stringify({ error: 'Sunucu hatası' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
