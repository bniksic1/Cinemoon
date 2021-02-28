import React, {useEffect, useState} from 'react';
import axios from '../axios';
import './Row.css';

const Row = ({title, fetchUrl, isLargeRow = false}) => {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";


    const fetchData = () => {
        axios.get(fetchUrl)
            .then(res => res.data.results)
            .then(movies => {
                setMovies(movies);
                return movies;
            });
    }

    const moviesMap = () => {
        return movies.map(movie => (
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
            <img
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                key={movie.id}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt=""
            />
        ))
    }

    useEffect(() => {
        fetchData();
    }, [fetchUrl]);


    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {moviesMap()}
            </div>

        </div>
    );
};

export default Row;