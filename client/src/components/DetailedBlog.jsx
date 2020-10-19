import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deailedBlogHelper, detailedBlogDb} from '../redux/actions/blogAction'

const DetailedBlog = (props) => {
    const history = useHistory()
    const store = useSelector(store => store.blogRoot)
    const [blog,setBlog] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (store.blogs.length === 0) {
            dispatch(detailedBlogDb(props.match.params.id))
        }
        else {
            dispatch(deailedBlogHelper(props.match.params.id))
       }
        
    }, [props.match.params.id])
    
    useEffect(() => {
        if (store.detailedBlog) {
            setBlog(store.detailedBlog)
        }
    },[store.detailedBlog])
    
    return (
    <>
            {
            
            blog ? <div className="container" style={{ marginTop: "100px" }}>
                <div className="row mb-2">
                    <div className="col-md-8 offset-md-2">
                        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary"> {blog.author}</strong>
                                <h3 className="mb-0">{blog.title}</h3>
                                <div className="mb-1 text-muted">{blog.category}</div>
                                <p className="card-text">{blog.blog}

                                </p>
                                <div>
                                    <button onClick={()=>history.push('/')} className="btn btn-outline-success">GO BACK</button>
                                </div>

                            </div>
                            <div className="">
                                {blog.image && <img className="img-fluid" width="250px" src={blog.image}></img>}
                            </div>
                        </div>
                    </div>

                </div>
            </div> : null }
        </>
    )
}

export default DetailedBlog
