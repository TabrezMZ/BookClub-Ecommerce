import axios from "axios"

export const getProducts = async (productDispatch) => {
    try {
        const response = await axios.get(`/api/products`)
        productDispatch({ type: 'GET_PRODUCTS', payload: response.data.products })
    } catch (error) {
        console.error(error)
    }
}

