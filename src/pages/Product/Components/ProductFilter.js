import { useProduct } from "../../../context/ProductContext"
import "../Product.css";

export const ProductFilter = () => {
    const { productState, productDispatch,drawer, setDrawer, } = useProduct()
    const { initialProducts, selectRating, selectPrice, categoryType, sorttype, searchFilter } = productState;
    // console.log(drawer);


    const addcategory = (category, e) => {
        if (e.target.checked) {
            // setCategory([...categoryTypee, category])
            productDispatch({ type: 'CATEGORY_FILTER_ADD', payload: category })
        } else {
            // setCategory(categoryTypee.filter(cat => cat !== category))
            productDispatch({ type: 'CATEGORY_FILTER_REMOVE', payload: category })
        }
    }

    function getDrawerClass () {
        return drawer ? "trans-on" : "trans-off"
    }

    return (
        <div className={`filter-container ${getDrawerClass()}`}>
            <div className="filter-head">
                <h4>Filters</h4>
                <p
                    onClick={() => {
                        productDispatch({ type: 'CLEAR_FILTER' })
                    }}
                    className="paragraph-md clr-flt-btn"
                >
                    Clear
                </p>
            </div>

            <div className="filter-price">
                <h4>Price</h4>
                <div className="flex-gap">
                    <div className="price-range">
                        <p>100</p>
                        <p>500</p>
                        <p>1000</p>
                    </div>
                    <input
                        type="range"
                        name="rangeInput"
                        className="slider"
                        min="100"
                        max="1000"
                        value={selectPrice}
                        onChange={(e) => productDispatch({ type: 'PRICE_FILTER', payload: e.target.value })}
                    />
                </div>
            </div>

            <div className="filter-category">
                <h4>Category</h4>
                <div className="flex-gap"></div>
            </div>

            <div className="filter-category">
                <h4>Category</h4>
                {['Self Help', 'Non Fiction', 'Fiction'].map((category, id) => <div className="flex-gap" key={id}>
                    <label ><input className="checkbox-input" checked={categoryType?.includes(category)} onChange={(e) => addcategory(category, e)} value={category} type="checkbox" /><span className="check-desc">{category}</span></label>
                </div>)}
            </div>

            <div className="filter-rating">
                <h4>Rating</h4>
                <div className="flex-gap">
                    {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="select-input">
                            <input
                                type="radio"
                                name="rating"
                                className="radio-input"
                                checked={rating === selectRating}
                                value={rating}
                                onChange={() => productDispatch({ type: 'RATING_FILTER', payload: rating })}
                            />
                            <span className="check-desc">{rating} Stars & above</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-sort">
                <h4>Sort by</h4>
                {['Low_To_High', 'High_to_Low'].map((sortby, index) => (
                    <div className="flex-gap" key={index}>
                        <label className="select-input"><input checked={sortby === sorttype} onChange={() => productDispatch({ type: 'SORT_FILTER', payload: sortby })} value={sortby} type="radio"
                            name="sort"
                            className="radio-input" />{sortby}</label>
                    </div>
                ))}
            </div>
        </div>


    )
}