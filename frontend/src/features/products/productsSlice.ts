import {Product} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createProduct, fetchAllProducts, fetchProductById} from "./productsThunks.ts";

interface ProductsState {
    items: Product[];
    item: Product | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
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
            .addCase(fetchAllProducts.fulfilled, (state, {payload}) => {
                state.items = payload;
                state.fetchLoading = false;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, {payload}) => {
                state.item = payload;
                state.fetchLoading = false;
            })
            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.createLoading = false;
            });
    }
});

export const productsReducer = productSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;