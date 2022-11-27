import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "./Loader";


const Giphy = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, SetIsError] = useState(false)
    const [search, setSearch] = useState("")
    useEffect(()=>{
        const fetchData = async () => {
            SetIsError(false)
            setIsLoading(true)

            try {
                const results = await axios.get(`https://api.giphy.com/v1/gifs/search?=name${search}`, {
                    params:{
                        api_key: process.env.REACT_APP_API_KEY,
                        q: search
                    }
                });

            setData(results.data.data)
            } catch (err){
                SetIsError(true)
                setTimeout(() => SetIsError(false), 4000) // <-- Error message will dissapear after 4 seconds, after being initialized.
            }
            setIsLoading(false)
        }
        fetchData();
    },[search])

    const renderGifs = () => {
        if(isLoading){
            return <Loader />
        }
        return data.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url}/>
                </div>
            )
        })
    }

    // Render method with message
    const renderError = () => { 
        if(isError){
            return (
                <div className="alert alert-danger
                alert-dismissible fade show" role="alert">
                    Unable to get Gifs, please try again later
                    <img src="https://i1.sndcdn.com/artworks-3IxMxNnWJSlV6nqh-FcbfpA-t500x500.jpg" className="banana" />
                </div>
            )
        };
    };

    return (
        <div className="App">
            {renderError()}
            <div className="search">
                <input 
                type="text" 
                placeholder="Search..."
                className="input"
                onChange={event => setSearch(event.target.value)}
                value={search}
                 />
            </div>
    <div className="container gifs">{renderGifs()}</div>
        </div>)
}

export default Giphy