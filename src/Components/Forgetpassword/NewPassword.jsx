import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function NewPassword() {
    // main Api link
    let baseUrl = "https://route-ecommerce.onrender.com"
    // error element to display erroe message)
    let [errorMsg, setErrMes] = useState("")
    // btn loading
    let [loading, setLoading] = useState(false)
    // programming routing
    let navigate = useNavigate()
    //******************************************************* form new password ************************************************************************** */
    // validation form
    let validationSchema = Yup.object({
        email: Yup.string().required().email("Enter your valid email"),
        newPassword: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{3,16}$/, "Enter valid password"),
    })
    // dateiles form
    let form3 = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: (value) => {
            ResetPassword(value)
        },
        validationSchema,
    })
    // api function
    async function ResetPassword(info) {
        setLoading(true)
        let { data } = await Axios.put(`${baseUrl}/api/v1/auth/resetPassword`, info).catch((error) => {
            setErrMes(error.response.data.message);
            setLoading(false)
        })
        console.log(data);
        if (data.token) {
            navigate("/login")
        }
    }
    // ********************************************************************************* html code ********************************************
    return (
        <div className="login pb-5">
            <div className="container my-5 pb-5 all">
                <div className='w-75 mx-auto p-5 rounded-3 parent background'>
                    <h2 className='header'>Reset Password:</h2>
                    <form onSubmit={form3.handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="Email">Email:</label>
                            <input onChange={form3.handleChange} type="email" className='form-control' id='Email' name='email' />
                            <p className='text-danger'>{form3.errors.email}</p>
                        </div>
                        <div className='my-3'>
                            <label htmlFor="newPassword">New Password:</label>
                            <input onChange={form3.handleChange} type="password" className='form-control' id='newPassword' name='newPassword' />
                            <p className='text-danger'>{form3.errors.password}</p>
                        </div>
                        {errorMsg != "" ? <div className='alert alert-danger'>{errorMsg}</div> : ""}
                        {loading ? <button type='button' className='btn btn-bg'><i className='fa-solid fa-spinner fa-spin'></i></button>
                            :
                            <button disabled={!form3.isValid} type='submit' className='btn btn-bg'>Update Password</button>}
                    </form>
                </div>
            </div>
        </div>
    )
}
