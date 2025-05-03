import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Product, ProductMutation} from "../../types";
import {RootState} from "../../app/store.ts";


export const fetchAllProducts = createAsyncThunk<Product[], string | undefined>(
    'products/fetchAllProducts',
    async (category_id) => {
        const url = category_id ? `/products?category=${category_id}` : '/products';
        const response = await axiosAPI.get<Product[]>(url);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (product_id) => {
        const response = await axiosAPI.get<Product>(`/products/${product_id}`);
        return response.data;
    }
);


export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productData, {getState}) => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });
        const token = (getState() as RootState).users.user?.token;
        await axiosAPI.post('/products', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
    }
);

export const deleteProduct = createAsyncThunk<void, string>(
    'products/deleteProduct',
    async (product_id, { getState }) => {
        const token = (getState() as RootState).users.user?.token;
        await axiosAPI.delete(`/products/${product_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }
);