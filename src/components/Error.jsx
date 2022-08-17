import React from 'react'

export default function Error({message}) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem", color: "red" }} > Error: {message} </div>
    )
}
