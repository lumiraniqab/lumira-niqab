import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { id } = await context.params;
        const product = await Product.findById(id).populate("category", "name").lean();
        if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        console.error("Product GET error:", error);
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

        const product = await Product.findById(id);
        if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

        Object.assign(product, body);
        await product.save();

        const populated = await Product.findById(product._id).populate("category", "name").lean();
        return NextResponse.json(populated);
    } catch (error) {
        console.error("Product PUT error:", error);
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
        const result = await Product.findByIdAndDelete(id);
        if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Product DELETE error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
