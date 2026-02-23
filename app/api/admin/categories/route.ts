import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const categories = await Category.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Categories GET error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const category = new Category(body);
        await category.save();
        return NextResponse.json(category, { status: 201 });
    } catch (error: unknown) {
        console.error("Categories POST error:", error);
        if (error instanceof Error && "code" in error && (error as { code: number }).code === 11000) {
            return NextResponse.json({ error: "Category name already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
