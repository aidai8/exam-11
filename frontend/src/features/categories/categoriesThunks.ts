import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Category} from "../../types";

export const fetchAllCategories = createAsyncThunk<Category[], void>(
    'categories/fetchAllCategories',
    async () => {
        const response = await axiosAPI.get<Category[]>('/categories');
        return response.data;
    }
);
