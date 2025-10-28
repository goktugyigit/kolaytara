// Cloudflare Pages Function - Register
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

        if (password.length < 6) {
            return Response.json({ error: 'Şifre en az 6 karakter olmalı' }, { status: 400 });
        }

        // Email zaten var mı kontrol et
        const existing = await db.prepare('SELECT id FROM users WHERE email = ?')
            .bind(email)
            .first();

        if (existing) {
            return Response.json({ error: 'Bu email zaten kayıtlı' }, { status: 400 });
        }

        // Şifreyi hash'le
        const passwordHash = await hashPassword(password);

        // Kullanıcıyı kaydet
        const result = await db.prepare(
            'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, datetime("now"))'
        ).bind(email, passwordHash).run();

        return Response.json({
            success: true,
            userId: result.meta.last_row_id
        });

    } catch (error) {
        console.error('Register error:', error);
        return Response.json({ error: 'Kayıt sırasında hata oluştu: ' + error.message }, { status: 500 });
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
