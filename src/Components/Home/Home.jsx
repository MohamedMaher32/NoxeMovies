import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MedaiItems from '../MedaiItems/MedaiItems';
import $ from 'jquery'
import { Link } from 'react-router-dom';
export default function Home() {
  let [moviesList, setMoviesList] = useState([])
  let [pepoleList, setPepoleList] = useState([])
  let [seriesList, setSeriesList] = useState([])
  useEffect(() => {
    getMoviesData('movie', setMoviesList)
    getMoviesData('person', setPepoleList)
    getMoviesData('tv', setSeriesList)
  }, [])
  async function getMoviesData(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=7671d95579c1a821f90a3b7cf2b3a2bd`)
    callback(data.results);
    $(".loading").fadeOut(1000)
    console.log(data.results);
  }

  return <>
    <div className="main pb-5">
      <div className="loading">
        <span className="loader"></span>
      </div>
      <div className="welcome d-flex justify-content-center align-items-center">
        <div className='text-center'>
          <h1>Welcome To Noxe</h1>
          <h2 className='mb-5'>Unlimited movies, TV shows, and more.</h2>
          <span className='p-4 background2 rounded-3 fw-bold'>Enjoy Watching</span>
        </div>
      </div>
      <div className="container mb-5 pb-5 all">
        <div className="row home g-4">
          <div className="col-md-4 col-sm-12 d-flex align-items-center">
            <div>
              <div className="brdr mb-3 w-25"></div>
              <h2 className='h3'>Trending <br />Movies <br />To Watch Right Now </h2>
              <p className='text-muted'>most watched Tv by The Day</p>
              <div className="brdr mt-3 w-100"></div>
            </div>
          </div>
          {moviesList.slice(0, 10).map((el, index) => <MedaiItems el={el} key={index} />)}
        </div>
        <div className="row home g-4 my-4">
          <div className="col-md-4 col-sm-12 d-flex align-items-center">
            <div>
              <div className="brdr mb-3 w-25"></div>
              <h2 className='h3'>Trending <br />Tv <br />To Watch Right Now </h2>
              <p className='text-muted'>most watched Tv by The Day</p>
              <div className="brdr mt-3 w-100"></div>
            </div>
          </div>
          {seriesList.slice(0, 10).map((el, index) => <MedaiItems el={el} key={index} />)}
        </div>
        <div className="row home g-4 my-4">
          <div className="col-md-4 col-sm-12 d-flex align-items-center">
            <div>
              <div className="brdr mb-3 w-25"></div>
              <h2 className='h3'>Trending <br />People <br />To Watch Right Now </h2>
              <p className='text-muted'>most watched Tv by The Day</p>
              <div className="brdr mt-3 w-100"></div>
            </div>
          </div>
          {pepoleList.slice(0, 10).map((el, index) => <MedaiItems el={el} key={index} />)}
        </div>
      </div>
    </div>
  </>

}
