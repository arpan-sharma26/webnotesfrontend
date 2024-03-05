import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Notes(){
    const baseURL = `${process.env.REACT_APP_BASE_URL}/api/notes`;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const headers = {
        "Content-Type": "application/json"
    };

    useEffect(() => {
        axios.get(baseURL, { headers }).then((response) => {
            setIsLoading(false);
            setData(response.data);
        }).catch(err => {
            setIsLoading(false);
            setError(err);
            setError("Error fetching data");
        });
    }, []);

    return (
        <div>
            {isLoading ? <p>....Loading</p> : error ? <p>{error}</p> : (
                <ul className='notes'>

                    <li className="add-note-button">
                        <Link to={`/add-note`}>+</Link>
                    </li>

                    {data.map((item) => (
                        <li key={item._id}>
                            <Link to={`/note/${item._id}`}>
                                <h3>{item.title}</h3>

                                <p>
                                    {item.description.length > 50
                                        ? `${item.description.substring(0, 50)}...`
                                        : item.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )    
}

export default Notes;