import React from 'react'
import '../styles.css'

export default function movCard({mov}){

    const handleError= (e)=>{
        e.target.src="images/default.jpg";
    };
    const movieRating=(rating)=>{
        const mov_rating=rating>=8?"rating-good":rating>=5?"rating-ok":"rating-bad";
        return mov_rating;
    };
    return(<div key={mov.id} className="movie-card">
        <img src={`images/${mov.image}` }alt={mov.title} onError={handleError}/>
        <div className="movie-card-info">
            <h3 className='movie-card-title'>{mov.title}</h3>
            <p className='movie-card-genre'>{mov.genre}</p>
            <p className={`movie-card-rating ${movieRating(mov.rating)}`}>{mov.rating}</p>

        </div>
    </div>);
};