import {Category} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAllCategories} from "./categoriesThunks.ts";

interface CategoriesState {
    items: Category[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllCategories.fulfilled, (state, {payload: categories}) => {
                state.items = categories;
                state.fetchLoading = false;
            })
    }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesLoading = (state: RootState) => state.categories.fetchLoading;