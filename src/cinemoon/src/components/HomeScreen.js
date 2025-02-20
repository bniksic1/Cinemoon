import React, {useEffect} from 'react';
import './HomeScreen.css';
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../Requests";

const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <Nav />
            <Banner />
            <Row
                title = "CINEMOON ORIGINALS"
                fetchUrl = {requests.fetchOriginals}
                isLargeRow
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
        </div>
    );
};

export default HomeScreen;