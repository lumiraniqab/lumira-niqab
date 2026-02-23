import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { id } = await context.params;
        const category = await Category.findById(id).lean();
        if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(category);
    } catch (error) {
        console.error("Category GET error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: RouteContext) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { id } = await context.params;
        const body = await req.json();

        const category = await Category.findById(id);
        if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });

        Object.assign(category, body);
        await category.save();
        return NextResponse.json(category);
    } catch (error) {
        console.error("Category PUT error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { id } = await context.params;
        const result = await Category.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Category DELETE error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
