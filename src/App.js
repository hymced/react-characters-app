import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, Navigate, useNavigate } from "react-router-dom";

import CharacterDetails from "./components/CharacterDetails";
import AboutPage from './pages/AboutPage';

function App() {
  console.log("component App rendering...") // the first time it is rendering, it is mounting

  // const [characters, setCharacters] = useState([]); // if not initialized with empty array (e.g. undefined), the map method will be called on a variable that is not an array --> error
  const [characters, setCharacters] = useState(null); // with conditional rendering
  
  const navigate = useNavigate();

  // const url = "https://ih-crud-api.herokuapp.com/characters"
  // REMEMBER TO RESTART THE PROCESS WHEN CHANGING ENV VARIABLES!

  const deleteCharacter = (characterId) => {
    // axios.delete(`${url}/${characterId}`)
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/characters/${characterId}`)
      .then(response => {
        // console.log("deleted: ", response);
        return response; // pass the promise back
      })
      .catch(e => console.log("error deleting: ", e))
  }

  // useEffect(() => {
  //   // axios.get(url)
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/characters`)
  //     .then(response => {
  //       setCharacters(response.data)
  //     })
  //     .catch(e => console.log("error getting: ", e));
  // }, []) // deletes but does not render again
  // // }, [characters]) // infinite loop!
  // // }) // infinite loop!

  useEffect(() => {
    getCharacters()
  }, [])

  const getCharacters = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/characters`)
      .then(response => {
        setCharacters(response.data);
      })
      .catch(e => console.log("error getting: ", e));
  }

  const renderCharacters = () => {
    return (
      <>
        {
          characters === null 
          ? <p>"Loading..."</p>
          : <>

            <h2>Number of characters in the API: {characters.length}</h2>
            
            <h2>First 10 characters in API: </h2>
            {characters.slice(0,1000).map((character, index) => {
              // return <div key={index} className="character">
              //   Name: {character.name} | 
              //   Weapon: {character.weapon} |     
              //   <button onClick={() => {deleteCharacter(character.id)}}> Delete </button>
              // </div>
              // JSX collapses whitespaces (before the inline button in this case)
              // https://stackoverflow.com/questions/36377373/how-to-use-whitespace-pre-wrap-on-react/36377593#36377593
              // return <div key={index} className="character" style={{whiteSpace: "pre-wrap"}}>
              // {`
              //   Name: ${character.name} | 
              //   Weapon: ${character.weapon} | 
              // `}
              return <div key={index} className="character box" style={{whiteSpace: "pre"}}>
                {`Name: ${character.name} | Weapon: ${character.weapon} | `}
                <button onClick={() => {
                  deleteCharacter(character.id)
                    .then(response => {
                      // console.log("deleted (ter): ", response);
                      getCharacters()
                    })
                    .catch(e => console.log("error deleting (ter): ", e))
                }}> Delete </button>
                <br />
                <Link to={`/characters/${character.id}`}>More Details</Link>
              </div>
            })}
          
          </>
        }
      </>

    )
  }

  // const renderCharacters = () => {
  //   if(characters === null){
  //     return <p>Loading...</p>;
  //   } else {
  //     return characters.map((character) => {
  //       return (
  //         <div key={character.id} className="character box">
  //           Name: {character.name} <br />
  //           Weapon: {character.weapon} <br />
  //           <Link to={`/characters/${character.id}`}>More details</Link>
  //         </div>
  //       )
  //     })
  //   }
  // }

  return (
    <div className="App">
      <h1>React Characters App</h1>

      {/* Link prevents page refresh/reload compared to plain html a link tags */}
      {/*
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      */}
      {/* NavLink still renders a link tags, but with an attribute "class" set to "active" when it is the current page/route displayed */}
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <Routes>
         {/* <Route path='/' element={<p>Homepage</p>} /> */}
        <Route path='/' element={renderCharacters()} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<p>Contact page</p>} />
        <Route path='/characters/:characterId' element={<CharacterDetails callbackDeleteCharacter={deleteCharacter} callbackGetCharacters={getCharacters} />} />
      </Routes>
      {/* Navigate component to redirect */}
      
    </div>
  );
}

export default App;
