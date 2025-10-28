// Kayıt API
export async function onRequestPost(context) {
    try {
        const { email, password } = await context.request.json();
        const db = context.env.DB;

        // Validasyon
        if (!email || !password) {
            return new Response(JSON.stringify({
                error: 'Email ve şifre gerekli'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (password.length < 6) {
            return new Response(JSON.stringify({
                error: 'Şifre en az 6 karakter olmalı'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Email zaten var mı kontrol et
        const existing = await db.prepare(
            'SELECT id FROM users WHERE email = ?'
        ).bind(email).first();

        if (existing) {
            return new Response(JSON.stringify({
                error: 'Bu email zaten kayıtlı'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Basit hash (production'da bcrypt kullan)
        const passwordHash = await hashPassword(password);

        // Kullanıcıyı kaydet
        const result = await db.prepare(
            'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, datetime("now"))'
        ).bind(email, passwordHash).run();

        return new Response(JSON.stringify({
            success: true,
            userId: result.meta.last_row_id
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Register error:', error);
        return new Response(JSON.stringify({
            error: 'Kayıt sırasında hata oluştu'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Basit hash fonksiyonu (production'da bcrypt kullan)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
