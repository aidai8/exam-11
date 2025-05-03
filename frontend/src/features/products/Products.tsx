import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {useProductsStore} from "./productsStore.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAllCategories} from "../categories/categoriesThunks.ts";
import {selectCategories} from "../categories/categoriesSlice.ts";
import {selectUser} from "../users/usersSlice.ts";
import ProductItem from "./ProductItem.tsx";


const Products = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const categories = useAppSelector(selectCategories);
    const {items, fetchLoading, fetchAllProducts} = useProductsStore();
    const {search} = useLocation();


    useEffect(() => {
        void fetchAllProducts(search);
        dispatch(fetchAllCategories());
    }, [fetchAllProducts, dispatch, search])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Products
                    </Typography>
                </Grid>
                <Grid>
                    {user && user.token ?
                        <Button variant="outlined" color="success" component={Link} to='/products/new'>
                            Add product
                        </Button>
                        :
                        ''
                    }

                </Grid>
            </Grid>
            {fetchLoading ? <Spinner/> :
                <Grid container justifyContent="space-between">

                    <Grid size={3}>
                        {categories.length > 0 ?
                            <ul>
                                <li><Button variant="text" color="success" component={Link} to={`/`}>All categories</Button></li>
                                {categories.map(category => (
                                    <li key={category._id}><Button variant="text" color="success" component={Link} to={`?category=${category._id}`}>{category.title}</Button></li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </Grid>

                    <Grid size={8}>
                        {items.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                            <Grid container direction="row" spacing={1}>
                                {items.map(product => (
                                    <ProductItem
                                        key={product._id}
                                        title={product.title}
                                        category_title={product.category.title}
                                        price={product.price}
                                        id={product._id}
                                        image={product.image}
                                    />
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }

        </Grid>
    );
};

export default Products;