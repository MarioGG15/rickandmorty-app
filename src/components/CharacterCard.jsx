import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CharacterCard = ({characterUrl, searchLocation}) => {

    const [character, setCharacter] = useState({})

    const [colorStatus, setColorStatus] = useState("")

    useEffect(() => {
        axios.get(characterUrl)
            .then(res => setCharacter(res.data))
    }, [])

    console.log(character)

    searchLocation = () => {
        if(character.status === "Alive"){
            setColorStatus("green")
        }
    }

    return (
        <div className='character-card'>
            <img src={character.image} alt="character" />
            <li>{character.name}</li>
            <b>Race:</b>
            <p>{character.species}</p>
            <b>Origin:</b>
            <p>{character.origin?.name}</p>
            <b>Episodes where apear:</b>
            <p>{character.episode?.length}</p>
            <div className='status-container'>
                <i className="fa-solid fa-circle" style={{color: colorStatus}}></i>
                <p>{character.status}</p>
            </div>
        </div>
    );
};

export default CharacterCard;