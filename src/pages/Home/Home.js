import { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';

export const Home = () => {
    const [categories, setCategories] = useState([]);
    // console.log(categories)

    useEffect(() => {
        axios
            .get('/api/categories')
            .then((res) => setCategories(res.data.categories))
            .catch((err) => console.error(err))
    }, [])

    const categoriesHandlre = (categoryName) => {
        console.log(categoryName)
    }

    return (
        <div className='home-container'>
            <div className='container-ct'>
                <div className='category-container'>
                    <h2>Book Categories</h2>
                    <p>Here you explore books by categories</p>
                </div>
                <div className='category-list'>
                    {
                        categories && categories.map(({ _id, categoryName, description }) => {
                            return (
                                <div className='category-box' key={_id} onClick={() => categoriesHandlre(categoryName)}>
                                    <div className='cat-details'>
                                        <h4>{categoryName}</h4>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='image-container'>
                 <img src='https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'/>
            </div>
            <div>
                <h2>Book List</h2>
            </div>
        </div>
    )
}
