import React, {useState, useEffect} from 'react';
import { commerce } from "./lib/commerce";
import {Products, Navbar, Cart, Checkout} from "./components"
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

const App = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [cart, setCart] = useState({});
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()

        setProducts(data)
    }

    const fetchCart = async () => {
        const item = await commerce.cart.retrieve()
        setCart(item)
        // console.log(item)
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity)

        setCart(cart)
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const {cart} = await commerce.cart.update(lineItemId, {quantity})
        setCart(cart)
    }

    const handleRemoveFromCart = async (lineItemId) => {
        const { cart } = await commerce.cart.remove(lineItemId)

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }


    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }


    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setError(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    console.log(cart)


    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart}/>
                </Route>
                <Route path="/cart">
                    <Cart cart={cart}
                          handleUpdateCartQty={handleUpdateCartQty}
                          handleRemoveFromCart={handleRemoveFromCart}
                          handleEmptyCart={handleEmptyCart}
                    />
                </Route>
                <Route path="/checkout">
                    <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={error}
                    />
                </Route>
            </Switch>
            <Navbar totalItems={cart.total_items}/>
        </Router>
    );
};

export default App;
