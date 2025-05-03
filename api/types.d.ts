import {Document} from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phoneNumber: string;
}

export interface UserDocument extends UserFields, Document {
    _id: string;
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export interface Product {
    _id: string;
    category: string;
    title: string;
    price: number;
    description: string;
    image: string;
    seller: string | UserDocument;
}

export type ProductWithoutId = Omit<Product, '_id'>;

export interface Category {
    _id: string;
    title: string;
    description: string;
}