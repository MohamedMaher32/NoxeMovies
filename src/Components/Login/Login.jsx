import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FunctionContext } from '../../Context/ShareFunction'
export default function Login() {
  let { saveUserData } = useContext(FunctionContext)
  // main Api link
  let baseUrl = "https://route-ecommerce.onrender.com"
  // display error
  let [errMsg, setErrMes] = useState("")
  // btn loading
  let [loading, setLoading] = useState(false)
  // programming routing
  let navigate = useNavigate()
  // validation form
  let validationSchema = Yup.object({
    email: Yup.string().required().email("Enter your valid email"),
    password: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{3,16}$/, "Enter valid password"),
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      sendData(values)
      //  console.log(values);
    },
    validationSchema,
    // we can write up line as (validationSchema) becouse (validationSchema = validationSchema)
  })
  // api function
  async function sendData(info) {
    setLoading(true)
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, info).catch((error) => {
      setErrMes(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      localStorage.setItem("token", data.token)
      saveUserData(data.user)
      navigate("/home")
    }
  }
  // design form
  return (
    <div className="login pb-5">
      <div className="container my-5 pb-5 all">
        <div className='w-75 mx-auto p-5 rounded-3 parent background'>
          <h2 className='header text-center'>Login Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className='my-3'>
              <label htmlFor="email">Email:</label>
              <input onChange={formik.handleChange} type="email" className='form-control' id='email' name='email' />
              <p className='text-danger'>{formik.errors.email}</p>
            </div>
            <div className='my-3'>
              <label htmlFor="password">Password:</label>
              <input onChange={formik.handleChange} type="password" className='form-control' id='password' name='password' />
              <p className='text-danger'>{formik.errors.password}</p>
            </div>
            {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
            <Link to="/forgetpassowrd" style={{ display: "block", marginBottom: "5px", textDecoration: "none" }}>Forget Password ?</Link>
            {loading ? <button type='button' className='btn btn-bg d-flex mx-auto'><i className='fa-solid fa-spinner fa-spin'></i></button>
              :
              <button disabled={!formik.isValid} type='submit' className='btn btn-bg d-flex mx-auto'>Login</button>}
          </form>
        </div>
      </div>
    </div>
  )
}
