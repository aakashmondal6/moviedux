import './App.css';
import './styles.css'
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import WatchList from './components/WatchList';
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom"
import {useState,useEffect} from 'react'

function App() {
  const [movies,setMovies]=useState([]);
  const [watchlist,setWatchList]=useState([]);
  useEffect(()=>{
    fetch("movies.json")
    .then(response=>response.json())
    .then(data=>setMovies(data))   
},[]);

/*
Function call

You call toggleWatchList(movieId) when a user clicks a button or interacts with a movie card.

State update with functional form

setWatchList((prev) => { ... }) uses the functional form of setState.

prev is the current watchlist array before the update.

Check if movie is already in the list

prev.includes(movieId) returns true if the movie is already in the watchlist.

Conditional update

If the movie is already in the list (true):

js
prev.filter((id) => id !== movieId)
→ removes that movie ID from the array.

If the movie is not in the list (false):

js
[...prev, movieId]
→ adds the movie ID to the array by spreading the existing list and appending the new ID.

Result

The watchlist state is updated to either include or exclude the movie ID, effectively toggling it.

Example
Suppose your watchlist is [1, 2, 3]:

toggleWatchList(2) → removes 2, result [1, 3].

toggleWatchList(4) → adds 4, result [1, 2, 3, 4].
*/
  const toggleWatchList=(movieId)=>{
    setWatchList((prev)=>
    prev.includes(movieId)?prev.filter((id)=>id!==movieId):[...prev,movieId])
  };
  return (
    <div className="App">
      <div className="container">
      <Header></Header>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<MoviesGrid
           movies={movies} 
           watchlist={watchlist} 
           toggleWatchList={toggleWatchList}/>}></Route>

          <Route path="/watchlist" element={<WatchList 
          movies={movies}
          watchlist={watchlist} 
          toggleWatchList={toggleWatchList}/>}></Route>
          
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
    </div>
  );
}

export default App;
