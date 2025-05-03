import Grid from "@mui/material/Grid2";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts"
import React from "react";


interface Props {
    title: string;
    price: number;
    id: string;
    category_title: string;
    image: string;
}

const ProductItem: React.FC<Props> = ({title, price,  id, image}) => {
    const imageUrl = apiUrl + '/' + image;

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={title}
                />
                <CardHeader title={title} />
                <CardContent>
                    <p>
                        <strong>
                            Price: {price} USD
                        </strong>
                    </p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;