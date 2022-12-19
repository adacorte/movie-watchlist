import React from 'react'
import ReactDOM from 'react-dom'
import Movie from './components/Movie.js'

export default function App() {
    const [search, setSearch] = React.useState('')
    const [data, setData] = React.useState([])
    const [watchList, setWatchList] = React.useState([])
    const [fetchTryCount, setFetchTryCount] = React.useState(false)
    const [fetchStatus, setFetchStatus] = React.useState(true)

    function handleChange(event) {
        setSearch(event.target.value)
    }

    React.useEffect(() => {
        if (data.length > 0 || !fetchStatus) {
            setFetchTryCount(true)
        }
    }, [data, fetchStatus])

    async function handleSubmit(event) {
        event.preventDefault()
        const result = await fetch(
            `https://www.omdbapi.com/?apikey=4884bc5&s=${search}`
        )
        const data = await result.json()

        setFetchStatus(data.Response === 'True')

        if (data.Response === 'False') {
            return setData([])
        }

        const movieArrayWithData = data.Search.map((movie) => {
            return fetch(
                `https://www.omdbapi.com/?apikey=4884bc5&i=${movie.imdbID}`
            )
                .then((res) => res.json())
                .then((details) => ({ ...movie, movieInfo: details }))
        })
        setData(await Promise.all(movieArrayWithData))
    }

    async function handleWatchlist(event) {
        event.preventDefault()

        const movieArrayWithData = data.Search.map((movie) => {
            return fetch(
                `https://www.omdbapi.com/?apikey=4884bc5&i=${movie.imdbID}`
            )
                .then((res) => res.json())
                .then((details) => ({ ...movie, movieInfo: details }))
        })
        setData(await Promise.all(movieArrayWithData))
    }

    function toggle(imdbID) {
        return setWatchList((prevWatchListArray) => {
            const idx = prevWatchListArray.indexOf(imdbID)
            if (idx < 0) {
                return [...prevWatchListArray, imdbID]
            } else {
                return [
                    ...prevWatchListArray.slice(0, idx),
                    ...prevWatchListArray.slice(idx + 1),
                ]
            }
        })
    }

    const feed = data.map((movie) => (
        <Movie
            title={movie.Title}
            poster={movie.Poster}
            genre={movie.movieInfo.Genre}
            rating={movie.movieInfo.imdbRating}
            runtime={movie.movieInfo.Runtime}
            plot={movie.movieInfo.Plot}
            key={movie.imdbID}
            favorite={watchList.indexOf(movie.imdbID) < 0 ? false : true}
            imdbID={movie.imdbID}
            toggle={() => toggle(movie.imdbID)}
        />
    ))

    return (
        <div>
            <div className="header-background"></div>
            <img
                src="./nav.jpg"
                alt="nav background"
                className="header-image"
            />
            <div className="header-container">
                <div className="header-text-left">Find your film</div>
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Search for a movie"
                        onChange={handleChange}
                    ></input>
                    <button>Search</button>
                </form>
            </div>
            <div className="movie-feed">
                {fetchTryCount ? (
                    data.length > 0 ? (
                        <div>{feed}</div>
                    ) : (
                        <div className="no-data-div">
                            Unable to find what you’re looking for. Please try
                            another search.
                        </div>
                    )
                ) : (
                    <div className="movie-icon-div">
                        <img
                            src="./movie-icon.png"
                            alt="movie icon"
                            className="movie-icon"
                        />
                        Start exploring
                    </div>
                )}
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
