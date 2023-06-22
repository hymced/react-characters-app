import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CharacterDetails(){

    // const result = useParams(); // custom hook from the react-router-dom library
    // console.log(result.characterId)

    const {characterId} = useParams();
    
    const [characterDetails, setCharacterDetails] = useState({});

    const baseURL = "https://ih-crud-api.herokuapp.com";

    useEffect(() => {
        axios.get(`${baseURL}/characters/${characterId}`)
            .then(response => {
                setCharacterDetails(response.data);
            })
            .catch(e => console.log(e))
    }, []) 
    // WARNING: React Hook useEffect has a missing dependency: 'characterId'. 
    // Either include it or remove the dependency array.
    // eslint(react-hooks/exhaustive-deps)


    return (
        <>
            <h1>{characterDetails.name}</h1>
            Occupation: {characterDetails.occupation} <br />
            Weapon: {characterDetails.weapon} <br />
            Debt: {characterDetails.debt ? "Yes" : "No"} <br />
        </>
    );
}

export default CharacterDetails;