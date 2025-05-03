import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../categories/categoriesSlice";
import {selectUser} from "../users/usersSlice";
import {createProduct} from "./productsThunks";
import Grid from "@mui/material/Grid2";
import {Button, MenuItem, TextField, Container, Typography, Paper} from "@mui/material";
import {ProductMutation} from "../../types";
import {useDropzone} from "react-dropzone";

const NewProduct = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const categories = useAppSelector(selectCategories);

    const [state, setState] = useState<ProductMutation>({
        category: '',
        title: '',
        description: '',
        price: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setState(prev => ({...prev, image: file}));
                setImagePreview(URL.createObjectURL(file));
            }
        }
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            return;
        }

        try {
            await dispatch(createProduct(state)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container component="main" maxWidth="md" sx={{mt: 4}}>
            <Paper elevation={3} sx={{p: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Product
                </Typography>

                <form onSubmit={submitFormHandler}>
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12}}>
                            <TextField
                                required
                                fullWidth
                                select
                                label="Category"
                                name="category"
                                value={state.category}
                                onChange={inputChangeHandler}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                required
                                fullWidth
                                label="Title"
                                name="title"
                                value={state.title}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={state.description}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Price (USD)"
                                name="price"
                                value={state.price}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <div {...getRootProps()} style={{
                                border: '2px dashed #ccc',
                                borderRadius: '4px',
                                padding: '20px',
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}>
                                <input {...getInputProps()} required />
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                ) : (
                                    <p>Drag & drop product image here, or click to select</p>
                                )}
                            </div>
                        </Grid>

                        <Grid size={{xs: 12}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="success"
                                size="large"
                            >
                                Create Product
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default NewProduct;