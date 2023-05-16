import { useProduct } from "../../context/ProductContext"

export const Product = () => {
    const {item} = useProduct()
    return (
        <>
        {item}
        </>
    )
}