import React from "react"
import { Link } from "react-router-dom"
export default function MedaiItems({ el }) {
  return <>
    <div className="col-lg-2 col-md-4 col-sm-6 ">
      <Link to={`/itemdetailes/${el.id}/${el.media_type}`} className=" text-decoration-none text-white">
        <div className=" position-relative">
          {el.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + el.poster_path} alt="image" className="w-100" />
            : <img src={`https://image.tmdb.org/t/p/w500` + el.profile_path} alt="image" className="w-100" />}
          <h3 className=" mt-2">{el.title} {el.name}</h3>
          {el.vote_average ? <div className="top-0 end-0 position-absolute vote p-1">{el.vote_average.toFixed(1)}</div> : ""}
        </div>
      </Link>
    </div>
  </>
}