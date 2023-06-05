
import axios from "axios"
export const getwishlist = async () => {
    try {
        const response = await axios.get(`/api/user/wishlist`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    } catch (error) {
        console.error(error)
    }
}

export const addToWishList = async (productItem, productDispatch, toast) => {
    try {
        const response = await axios.post(`/api/user/wishlist`, { product: productItem }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        productDispatch({ type: 'ADD_TO_WISHLIST_PRODUCT', payload: response.data.wishlist })
        toast.success('product add in wishlist succesfully')
    } catch (error) {
        console.error(error)
    }
}


export const removeFromWishlist = async (productItem, productDispatch, toast) => {
    try {
        const response = await axios.delete(`/api/user/wishlist/${productItem._id}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        productDispatch({ type: 'REMOVE_FROM_WISHLIST_PRODUCT', payload: response.data.wishlist })
        toast.success('product remove from wishlist succesfully')
    } catch (error) {
        console.error(error);
    }
}