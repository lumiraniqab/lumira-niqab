import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(req: NextRequest) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await dbConnect();

        const [productCount, categoryCount, activeProducts, lowStockProducts] = await Promise.all([
            Product.countDocuments(),
            Category.countDocuments(),
            Product.countDocuments({ isActive: true }),
            Product.countDocuments({ "variants.stock": { $lte: 5 } }),
        ]);

        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("category", "name")
            .lean();

        return NextResponse.json({
            stats: {
                totalProducts: productCount,
                totalCategories: categoryCount,
                activeProducts,
                lowStockProducts,
            },
            recentProducts,
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
