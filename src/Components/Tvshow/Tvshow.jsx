import axios from 'axios';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom';
export default function Tvshow() {
  let numList = new Array(10).fill(1).map((el, index) => index + 1)
  // console.log(numList);
  let type = "tv"
  let [tvList, setTvList] = useState([])
  useEffect(() => {
    getTvData("1")
  }, [])
  async function getTvData(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=7671d95579c1a821f90a3b7cf2b3a2bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    setTvList(data.results);
    $(".loading").fadeOut(1000)
    console.log(data.results);
  }
  return <>
    <div className="main pb-5">
      <div className="container my-5 pb-5 all">
        <div className="loading">
          <span className="loader"></span>
        </div>
        <div className="row g-4">
          {tvList.map((el) => {
            return <div className="col-lg-3 col-md-4 col-sm-6" key={el.id}>
              <Link to={`/itemdetailes/${el.id}/${type}`} className=" text-decoration-none text-white">
                <div className=" position-relative movies">
                  {<img src={`https://image.tmdb.org/t/p/w500` + el.poster_path} alt="image" className="w-100" />}
                  <h3 className=" mt-2">{el.title} {el.name}</h3>
                  {<div className="top-0 end-0 position-absolute vote p-1">{el.vote_average.toFixed(1)}</div>}
                </div>
              </Link>
            </div>
          })}
        </div>
        <nav className='mt-5'>
          <ul className=' pagination pagination-sm d-flex justify-content-center'>
            {numList.map((page) => {
              return <li className=' page-item p-1' key={page} onClick={() => getTvData(page)}>
                <Link className=' page-link btn-bg'>{page}</Link>
              </li>
            })}

          </ul>
        </nav>
      </div>
    </div>
  </>
}

