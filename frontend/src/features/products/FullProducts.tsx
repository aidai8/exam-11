import {NavLink, useParams, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneProduct, selectProductsLoading} from "./productsSlice.ts";
import {Card, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {fetchProductById} from "./productsThunks.ts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";
import {selectUser} from "../users/usersSlice.ts";
import {deleteProduct} from "./productsThunks.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify";
import Box from "@mui/material/Box";


const FullProduct = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    const handleDelete = async () => {
        if (id && window.confirm('Are you sure you want to delete this product?')) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
                toast.success('Product deleted successfully!');
                navigate('/');
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    if (fetchLoading) {
        return <Spinner/>;
    }

    if (!product) {
        return <Typography variant="h6">Product not found</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Card sx={{width: "100%", maxWidth: 800, margin: "0 auto"}}>
                <CardMedia
                    component="img"
                    height="400"
                    image={apiUrl + '/' + product.image}
                    alt={product.title}
                    sx={{objectFit: 'contain'}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Price: {product.price} USD
                    </Typography>

                    {product.category && (
                        <Typography variant="body2" color="text.secondary">
                            Category: {product.category.title}
                        </Typography>
                    )}

                    {product.seller && (
                        <Box sx={{
                            mt: 3,
                            p: 2,
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            backgroundColor: '#fafafa'
                        }}>
                            <Typography variant="h6" sx={{mb: 1}}>Seller Information:</Typography>
                            <Typography>
                                <strong>Name:</strong> {product.seller.displayName}
                            </Typography>
                            <Typography>
                                <strong>Phone:</strong> {product.seller.phoneNumber}
                            </Typography>
                        </Box>
                    )}
                </CardContent>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    borderTop: '1px solid #e0e0e0'
                }}>
                    <IconButton
                        component={NavLink}
                        to="/"
                        sx={{color: 'success.main'}}
                    >
                        <ArrowBackIcon sx={{mr: 1}} />
                        <Typography variant="body2">Back to products</Typography>
                    </IconButton>

                    {product.seller._id === user?._id && (
                        <IconButton
                            onClick={handleDelete}
                            sx={{color: 'error.main'}}
                        >
                            <DeleteIcon sx={{mr: 1}} />
                            <Typography variant="body2">Delete product</Typography>
                        </IconButton>
                    )}
                </Box>
            </Card>
        </Container>
    );
};

export default FullProduct;