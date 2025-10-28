// Cloudflare Pages Function - Login
interface Env {
    DB: any; // D1Database
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    try {
        const { email, password } = await context.request.json();
        const db = context.env.DB;

        // Validasyon
        if (!email || !password) {
            return Response.json({ error: 'Email ve şifre gerekli' }, { status: 400 });
        }

        // Kullanıcıyı bul
        const user = await db.prepare(
            'SELECT id, email, password_hash FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return Response.json({ error: 'Email veya şifre hatalı' }, { status: 401 });
        }

        // Şifreyi kontrol et
        const passwordHash = await hashPassword(password);

        if (passwordHash !== user.password_hash) {
            return Response.json({ error: 'Email veya şifre hatalı' }, { status: 401 });
        }

        // Başarılı giriş
        return Response.json({
            success: true,
            user: {
                id: user.id,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return Response.json({ error: 'Giriş sırasında hata oluştu: ' + error.message }, { status: 500 });
    }
}

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}
