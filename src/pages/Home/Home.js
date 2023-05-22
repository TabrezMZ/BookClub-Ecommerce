import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom"
import { useProduct } from "../../context/ProductContext"

export const Home = () => {
    const navigate = useNavigate();
    const { productState,productDispatch } = useProduct()
    const [categories, setCategories] = useState([]);
    // console.log(categories)

    useEffect(() => {
        axios
            .get('/api/categories')
            .then((res) => setCategories(res.data.categories),productDispatch({ type: 'CLEAR_FILTER' }))
            .catch((err) => console.error(err))
    }, [])

    const categoriesHandlre = (categoryName) => {
        console.log(categoryName)
        productDispatch({type : 'CATEGORY_FILTER_ADD', payload : categoryName})
        navigate("/products")
    }

    return (
        <>
        <div className="home-container">
          <div className="home-img-container">
            <div className="bg-img-container"></div>
            <div className="home-page-text">
              <div className="main-text">
                <h4>
                  Welcome to <span className="title">BookClub</span>,
                </h4>
                <div>
                  <h1 className="main-text-title">For All Your</h1>
                  <h1 className="main-text-title">Reading Needs</h1>
                </div>
                <Link to="/products">
                  <button className="link-btn shop-now-btn">SHOP NOW</button>
                </Link>
              </div>
            </div>
            <div className="overlay"></div>
          </div>
  
          <div className="category-container flex-center">
            <div className="container">
              <div className="category-heading text-center">
                <h2>Featured Book Categories</h2>
                <p className="paragraph-md">
                  There are many categories of books available at Pustaka. Choose your favorite one
                  now.
                </p>
              </div>
              <div className="category-row">
                {categories &&
                  categories.map(({ _id, categoryName, description }) => {
                    return (
                      <div className="box" key={_id} onClick={() => categoriesHandlre(categoryName)}>
                        <div className="detail-box text-center">
                          <h4>{categoryName}</h4>
                          <p className="paragraph-sm">{description}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <footer className="footer footer-mn">
          <section className="footer-mn-lt">
            <h2>Pustaka</h2>
            <p className=" hm-page-paragraph">
              Fill your house with stacks of books, in all the crannies and all the nooks.
            </p>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p className="paragraph-sm">© 2022 Pustaka</p>
          </section>
          <section className="footer-mn-rt">
            <ul>
              <li>Connect</li>
              <li>
                <a href="https://github.com/rutvikpumak" target="_blank" className="github-logo">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/rutvikumak13" target="_blank" className="twitter">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/rutvikumak" target="_blank" className="linkedin">
                  LinkedIn
                </a>
              </li>
            </ul>
          </section>
          <section className="footer-mn-rt">
            <ul>
              <li>Resources</li>
              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
              <Link to="/login">
                <li>Sign In</li>
              </Link>
            </ul>
          </section>
        </footer>
      </>
    )
}
