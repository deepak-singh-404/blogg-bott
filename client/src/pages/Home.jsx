import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import BlogForm from '../components/BlogForm'
import UpdateBlog from '../components/UpdateBlog'
import Loader from '../components/Loader'

import { getBlog } from '../redux/actions/blogAction'
import Card from '../components/Card'

const Home = () => {
    const blogStore = useSelector(store => store.blogRoot)
    const dispatch = useDispatch()

    useEffect(() => {
        if (blogStore.blogs.length === 0) {
            dispatch(getBlog())
        }
    }, [])
    
    return (
        <>
            <LoginForm />
            <SignUpForm />
            <BlogForm />
            <UpdateBlog />
            <div className="container-fluid" style={{ marginTop: "100px" }}>
                {blogStore.blogs.length === 0 && <Loader />}
                <div className="row mb-2">
                    {blogStore.category || blogStore.author  ? blogStore.filteredBlogs.map(blog =>
                        <Card key={blog._id} blog={blog} />
                    ) :
                        blogStore.blogs.map(blog =>
                            <Card key={blog._id} blog={blog} />
                   )
                }
                </div>
            </div>
        </>
    )
}

export default Home
