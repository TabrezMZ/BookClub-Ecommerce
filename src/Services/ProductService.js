import axios from "axios"

export const getProducts = async (productDispatch) => {
    try {
        const response = await axios.get(`/api/products`)
        // console.log(response.data.products);
        productDispatch({type : 'GET_PRODUCTS', payload :response.data.products })
    } catch (error) {
        console.error(error)
    }
} 

export const getCart = async () => {
    try {
        const response = await axios.get(`/api/user/cart`, {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
    } catch (error) {
        console.error(error)
    }
}
export const addToCart = async (productItem, productDispatch) => {
    try {
        const response = await axios.post(`/api/user/cart`,{product : productItem} , {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
        productDispatch({type : 'ADD_TO_CART_PRODUCT', payload :productItem._id })
        alert('product add in cart succesfully')
    } catch (error) {
        console.error(error)
    }
}

export const removeFromCart = async (productItem,productDispatch)=> {
    try {
        const response = await axios.delete(`/api/user/cart/${productItem._id}`,{
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
        productDispatch({type : 'REMOVE_FROM_CART_PRODUCT', payload :productItem._id })
        alert('product remove from cart succesfully')
    } catch (error) {
        console.error(error);
    }
}

export const addQuantityInCart = async (productItem,productDispatch) => {
    try {
        const response = await axios.post(`/api/user/cart/${productItem._id}`,
        {
            action : {
                type : 'increment'
            },
           
        },
        {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
    } catch (error) {
        console.error(error)
    }
}
export const removeQuantityInCart = async (productItem,productDispatch) => {
    try {
        const response = await axios.post(`/api/user/cart/${productItem.id}`,
        {
            action : {
                type : 'decrement'
            },
           
        },
        {
            headers : {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(response.data.cart);
    } catch (error) {
        console.error(error)
    }
}

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
        productDispatch({type : 'ADD_TO_WISHLIST_PRODUCT', payload :productItem.id })
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
        productDispatch({type : 'REMOVE_FROM_WISHLIST_PRODUCT', payload :productItem._id })
        alert('product remove from wishlist succesfully')
    } catch (error) {
        console.error(error);
    }
}