import React, {useEffect, useState} from 'react';
import axios from '../axios';
import requests, { API_KEY } from "../Requests";
import ModalVideo from 'react-modal-video';

import './Banner.css';
import '../../node_modules/react-modal-video/scss/modal-video.scss';

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [video, setVideo] = useState("");

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    const fetchData = () => {
        axios.get(requests.fetchOriginals)
            .then(res => res.data.results)
            .then(movies => {
                setMovie(
                    movies[Math.floor(Math.random() * movies.length - 1)]
                );
                return movies;
            });
    }

    const fetchVideoTrailer = () => {
        axios.get(`/tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(res => res.data.results[0])
            .then(video => {
                setVideo(video.key);
                return video;
            });
    }

    useEffect(() => {
        if(movie.length === 0)
            fetchData()
        else
            fetchVideoTrailer()
    }, [movie]);


    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundPosition: "50% 25%"
        }}>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={video} onClose={() => setOpen(false)} />
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => setOpen(true)}>Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    );
};

export default Banner;