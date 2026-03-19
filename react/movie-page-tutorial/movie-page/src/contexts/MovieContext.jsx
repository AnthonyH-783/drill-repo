/**
 * Purpose: Provide a global state along with some helper functions that we can use
 * in multiple places within our application
 * 
 * It is the state manager for the favorite movies
 */


import { createContext, useState, useContext, useEffect } from "react";

// Creating a context
const MovieContext = createContext();

// Creating a function that returns a "handle" to that context
export const useMovieContext = () => useContext(MovieContext);

// Providing state to any component wrapped in it
export const MovieProvider = ({children}) => {
    // Defining global vars for children wrapped by MovieContext.Provider
    const [favorites, setFavorites] = useState([]);

    // Searching localstorage on first render
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if(storedFavs){
            setFavorites(JSON.parse(storedFavs));
        }
    }, []);

    // Updating Local Storage each time favorites change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));

    }, [favorites]);

    // Global Function for mutating the favorites array
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }
    const removeFromFavorites = (movie_id) => {
        setFavorites(prev => prev.filter((movie) => movie.id !== movie_id));
    }

    const isFavorite = (movie_id) => {
        return favorites.some((movie) => movie.id === movie_id);
    }

    // Global object passed to the context
    const value = {favorites, addToFavorites, removeFromFavorites, isFavorite};

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}