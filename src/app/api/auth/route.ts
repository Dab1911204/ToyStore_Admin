export async function POST(request: Request) {
    const body = await request.json()
    const sessionToken = body.sessionToken as string;
    const expiresAt = body.expiresAt as string;
    const roleUser = body.roleUser as string;

    if (!sessionToken) {
        return Response.json({ message: "Không nhận được sessionToken" }, { status: 400 })
    }

    const expiresDate = new Date(expiresAt).toUTCString()

    // Lưu sessionToken + userId vào cookie
    const cookieValue = `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure,`+
                        `roleUser=${roleUser}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`

    return Response.json(body, {
        status: 200,
        headers: {
            "Set-Cookie": cookieValue
        }
    })
}
