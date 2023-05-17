import { useState } from "react"
import { useProduct } from "../../context/ProductContext"

export const Product = () => {
    const { productState } = useProduct()
    const { initialProducts } = productState
    const [selectRating, setRating] = useState('')
    const [sorttype, setSortType] = useState('')
    const [categoryType, setCategory] = useState([])
    const [price, setPrice] = useState(500)
    // console.log(price);

    const addcategory = (category, e) => {
        if (e.target.checked) {
            setCategory([...categoryType, category])
        } else {
            setCategory(categoryType.filter(cat => cat !== category))
        }
    }

    const filterProducts = initialProducts.filter((product) =>
        selectRating ? product.rating >= selectRating : product
    ).sort((a, b) => {
        if (sorttype === 'Low_To_High') return a.price - b.price;
        else if (sorttype === 'High_to_Low') return b.price - a.price;
        else return a.price - a.price;
    }
    ).filter((product) => categoryType.length > 0 ? categoryType.includes(product.category) : product).filter((product) => product.price <= price)

    console.log(filterProducts)

    const clearAllfilter = () => {
        setCategory([])
        setPrice(500)
        setSortType('')
        setRating('')
    }

    return (
        <div>
            <div style={{ margin: '25px', float: 'left' }}>
                filters :  <button onClick={clearAllfilter}>Clear</button>
                <div>
                    <h4>Price</h4>
                    <input type="range" onChange={(e) => setPrice(e.target.value)} value={price} min="100" max="1000" />
                </div>
                <div>
                    <h4>Category</h4>
                    {['Self Help', 'Non Fiction', 'Fiction'].map((category, id) => <div key={id}>
                        <label><input checked={categoryType.includes(category)} onClick={(e) => addcategory(category, e)} value={category} type="checkbox" />{category}</label>
                    </div>)}
                </div>
                <div>
                    <h4>Rating</h4>
                    {[4, 3, 2, 1].map((rating, id) =>
                        <div key={id}>
                            <label><input checked={rating === selectRating} value={rating} onClick={() => setRating(rating)} type="radio" name="rad" />{rating} Star & above</label>
                        </div>)}
                </div>
                <div>
                    <h4>Sort By</h4>
                    {['Low_To_High', 'High_to_Low'].map((sortby, index) => (
                        <div key={index}>
                            <label><input checked={sortby === sorttype} onClick={() => setSortType(sortby)} value={sortby} type="radio" name="rade" />{sortby}</label>
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
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}