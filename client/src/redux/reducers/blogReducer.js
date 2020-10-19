const initialState = {
    blogs: [],
    blogLoader: false,
    blogSuccess: false,
    category: null,
    filteredBlogs: [],
    author: null,
    blog: {},
    detailedBlog:null
}



const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BLOG_LOADER":
            return {
                ...state,
                blogLoader: action.payload,
                blogSuccess: false
            }
        case "SET_CATEGORY_NULL":
            return {
                ...state,
                category: null,
                blogSuccess: false
            }
        case "SET_BLOG":
            return {
                ...state,
                blogLoader: false,
                blogSuccess: true,
                blogs: [action.payload, ...state.blogs]
            }
        case "SET_BLOGS":
            return {
                ...state,
                blogLoader: false,
                blogSuccess: false,
                blogs: action.payload
            }
        case "SET_CATEGORY":
            return {
                ...state,
                blogSuccess: false,
                category: action.payload,
                filteredBlogs: state.blogs.filter(obj => {
                    return obj.category === action.payload
                })
                   
            }
        case "SET_AUTHOR":
            return {
                ...state,
                blogSuccess: false,
                author: action.payload,
                filteredBlogs: state.blogs.filter(obj => {
                    return obj.author === action.payload
                })
            }
        case "SET_CURRENT_BLOG":
            return {
                ...state,
                blogSuccess: false,
                blog: state.blogs.find(obj => {
                    return obj._id === action.payload
                })

            }
        case "DELETE_BLOG":
            return {
                ...state,
                blogSuccess: false,
                blogs: state.blogs.filter(obj => {
                    return obj._id !== action.payload
                })
            }
        case "UPDATE_BLOG":
            return {
                ...state,
                blogLoader: false,
                blogSuccess: true,
                blog: {},
                blogs: state.blogs.map(blog=>blog._id === action.payload._id ? action.payload : blog)
            }
        case "SET_DETAILED_BLOG":
            return {
                ...state,
                blogLoader: false,
                blogSuccess: false,
                detailedBlog: state.blogs.find(obj => {
                    return obj._id === action.payload
                })
            }
        case "SET_DETAILED_BLOG_DB":
            return {
                ...state,
                blogLoader: false,
                blogSuccess: false,
                detailedBlog: action.payload
            }
        default:
          return state
    }
}

export default blogReducer