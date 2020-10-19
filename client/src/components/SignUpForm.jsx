import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { userRegister } from '../redux/actions/userAction'

import Loader from '../components/Loader'

const SignUpForm = () => {
    const user = useSelector((store)=>store.userRoot)
    const dispatch = useDispatch()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const formHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("password Mismatch")
        }
        else {
            dispatch(userRegister({ name, email, password, confirmPassword }))
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    }
    return (
        <div className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="signUpModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="signUpModal">SIGN UP</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="nameId">Name</label>
                                <input onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="nameId" aria-describedby="emailHelp"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailId">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailId"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordId">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="passwordId" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPasswordId">Confirm Password</label>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmPasswordId" />
                            </div>
                            {user.success && <div className="alert alert-success" role="alert">
                                Your account has been Successfully Registered..
                            </div>}
                            {user.loader ? <Loader /> : <button type="submit" className="btn btn-primary">Submit</button> }
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

export default SignUpForm
