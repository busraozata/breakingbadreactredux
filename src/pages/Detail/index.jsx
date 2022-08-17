import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Loading from '../../components/Loading';

export default function Detail() {
    const [char, setchar] = useState(null)
    const { char_id } = useParams();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`).then((res) => res.data).then((data) => setchar(data[0])).finally(() => setLoading(false))
    }, [char_id])

    return (


        <div>
            {
                loading && <Loading />
            }
            {
                char && <div>
                    <h1> {char.name} </h1>
                    <img src={char.img} alt={char.name} style={{ width: "50%" }} />
                </div>
            }
            {
                char && <pre> {JSON.stringify(char, null, 2)} </pre>
            }
        </div>
    )
}
