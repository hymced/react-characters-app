import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";

function App() {
  // const [characters, setCharacters] = useState([]); // if not initialized with empty array (e.g. undefined), the map method will be called on a variable that is not an array --> error
  const [characters, setCharacters] = useState(null); // with conditional rendering
  const url = "https://ih-crud-api.herokuapp.com/characters"

  const deleteCharacter = (characterId) => {
    axios
      .delete(`${url}/${characterId}`)
      .then(response => {
        console.log(response);
        // setCharacters(characters);
      })
      .catch(e => console.log("ERROR: ", e))
  }

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        // console.log(response)
        setCharacters(response.data)
      })
      .catch()
  // }, []) // deletes but does not render again
  }, [characters])

  const renderCharacters = () => {

  }

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
        <Route path='/' element={renderCharacters} />
        <Route path='/about' element={<p>This is the about page</p>} />
        <Route path='/contact' element={<p>This is the contact page</p>} />
      </Routes>
      {/* Navigate component to redirect */}

      {
        characters === null 
        ? "Loading..."
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
              <button onClick={() => {deleteCharacter(character.id)}}> Delete </button>
            </div>
          })}
        
        </>
      }
      
    </div>
  );
}

export default App;
