import { useEffect, useState } from "react"
import { useProduct } from "../../context/ProductContext"
import { ProductFilter } from "./Components/ProductFilter"
import { ProductCard } from "./Components/ProductCard"
import "./Product.css";

export const Product = () => {
    const { productState, productDispatch,setLoader } = useProduct()
    const { initialProducts, selectRating, selectPrice, categoryType, sorttype,searchFilter } = productState
    // console.log(categoryType);
    // const [selectRating, setRating] = useState('')
    // const [sorttype, setSortType] = useState('')
    // const [categoryTypee, setCategory] = useState([])
    // const [selectPrice, setPrice] = useState(500)
    // console.log(price);

    const filterProducts = initialProducts?.filter((product) =>
        selectRating ? product.rating >= selectRating : product
    ).sort((a, b) => {
        if (sorttype === 'Low_To_High') return a.price - b.price;
        else if (sorttype === 'High_to_Low') return b.price - a.price;
        else return a.price - a.price;
    }
    ).filter((product) => categoryType.length > 0 ? categoryType.includes(product.category) : product)
        .filter((product) => product.price <= selectPrice)
        .filter((product)=> product.name.toLowerCase().includes(searchFilter.toLowerCase()))

    // console.log(filterProducts)

    // const clearAllfilter = () => {
    //     setCategory([])
    //     setPrice(500)
    //     setSortType('')
    //     setRating('')
    // }

    useEffect(()=> {
      setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    },[])

    return (
       
        <div className="product-main-container">
        <ProductFilter />
        <div className="product-list-container">
          <div className="product-list-header">
            {filterProducts.length > 0 ? (
              <>
                <h3>Showing All Products</h3>
                <p className="paragraph-sm">({filterProducts.length} products)</p>
              </>
            ) : (
                filterProducts.length > 0 && <h1>Sorry , Products are not available for chosen category.</h1>
            )}
          </div>
  
          <div className="responsive-grid">
            {filterProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    )
}