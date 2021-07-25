import React from "react";
import {Grid} from "@material-ui/core";
import Product from "./Product/Product";

const Products = ({products, onAddToCart}) => {
    return (
        <Grid container justifyContent="center" spacing={2}>
            {products.map((product) => (
                <Grid item key={product.id} xs={11} sm={6} md={4} lg={3} xl={2}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default Products;
