import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blogs from '../utils/categories'
import Loader from '../components/Loader'

import { updateBlog } from '../redux/actions/blogAction'

const UpdateBlog = () => {

    const [title, setTitle] = useState("")
    const [blog, setBlog] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState('')

    const blogStore = useSelector(store => store.blogRoot)
    const dispatch = useDispatch()


    useEffect(() => {
        if (blogStore.blog.title) {
            setTitle(blogStore.blog.title)
            setBlog(blogStore.blog.blog)
            setCategory(blogStore.blog.category)
        }

    }, [blogStore.blog])


    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)
        }
    }


    const updateFormHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("blog", blog)
        formData.append("category", category)
        formData.append("image", image)
        dispatch(updateBlog({ title, blog, category, image }, blogStore.blog._id,))
    }
    return (
        <div className="modal fade" id="updateBlog" tabIndex="-1" aria-labelledby="updateBlog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateBlog">UPDATE BLOG</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={updateFormHandler}>
                            <div className="form-group">
                                <label htmlFor="nameId">TITLE</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="nameId" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categoryId">Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-control"
                                    id="categoryId">
                                    <option>Select</option>
                                    {Blogs.map((blog, index) =>
                                        <option key={index} value={blog.title}>{blog.title}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="blogId">BLOG</label>
                                <textarea onChange={(e) => setBlog(e.target.value)} value={blog} type="text" className="form-control" id="blogId" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputId">PICTURE</label>
                                <input className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                            </div>
                            {blogStore.blogSuccess && <div className="alert alert-success" role="alert">
                                Blog Updated Successfully
                            </div>}
                            {blogStore.blogLoader ? <Loader /> : <button type="submit" className="btn btn-primary">Update</button>}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateBlog
