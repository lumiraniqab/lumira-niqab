import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true });

        // Set a simple cookie for session
        response.cookies.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return response;
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value === "authenticated") {
        return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_session");
    return response;
}
