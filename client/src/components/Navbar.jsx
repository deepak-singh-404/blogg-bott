import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../redux/actions/userAction'
import { setCategoryNull,setAuthor } from '../redux/actions/blogAction'


import CategoryList from './CategoryList'

import Blogs from '../utils/categories'


const Navbar = () => {
    const history = useHistory()
    const user = useSelector(store => store.userRoot)
    const blog = useSelector(store => store.blogRoot)
    
    const [author, setauthor] = useState("")
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(userLogout())
    }

    const clickHandler = () => {
        dispatch(setCategoryNull())
    }

    const formHandler = (e) => {
        e.preventDefault()
        dispatch(setAuthor(author))
        setauthor("")
    }

    return (
        <>

            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light bg-info fixed-top">
                <div className="container-fluid">
                   
                    <a className="btn" className="navbar-brand">BLOGGBOT</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {user.isAuthenticated && <li className="nav-item active">
                                <a className="btn btn-primary mx-1" data-toggle="modal" data-target="#createBlog">
                                    CREATE BLOG  </a>
                            </li>}
                           
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    {blog.category ? blog.category : "CHOOSE CATEGORY"}
                         </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <button onClick={clickHandler} className="btn dropdown-item">ALL</button>
                                    {Blogs.map((blog,index) =>
                                        <CategoryList key={index} blog={blog} />
                                    )}
                                </div>
                            </li>
                        </ul>
                        <form onSubmit={formHandler} className="form-inline my-2 my-lg-0">
                            <input onChange={(e) => setauthor(e.target.value)} value={author} className="form-control mr-sm-2" type="search" placeholder="Search Author . . ." aria-label="Search" />
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        {!user.isAuthenticated ?
                            <div className="mx-5">
                                <button type="button" className="btn btn-primary mx-1" data-toggle="modal" data-target="#signUpModal">
                                    Sign Up  </button>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                                    Login </button>
                            </div>
                            :
                            <div className="mx-1">
                                <button onClick={()=>alert("working on it, soon it will be functional")} type="button" className="btn btn-primary mx-1">
                                   {user.user.name.toUpperCase()} </button>
                                <button onClick={logoutHandler} type="button" className="btn btn-danger">
                                   LOGOUT </button>
                            </div>
                        }
                    </div>
                </div>
            </nav>

        </>


    )
}

export default React.memo(Navbar)
