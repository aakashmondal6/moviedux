import React,{useState,useEffect} from 'react'
import '../styles.css'
import MovieCard from './MovieCard';

export default function MoviesGrid(){
    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]=useState("");
    const [genre,setGenre]=useState("All Genre");
    const [rating,setRating]=useState("All");
    
    useEffect(()=>{
        fetch("movies.json")
        .then(response=>response.json())
        .then(data=>setMovies(data))
        
    },[]);
    const handlesearchChange=(e)=>{
        setSearchTerm(e.target.value);
    }
    const handlegenreChange=(e)=>{
        setGenre(e.target.value);
    }
    const handleratingChange=(e)=>{
        setRating(e.target.value);
    }
    const matchesGenre=(movie,genre)=>{
        return(genre === "All Genre" || movie.genre.toLowerCase() === genre.toLowerCase())
    };
    const matchesSearchTerm= (movie,searchTerm)=>{
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
    const matchesRating=(movie,rating)=>{

        switch(rating){
        case "All":
            return true;
        case "Good":
            return movie.rating>=8;
        case "Ok":
            return movie.rating<8&& movie.rating>=5;
        case "Bad":
            return movie.rating<5;
        default:
            return false;
        }
    }
    const filtermovies= movies.filter(movie=>
        matchesGenre(movie,genre) && matchesSearchTerm(movie,searchTerm) && matchesRating(movie,rating));

    return(
        <div>
            <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handlesearchChange}
            />
        <div className='filter-bar'>
            <div className='filter-slot'>
                <label>Genre</label>
                <select className='filter-dropdown' onChange={handlegenreChange}>
                <option>All Genre</option>
                <option>Action</option>
                <option>Drama</option>
                <option>Fantasy</option>
                <option>Horror</option>
                </select>
            </div>
            <div className='filter-slot'>
                <label>Rating</label>
                <select className='filter-dropdown' onChange={handleratingChange}>
                <option>All</option>
                <option>Good</option>
                <option>Ok</option>
                <option>Bad</option>
                </select>
            </div>
        </div>
            <div className="movies-grid">
                {filtermovies.map((movie) => (
                <MovieCard mov={movie} key={movie.id}></MovieCard>     
                ))}
            </div>
        </div>
    );
}