import axios from 'axios';
import { cartItemAdd, setLoading, setError, cartItemRemoval, setExpressShipping, clearCart } from '../slices/cart';

export const addCartItem = (id, qty) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axios.get(`http://localhost:3001/api/products/${id}`);
        const itemToAdd = {
            id: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            stock: data.stock,
            qty: qty
        }
        dispatch(cartItemAdd(itemToAdd));
    } catch (error) {
        dispatch(setError(error.response && error.response.data.message
            ? error.response.data.message : error.message
                ? error : 'Unexpected error from Cart'
        ))
    }
}
export const removeCartItem = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(cartItemRemoval(id));
};

export const setExpress = (value) => async (dispatch) => {
    dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch) => {
    dispatch(clearCart());
};