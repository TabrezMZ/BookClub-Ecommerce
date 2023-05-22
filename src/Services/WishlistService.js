
import axios from "axios"
export const getwishlist = async () => {
    try {
        const response = await axios.get(`/api/user/wishlist`, {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
    } catch (error) {
        console.error(error)
    }
}

export const addToWishList = async (productItem, productDispatch) => {
    try {
        const response = await axios.post(`/api/user/wishlist`,{product : productItem} , {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.wishlist);
        productDispatch({type : 'ADD_TO_WISHLIST_PRODUCT', payload :response.data.wishlist})
        alert('product add in wishlist succesfully')
    } catch (error) {
        console.error(error)
    }
}


export const removeFromWishlist = async (productItem,productDispatch)=> {
    try {
        const response = await axios.delete(`/api/user/wishlist/${productItem._id}`,{
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.wishlist);
        productDispatch({type : 'REMOVE_FROM_WISHLIST_PRODUCT', payload :response.data.wishlist })
        alert('product remove from wishlist succesfully')
    } catch (error) {
        console.error(error);
    }
}