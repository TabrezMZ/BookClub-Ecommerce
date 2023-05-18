import { useState } from "react"
import { useProduct } from "../../context/ProductContext"
import { Link } from "react-router-dom"
import { addToCart ,addToWishList} from "../../Services/ProductService"

export const Product = () => {
    const { productState, productDispatch } = useProduct()
    const { initialProducts, selectRating, selectPrice, categoryType, sorttype,searchFilter } = productState
    // console.log(categoryType);
    // const [selectRating, setRating] = useState('')
    // const [sorttype, setSortType] = useState('')
    // const [categoryTypee, setCategory] = useState([])
    // const [selectPrice, setPrice] = useState(500)
    // console.log(price);

    const addcategory = (category, e) => {
        if (e.target.checked) {
            // setCategory([...categoryTypee, category])
            productDispatch({ type: 'CATEGORY_FILTER_ADD', payload: category })
        } else {
            // setCategory(categoryTypee.filter(cat => cat !== category))
            productDispatch({ type: 'CATEGORY_FILTER_REMOVE', payload: category })
        }
    }

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

    const addToCartProduct = (item) => {
        addToCart(item, productDispatch)
    }
    const addToWishListProduct = (item) => {
        addToWishList(item, productDispatch)
    }

    return (
        <div>
            <div style={{ margin: '25px', float: 'left' }}>
                filters :  <button onClick={() => productDispatch({ type: 'CLEAR_FILTER' })}>Clear</button>
                <div>
                    <h4>Price</h4>
                    <input type="range" onChange={(e) => productDispatch({ type: 'PRICE_FILTER', payload: e.target.value })} value={selectPrice} min="100" max="1000" />
                </div>
                <div>
                    <h4>Category</h4>
                    {['Self Help', 'Non Fiction', 'Fiction'].map((category, id) => <div key={id}>
                        <label><input checked={categoryType?.includes(category)} onChange={(e) => addcategory(category, e)} value={category} type="checkbox" />{category}</label>
                    </div>)}
                </div>
                <div>
                    <h4>Rating</h4>
                    {[4, 3, 2, 1].map((rating, id) =>
                        <div key={id}>
                            <label><input checked={rating === selectRating} value={rating} onChange={() => productDispatch({ type: 'RATING_FILTER', payload: rating })} type="radio" name="rad" />{rating} Star & above</label>
                        </div>)}
                </div>
                <div>
                    <h4>Sort By</h4>
                    {['Low_To_High', 'High_to_Low'].map((sortby, index) => (
                        <div key={index}>
                            <label><input checked={sortby === sorttype} onChange={() => productDispatch({ type: 'SORT_FILTER', payload: sortby })} value={sortby} type="radio" name="rade" />{sortby}</label>
                        </div>
                    ))}
                </div>
            </div>
            {filterProducts.map((product) => {
                return (
                    <div style={{ width: '500px', margin: '15px auto' }} key={product._id}>
                        <p>{product.rating}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                        <Link to={`/product/${product._id}`}>view product</Link>
                        <button onClick={()=>addToCartProduct(product)}>{product.inCart ? 'remove from cart' : 'add to cart'}</button>
                        <button onClick={()=>addToWishListProduct(product)}>{product.inWishlist ? 'remove from wishlist' : 'add to wishlist'}</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}