import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import $ from 'jquery'
export default function ItemDetails() {
    let { id, type } = useParams()
    let [itemDetailes, setItemDetailes] = useState({})
    useEffect(() => {
        getDetailes()
    }, [])
    async function getDetailes() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=7671d95579c1a821f90a3b7cf2b3a2bd&language=en-US`)
        setItemDetailes(data)
        $(".loading").fadeOut(1000)
        console.log(data);
    }
    return <>
        <div className="main pb-5">
            <div className="container my-5 pb-5 all">
                <div className="loading">
                    <span className="loader"></span>
                </div>
                {itemDetailes ?
                    <div className="row detailes">
                        <div className="col-md-4 col-sm-12 mb-4">
                            {itemDetailes.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + itemDetailes.poster_path} alt="image" className="w-100" />
                                : <img src={`https://image.tmdb.org/t/p/w500` + itemDetailes.profile_path} alt="image" className="w-100" />}
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div>
                                <h2>{itemDetailes?.title} {itemDetailes?.name}</h2>
                                <p className="text-muted my-3">{itemDetailes?.overview} {itemDetailes?.biography}</p>
                                {itemDetailes.genres ? <h5 className="my-3">Type : <span className="small color">{itemDetailes.genres[0]?.name}</span>  <span className="small color">{itemDetailes.genres[1]?.name}</span>  <span className="small color">{itemDetailes.genres[2]?.name}</span></h5> : ""}
                                {itemDetailes.vote_average ? <h5 className="my-3">Vote Average : <span className="small color">{itemDetailes?.vote_average.toFixed(1)} / 10</span></h5> : ""}
                                {itemDetailes.vote_count ? <h5 className="my-3">Vote Count : <span className="small color">{itemDetailes?.vote_count}</span> voter</h5> : ""}
                                {itemDetailes.original_language ? <h5>Language : <span className="small color">{itemDetailes?.original_language}</span></h5> : ""}
                                {itemDetailes.runtime ? <h5 className="my-3">Time : <span className="small color">{itemDetailes?.runtime}</span> min</h5> : ""}
                                {itemDetailes.production_companies ? <h5 className="my-3">Company : <span className="small color">{itemDetailes.production_companies[0]?.name}</span></h5> : ""}
                                {itemDetailes.release_date ? <h5 className="my-3">Date : <span className="small color">{itemDetailes?.release_date}</span></h5> : ""}
                                {itemDetailes.homepage ? <a href={itemDetailes?.homepage} className=" btn btn-bg w-100" target="_blank">Learn More</a> : ''}
                            </div>
                        </div>
                    </div> : ""}
            </div>
        </div>
    </>
}