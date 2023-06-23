import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CharacterDetails({callbackDeleteCharacter, callbackGetCharacters}){
    console.log("component CharacterDetails rendering...")

    // const result = useParams(); // custom hook from the react-router-dom library
    // console.log(result.characterId)

    const {characterId} = useParams();
    
    const [characterDetails, setCharacterDetails] = useState({});

    const navigate = useNavigate();

    // const baseURL = "https://ih-crud-api.herokuapp.com";

    useEffect(() => {
        // axios.get(`${baseURL}/characters/${characterId}`)
        axios.get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
            .then(response => {
                setCharacterDetails(response.data);
            })
            .catch(e => console.log(e))
    // }, [])
    // WARNING: React Hook useEffect has a missing dependency: 'characterId'. 
    // Either include it or remove the dependency array.
    // eslint(react-hooks/exhaustive-deps)
    }, [])

    return (
        <>
            <h1>{characterDetails.name}</h1>
            Occupation: {characterDetails.occupation} <br />
            Weapon: {characterDetails.weapon} <br />
            Debt: {characterDetails.debt ? "Yes" : "No"} <br />

            <p>
                <button onClick={() => {
                    callbackDeleteCharacter(characterId)
                        .then(response => {
                            // console.log("deleted (bis): ", response)
                            callbackGetCharacters(); // to update (async, so we redirect before we actually get the response from the delete call to the API)
                            navigate('/'); // useNavigate renders the components again, **BUT** if already mounted + useState(, []) then no update of characters!
                        })
                        .catch(e => console.log("error deleting (bis): ", e));
                }}> Delete </button>
            </p>

            <p>
                <Link to="/">Back</Link>
            </p>
        </>
    );
}

export default CharacterDetails;