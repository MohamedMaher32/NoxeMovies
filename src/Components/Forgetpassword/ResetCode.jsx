import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ResetCode() {
    // main Api link
    let baseUrl = "https://route-ecommerce.onrender.com"
    // error element to display erroe message)
    let [errorMsg, setErrMes] = useState("")
    // btn loading
    let [loading, setLoading] = useState(false)
    // programming routing
    let navigate = useNavigate()
    //******************************************************* form code ************************************************************************** */
    // validation form
    let validationSchema = Yup.object({
        resetCode: Yup.string().required().matches(/^[0-9]{4,6}$/, "Enter your valid code"),
    })
    // dateiles form
    let form2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: (value) => {
            verifyResetCode(value)
            console.log(value);
        },
        validationSchema,
    })
    // api function
    async function verifyResetCode(info) {
        setLoading(true)
        let { data } = await Axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, info).catch((error) => {
            console.log(error.response.data.message);
            setErrMes(error.response.data.message)
            setLoading(false)
        })
        console.log(data);
        if (data.status == 'Success') {
            navigate("/newpassword")
        }
    }
    // ********************************************************************************* html code ********************************************
    return (
        <div className="login pb-5">
            <div className="container my-5 pb-5 all">
                <div className='w-75 mx-auto p-5 rounded-3 parent background'>
                    <h2 className='header'>Verify Code:</h2>
                    <form onSubmit={form2.handleSubmit}>
                        <div className='my-3'>
                            <label htmlFor="resetCode">Reset Code:</label>
                            <input onChange={form2.handleChange} type="text" className='form-control' id='resetCode' name='resetCode' />
                            <p className='text-danger'>{form2.errors.resetCode}</p>
                        </div>
                        {errorMsg != "" ? <div className='alert alert-danger'>{errorMsg}</div> : ""}
                        {loading ? <button type='button' className='btn btn-bg'><i className='fa-solid fa-spinner fa-spin'></i></button>
                            :
                            <button disabled={!form2.isValid} type="submit" className='btn btn-bg'>Verify Code</button>}
                        <p className='text-end'>"Reset code sent to your email"</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
