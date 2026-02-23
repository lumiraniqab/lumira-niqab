import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true, trim: true },
        slug: { type: String, unique: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Auto-generate slug from name
CategorySchema.pre("save", function (next: any) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    next();
});

const Category: Model<ICategory> =
    mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
