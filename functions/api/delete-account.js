export async function onRequestDelete(context) {
    try {
        const { email } = await context.request.json();

        if (!email) {
            return new Response(JSON.stringify({ error: 'E-posta gereklidir' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const DB = context.env.DB;

        // Kullanıcıyı kontrol et
        const user = await DB.prepare(
            'SELECT * FROM users WHERE email = ?'
        ).bind(email).first();

        if (!user) {
            return new Response(JSON.stringify({ error: 'Kullanıcı bulunamadı' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Kullanıcıyı sil
        await DB.prepare(
            'DELETE FROM users WHERE email = ?'
        ).bind(email).run();

        return new Response(JSON.stringify({
            success: true,
            message: 'Hesap başarıyla silindi'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Hesap silme hatası:', error);
        return new Response(JSON.stringify({ error: 'Sunucu hatası' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
