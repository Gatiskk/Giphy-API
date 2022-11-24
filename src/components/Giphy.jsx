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
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params:{
                        api_key: "CRf4t5Mg6NTdEiErtpJM43bc86QW3f1L",
                    }
                });

                console.log(results)
            setData(results.data.data)
            } catch (err){
                SetIsError(true)
                setTimeout(() => SetIsError(false), 4000) // <-- Error message will dissapear after 4 seconds, after being initialized.
            }


            setIsLoading(false)
        }

        fetchData();

    },[])
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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        SetIsError(false)
            setIsLoading(true)

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/search", {
                    params: {
                        api_key: "CRf4t5Mg6NTdEiErtpJM43bc86QW3f1L",
                        q: search,
                        limit: 90
                    }
                });
                setData(results.data.data)
            } catch(err) {
                SetIsError(true)
                setTimeout(() => SetIsError(false), 4000)
            }
        
        setIsLoading(false)
    };

    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input value={search} 
                onChange={handleSearchChange} 
                type="text" 
                placeholder="Search..." 
                className="form-control" />
                <button onClick={handleSubmit} type="submit" className="btn btn-primary mx-2">Go</button>
            </form>
    <div className="container gifs">{renderGifs()}</div>
        </div>)
}

export default Giphy