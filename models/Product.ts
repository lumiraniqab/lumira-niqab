import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IVariant {
    name: string;
    color: string;
    size: string;
    price: number;
    stock: number;
    sku: string;
    isActive: boolean;
}

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    category: Types.ObjectId;
    basePrice: number;
    images: string[];
    isActive: boolean;
    variants: IVariant[];
    createdAt: Date;
    updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>(
    {
        name: { type: String, required: true },
        color: { type: String, default: "" },
        size: { type: String, default: "" },
        price: { type: Number, required: true, min: 0 },
        stock: { type: Number, default: 0, min: 0 },
        sku: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
    },
    { _id: true }
);

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, unique: true },
        description: { type: String, default: "" },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        basePrice: { type: Number, required: true, min: 0 },
        images: [{ type: String }],
        isActive: { type: Boolean, default: true },
        variants: [VariantSchema],
    },
    { timestamps: true }
);

ProductSchema.pre("save", function (next: any) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    next();
});

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
