import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"

export const ProductPage = () => {
    const {productId} = useParams()
    const { productState } = useProduct()
    const { initialProducts } = productState
    const product = initialProducts?.find((product)=> product._id===productId)
    // console.log(product);
    return(
        <div>
          <p> {product?.name}</p>
          <p> {product?.category}</p>
          <p> {product?.price}</p>
        </div>
    )
}