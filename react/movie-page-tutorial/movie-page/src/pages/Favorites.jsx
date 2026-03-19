import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import {MovieCard} from "../components/MovieCard";

function Favorites(){
    const {favorites} = useMovieContext();
    return <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movie-grid">
            {favorites.map((movie) => <MovieCard movie={movie} key={movie.id}></MovieCard>)}
        </div>
    </div>
}

export default Favorites;