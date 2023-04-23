import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
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
    name: Yup.string().required().min(2, "Name must be minmum 2 letters").max(16, "Name must be maxmum 16 letters"),
    email: Yup.string().required().email("Enter your valid email"),
    phone: Yup.string().required().matches(/^(010|012|011|015)[0-9]{8}$/, "Enter your valid egyption phone number"),
    password: Yup.string().required().matches(/^[A-Za-z0-9!@#$%&*_-]{6,16}$/, "Password must be at least 6 parmeters"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Re-passwoed not matched")
  })
  // dateiles form
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
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
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, info).catch((error) => {
      setErrMes(error.response.data.message)
      setLoading(false)
    })
    console.log(data);
    if (data.message == 'success') {
      navigate("/login")
    }
  }
  // design form
  return (
    <div className="register pb-5">
      <div className="container my-5 pb-5 all">
        <div className='w-75 mx-auto p-5 rounded-3 parent background'>
          <h2 className='header text-center'>Register Now:</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className='my-3'>
              <label htmlFor="name">Name:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' id='name' name='name' />
              <p className='text-danger'>{formik.errors.name}</p>
            </div>
            <div className='my-3'>
              <label htmlFor="email">Email:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' id='email' name='email' />
              <p className='text-danger'>{formik.errors.email}</p>
            </div>
            <div className='my-3'>
              <label htmlFor="password">Password:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' id='password' name='password' />
              <p className='text-danger'>{formik.errors.password}</p>
            </div>
            <div className='my-3'>
              <label htmlFor="rePassword">Repassword:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' id='rePassword' name='rePassword' />
              <p className='text-danger'>{formik.errors.rePassword}</p>
            </div>
            <div className='mt-3 mb-5'>
              <label htmlFor="phone">Phone:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' id='phone' name='phone' />
              <p className='text-danger'>{formik.errors.phone}</p>
            </div>

            {errMsg != "" ? <div className='alert alert-danger'>{errMsg}</div> : ""}
            {loading ? <button type='button' className='btn btn-bg d-flex mx-auto'><i className='fa-solid fa-spinner fa-spin'></i></button>
              :
              <button disabled={!formik.isValid} type='submit' className='btn btn-bg d-flex mx-auto'>Register</button>}
          </form>
        </div>
      </div>
    </div>

  )
}