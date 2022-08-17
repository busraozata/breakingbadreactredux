import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { fetchAllQuotes, quotesSelector, statusSelector, errorSelector } from '../../redux/quotesSlice';
import Item from './item';

export default function Quotes() {
    const dispatch = useDispatch()
    const data = useSelector(quotesSelector);
    const status = useSelector(statusSelector);
    const error = useSelector(errorSelector);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllQuotes())
        }
    }, [dispatch, status])

    if (error) {
        return <Error message={error} />
    }

    return (
        <div style={{ padding: 10 }}>
            <h1>Quotes</h1>
            {status === "loading" && <Loading />}
            {
                status === "succeeded" && data.map((item) => <div key={item.quote_id}>
                    <Item item={item} />
                </div>)
            }
            {status === "succeeded" && <div className='quotes_info'> {data.length} quotes </div>}
        </div>
    )
}
