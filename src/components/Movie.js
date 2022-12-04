import React from 'react'

export default function Movie(props) {
    return (
        <div>
            <div className="card-container">
                <img src={props.poster} alt="movie poster" className="card-poster" />
                <div className="card-right">
                    <div className="title-rating">
                        <div className="title">
                            {props.title}
                        </div>
                        <div className="rating">
                            <img src="star-icon.png" alt="star icon" className="star-icon" />{props.rating}
                        </div>
                    </div>
                    <div className="runtime-genre">
                        <div className="runtime">
                            {props.runtime}</div><div className="genre">{props.genre}
                        </div>
                        <div>
                            {
                                props.favorite ? 
                                <button onClick={props.toggle} className="watchlist">
                                    <img src="minus-icon.png" alt="icon to remove movie to the watchlist" className="watchlist-button-icon" />
                                    Remove
                                </button>
                                :
                                <button onClick={props.toggle} className="watchlist">
                                    <img src="plus-icon.png" alt="icon to add movie to the watchlist" className="watchlist-button-icon" />
                                    Watchlist
                                </button>
                            }
                        </div>
                    </div>
                    <div className="plot">{props.plot}</div>
                </div>
            </div>
            <hr />
        </div>
    )
}