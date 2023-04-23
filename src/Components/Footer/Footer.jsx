import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer parent">
      <div className="container">
        <div className="d-flex justify-content-between pb-2 pt-4 border-bottom head">
          <Link to='/home' className=' text-decoration-none'><h3><strong className='fs-2'>N</strong>oxe</h3></Link>
          <div className="social d-flex">
            <i className="fa-brands fa-facebook-f btn-bg"></i>
            <i className="fa-brands fa-twitter  btn-bg"></i>
            <i className="fa-brands fa-linkedin-in  btn-bg"></i>
            <i className="fa-brands fa-github  btn-bg"></i>
          </div>

        </div>
        <div className="row py-5 text-center">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div >
              <h5 className="text-white fw-bold">Linkes</h5>
              <div className="categories mt-4">
                <Link to='/home'>Home</Link>
                <Link to='/movies'>Movies</Link>
                <Link to='/Tvshow'>Tvshow</Link>
                <Link to='/people'>People</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div >
              <h5 className="text-white fw-bold">Movies</h5>
              <div className="categories mt-4">
                <Link to='/movies'>Action</Link>
                <Link to='/movies'>Comedy</Link>
                <Link to='/movies'>Fantacy</Link>
                <Link to='/movies'>Adventure</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div >
              <h5 className="text-white fw-bold">TV Series</h5>
              <div className="categories mt-4">
                <Link to='/Tvshow'>Classic Shows</Link>
                <Link to='/Tvshow'>Underrated Comedies</Link>
                <Link to='/Tvshow'>Big TV Premieres</Link>
                <Link to='/Tvshow'>Reality TV Shows</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div >
              <h5 className="text-white fw-bold">Support</h5>
              <div className="categories mt-4">
                <Link to='/home'>Watch on TV</Link>
                <Link to='/home'>Help Center</Link>
                <Link to='/home'>Contact</Link>
                <Link to='/home'>FAQs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-muted text-center parent">Copy Right 2023 © By Mohamed Maher All Rights Reserved</div>
    </div>
  )
}


