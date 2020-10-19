import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
            
import {setCurrentBlog, deleteBlog} from '../redux/actions/blogAction'

const Card = ({ blog }) => {
    const user = useSelector(store => store.userRoot.user)
    const dispatch = useDispatch()

    return (
        <>
            <div className="col-md-6">
                <div style={{height:"300px"}} className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary"> {blog.author}</strong>
                        <h3 className="mb-0">{blog.title}</h3>
                        <div className="mb-1 text-muted">{blog.category}</div>
                        <p className="card-text">{blog.blog.length > 150 ? blog.blog.slice(0, 150) : blog.blog}
                            {blog.blog.length > 150 ? <Link to={`/blog/${blog._id}`} >Read More</Link> : null}
                        </p>
                        {user.id === blog.user ? <div>
                            <button onClick={()=>dispatch(setCurrentBlog(blog._id))} className="btn btn-outline-primary mx-1" data-toggle="modal" data-target="#updateBlog">UPDATE</button>
                            <button onClick={() => dispatch(deleteBlog(blog._id))} className="btn btn-outline-danger mx-1">DELETE</button>
                        </div> :
                                <div>
                                <button onClick={() => alert("working on it, soon it will be functional")} className="btn btn-outline-info mx-1">ADD TO FAVOURITE</button>
                                </div>
                        }
                    </div>
                    <div className="">
                        {blog.image && <img className="img-fluid"  width="250px"  src={blog.image}></img>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
