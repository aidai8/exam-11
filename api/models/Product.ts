import mongoose, {HydratedDocument} from "mongoose";
import Category from "./Category";
import {UserDocument} from "../types";

const Schema = mongoose.Schema;

interface ProductFields {
    category: string;
    title: string;
    price: number;
    description: string;
    image: string;
    seller: string | HydratedDocument<UserDocument>;
}

interface ProductMethods {}

type ProductDocument = HydratedDocument<ProductFields, ProductMethods>;

const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        validate:  {
            validator: async (value: string) => {
                const category = await Category.findById(value);
                return  !!category;
            },
            message: "Category not found",
        },
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: [
            {
                validator: async (value: string) => {
                    return !isNaN(+value);
                },
                message: "Price must be number",
            },
        ]
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
export default Product;