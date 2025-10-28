// Giriş API
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

        // Kullanıcıyı bul
        const user = await db.prepare(
            'SELECT id, email, password_hash FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return new Response(JSON.stringify({
                error: 'Email veya şifre hatalı'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Şifreyi kontrol et
        const passwordHash = await hashPassword(password);

        if (passwordHash !== user.password_hash) {
            return new Response(JSON.stringify({
                error: 'Email veya şifre hatalı'
            }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Başarılı giriş
        return new Response(JSON.stringify({
            success: true,
            user: {
                id: user.id,
                email: user.email
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({
            error: 'Giriş sırasında hata oluştu'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Basit hash fonksiyonu (register.js ile aynı)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
