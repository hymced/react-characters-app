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
    // this warning happens if the react-hooks/exhaustive-deps rule inside the ESLint configuration file is activated
    // the react-hooks/exhaustive-deps rule verifies that every object declared outside a useEffect callback AND used by it is part of the dependency array
    // Fix #1 - Add the missing dependency
    // Fix #2 - Move the dependency inside the useEffect (cannot move a hook into a hook, so it is not possible to have a useState inside a useEffect hook; with non-hooks, however, this solution works great)
    // Fix #3 - Disable the ESLint rule // eslint-disable-next-line react-hooks/exhaustive-deps
    // No Fix - Leave it if the logic is ok
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