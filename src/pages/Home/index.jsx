import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/characterSlice';
import Masonry from 'react-masonry-css'
import "./styles.css"
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { Link } from "react-router-dom";

export default function Home() {
    const characters = useSelector((state) => state.characters.items);
    const status = useSelector((state) => state.characters.status);
    const error = useSelector((state) => state.characters.error);
    const nextPage = useSelector((state) => state.characters.page)
    const hasNextPage = useSelector((state) => state.characters.hasNextPage)
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCharacters())
        }
    }, [dispatch, status]);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    if (status === "failed") {
        return <Error message={error} />
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Masonry
                breakpointCols={4}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {characters.map((character) => (
                    <div key={character.char_id}>
                        <Link to={`/character/${character.char_id}`}>
                            <img
                                src={character.img}
                                alt={character.name}
                                className="character"
                            />
                            <h3 className="character_name">{character.name}</h3>
                        </Link>
                    </div>
                ))}
            </Masonry>
            {status === "loading" && <Loading />}
            {hasNextPage && status === "succeeded" && (
                <button style={{ textAlign: "center" }}
                    onClick={() => dispatch(fetchCharacters(nextPage))}
                    className="button"
                >
                    Load More ({nextPage})
                </button>
            )}

            {!hasNextPage && <p>There is nothing to be shown</p>}
        </div>
    );
}
