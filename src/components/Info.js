import React from 'react'

export default function Info(props) {
    return (
        <div>
            {props.runtime}{props.genre}{props.plot}
        </div>
    )
}