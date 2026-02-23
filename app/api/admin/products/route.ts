import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        const filter: Record<string, unknown> = {};
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: "i" };

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .populate("category", "name")
            .lean();

        return NextResponse.json(products);
    } catch (error) {
        console.error("Products GET error:", error);
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
        const product = new Product(body);
        await product.save();
        const populated = await Product.findById(product._id).populate("category", "name").lean();
        return NextResponse.json(populated, { status: 201 });
    } catch (error: unknown) {
        console.error("Products POST error:", error);
        if (error instanceof Error && error.message.includes("validation")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
