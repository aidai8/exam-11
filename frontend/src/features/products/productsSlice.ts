import {Product, ProductMutation} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createProduct, fetchAllProducts, fetchProductById} from "./productsThunks.ts";

interface ProductsState {
    items: Product[];
    item: ProductMutation | null;
    fetchLoading: boolean;
    createLoading: boolean;
    editLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    editLoading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, {payload: products}) => {
                state.items = products;
                state.fetchLoading = false;
            })

            .addCase(fetchProductById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, {payload: product}) => {
                state.item = product;
                state.fetchLoading = false;
            })

            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createProduct.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const productsReducer = productSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectEditProductLoading = (state: RootState) => state.products.editLoading;