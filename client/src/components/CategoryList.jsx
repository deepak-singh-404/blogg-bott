import React from 'react'
import { useDispatch } from 'react-redux'
import {setCategory} from '../redux/actions/blogAction'

const CategoryList = ({ blog }) => {
    const dispatch = useDispatch()
    const clickHandler = () => {
        dispatch(setCategory(blog.title))
    }
    return (
        <>
            <button onClick={clickHandler} className="btn dropdown-item">{blog.title}</button>
        </>
    )
}

export default CategoryList
