import React, { useContext } from 'react';
import { Link ,NavLink } from 'react-router-dom';
import { FunctionContext } from '../../Context/ShareFunction'
export default function Navbar() {
  let { userData, deleteData } = useContext(FunctionContext)
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark parent fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'><h3><strong className='fs-2'>N</strong>oxe</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {/* display navlinks depended about (userData)  */}
            {userData? 
            <ul className="navbar-nav me-auto mb-2 ms-5 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"}  to='home'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to='movies'>Movies</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to='Tvshow'>Tvshow</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive})=>isActive ? "nav-link active" : "nav-link"} to='people'>People</NavLink>
              </li>
            </ul> :""}
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
              {/* display navlinks&icons depended about (userData)  */}
              {userData ? 
              <>
              <li className="nav-item d-flex align-items-center">
                  <i className='fab mx-2 fa-facebook icon'></i>
                  <i className='fab mx-2 fa-twitter icon'></i>
                  <i className='fab mx-2 fa-instagram icon'></i>
                  <i className='fab mx-2 fa-soundcloud icon'></i>
                </li>
                <li className="nav-item">
                  <Link to='login'  className="nav-link" style={{cursor:"pointer"}} onClick={deleteData}>Logout</Link>
                </li>
             </> : 
             <>
              <li className="nav-item">
                  <NavLink className="nav-link" to='login'>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to='/'>Register</NavLink>
                </li>
             </>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
