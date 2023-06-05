import axios from "axios"
export const getCart = async () => {
    try {
        const response = await axios.get(`/api/user/cart`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    } catch (error) {
        console.error(error)
    }
}
export const addToCart = async (productItem, productDispatch, toast) => {
    try {
        const response = await axios.post(`/api/user/cart`, { product: productItem }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        productDispatch({ type: 'ADD_TO_CART_PRODUCT', payload: response.data.cart })
        toast.success('product add in cart succesfully')
    } catch (error) {
        console.error(error)
    }
}

export const removeFromCart = async (productItem, productDispatch, toast) => {
    try {
        const response = await axios.delete(`/api/user/cart/${productItem._id}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        productDispatch({ type: 'REMOVE_FROM_CART_PRODUCT', payload: response.data.cart })
        toast.success('product remove from cart succesfully')
    } catch (error) {
        console.error(error);
    }
}

export const addQuantityInCart = async (productItem, productDispatch) => {
    try {
        const response = await axios.post(`/api/user/cart/${productItem._id}`,
            {
                action: {
                    type: 'increment'
                },
            },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
        productDispatch({ type: 'ADD_TO_CART_PRODUCT', payload: response.data.cart })
    } catch (error) {
        console.error(error)
    }
}
export const removeQuantityInCart = async (productItem, productDispatch) => {
    try {
        const response = await axios.post(`/api/user/cart/${productItem._id}`,
            {
                action: {
                    type: 'decrement'
                },
            },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
        productDispatch({ type: 'ADD_TO_CART_PRODUCT', payload: response.data.cart })
    } catch (error) {
        console.error(error)
    }
}