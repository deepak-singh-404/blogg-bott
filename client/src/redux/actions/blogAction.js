import axios from 'axios'



export const setBlog = (data) => {
    return {
        type: "SET_BLOG",
        payload: data
    }
}

export const setBlogs = (data) => {
    return {
        type: "SET_BLOGS",
        payload: data
    }
}
export const setCategory = (data) => {
    return {
        type: "SET_CATEGORY",
        payload: data
     }
 }

export const setCategoryNull = () => {
    return {
         type: "SET_CATEGORY_NULL"
     }
}
 
export const setAuthor = (data) => {
    return {
        type: "SET_AUTHOR",
        payload: data
    }
}

export const setAuthorNull = (data) => {
    return {
        type: "SET_AUTHOR"
    }
}

export const setCurrentBlog = (data) => {
    return {
        type: "SET_CURRENT_BLOG",
        payload: data
    }
}

const setBlogLoader = (data) => {
    return {
        type: "SET_BLOG_LOADER",
        payload: data
    }
}


const deleteBlogHelper = (data) => {
    return {
        type: "DELETE_BLOG",
        payload: data
    }
}

const updateBlogHelper = (data) => {
    return {
        type: "UPDATE_BLOG",
        payload: data
    }
}

export const deailedBlogHelper = (data) => {
    return {
        type: "SET_DETAILED_BLOG",
        payload: data
    }
}

const deailedBlogHelperDb = (data) => {
    return {
        type: "SET_DETAILED_BLOG_DB",
        payload: data
    }
}



export const addBlog = (blogData) => {
    return async (dispatch) => {
        try {
            dispatch(setBlogLoader(true))
            const { data } = await axios({
                method: "Post",
                url: "/api/blog",
                data: blogData
            })
            if (data.success) {
                dispatch(setBlog(data.message))
            }
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const getBlog = () => {
    return async (dispatch) => {
        try {
            dispatch(setBlogLoader(true))
            const { data } = await axios({
                method: "Get",
                url: "/api/blog",
            })
            if (data.success) {
                dispatch(setBlogs(data.message))
            }
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const deleteBlog = (_id) => {
    return async (dispatch) => {
        try {
           dispatch(setBlogLoader(true))
            const { data } = await axios({
                method: "Delete",
                url: `/api/blog/${_id}`,
            })
            if (data.success) {
                dispatch(deleteBlogHelper(_id))
            }
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const updateBlog = (blogData,_id) => {
    return async (dispatch) => {
        try {
            dispatch(setBlogLoader(true))
            const { data } = await axios({
                method: "Put",
                url: `/api/blog/${_id}`,
                data: blogData
            })
            if (data.success) {
                dispatch(updateBlogHelper(data.message))
            }
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }

    }
}

export const detailedBlogDb= (_id) => {
    return async (dispatch) => {
        try {
            dispatch(setBlogLoader(true))
            const { data } = await axios({
                method: "Get",
                url: `/api/blog/${_id}`,
            })
            if (data.success) {
                dispatch(deailedBlogHelperDb(data.message))
            }
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }

    }
}